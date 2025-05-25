import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Loader2, Sparkle } from 'lucide-react';
import toast from 'react-hot-toast';
import { AI_PROMPT } from '../constants/prompt';
import { generateTripPlan } from '../services/ai-model';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo traveler seeking new experiences',
    icon: '🧍',
    people: '1 Person',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two people exploring together',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A fun-loving family adventure',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends Group',
    desc: 'Close friends traveling as a pack',
    icon: '🧑‍🤝‍🧑',
    people: '4 to 6 People',
  },
  {
    id: 5,
    title: 'Work Retreat',
    desc: 'Team bonding during a company retreat',
    icon: '💼',
    people: '5 to 15 People',
  },
  {
    id: 6,
    title: 'Adventure Squad',
    desc: 'Thrill-seekers chasing excitement together',
    icon: '⛺',
    people: '2 to 6 People',
  },
];

const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Budget-Friendly',
    desc: 'Smart spending for basic comfort',
    range: '₹0 - ₹10,000',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'A balance of comfort and experience',
    range: '₹10,000 - ₹25,000',
    icon: '💳',
  },
  {
    id: 3,
    title: 'Premium',
    desc: 'Elevated comfort and exclusive activities',
    range: '₹25,000 - ₹50,000',
    icon: '💼',
  },
  {
    id: 4,
    title: 'Luxury',
    desc: 'Top-tier experiences and indulgent stays',
    range: '₹50,000+',
    icon: '💎',
  },
];

const CreateTripPage = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});
  // const [openDialog, setOpenDialog] = useState(false);

  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);


  const onGenerateTrip = async (e) => {
    e.preventDefault();

    const { location, numberOfDays, budget, travelerType } = formData;

    if (!location || location === "") {
      toast.error("Please select a destination.");
      return;
    }

    if (!numberOfDays || isNaN(numberOfDays)) {
      toast.error("Please enter the number of days for your trip.");
      return;
    }

    const days = parseInt(numberOfDays);

    if (days < 1) {
      toast.error("Trip duration must be at least 1 day.");
      return;
    }

    if (days > 7) {
      toast.error("For now, trip duration is limited to a maximum of 7 days.");
      return;
    }

    if (!budget) {
      toast.error("Please select a budget option.");
      return;
    }

    if (!travelerType) {
      toast.error("Please choose who you're traveling with.");
      return;
    }
    setIsLoading(true);
    const Final_Prompt = AI_PROMPT
      .replace("{location}", formData?.location?.label ?? formData?.location)
      .replace("{totalDays}", formData?.numberOfDays)
      .replace("{traveler}", formData?.travelerType)
      .replace("{budget}", formData?.budget);

    try {
      setIsLoading(true);
      const result = await generateTripPlan(Final_Prompt);
      saveTripToDatabase(result);
      console.log(result);
      setIsLoading(false);
      toast.success("Trip plan generated!");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error("Failed to generate trip plan.");
    }
  };

  const saveTripToDatabase = async (TripData) => {

    setIsLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.primaryEmailAddress?.emailAddress,
      id: docId
    });
    setIsLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <section className="min-h-screen bg-black text-white py-16 px-4 sm:px-10 md:px-24 lg:px-48">
      <div className="text-center mb-12">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_#6b21a8]">
          Tell us your travel preferences
        </h2>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>
      </div>

      <form className="space-y-12 max-w-3xl mx-auto">
        {/* destination */}
        <div>
          <Label htmlFor="destination" className="text-lg mb-2 block text-gray-300">
            What is your destination of choice?
          </Label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v), handleInputChange("location", v); },
              styles: {
                control: (base) => ({
                  ...base,
                  backgroundColor: '#18181b',
                  borderColor: '#3f3f46',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.5rem',
                }),
                input: (base) => ({ ...base, color: 'white' }),
                singleValue: (base) => ({ ...base, color: 'white' }),
                menu: (base) => ({ ...base, backgroundColor: '#18181b', color: 'white' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#27272a' : '#18181b',
                  color: 'white',
                }),
                placeholder: (base) => ({ ...base, color: '#a1a1aa' }),
              },
              placeholder: 'Enter a destination...',
              isClearable: true,
            }}
          />
        </div>

        {/* days */}
        <div>
          <Label htmlFor="days" className="text-lg mb-2 block text-gray-300">
            How many days are you planning your trip?
          </Label>
          <Input
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
            id="days"
            type="number"
            placeholder="e.g. 7"
            min={1}
            max={7}
            className="bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* budget */}
        <div>
          <p className="text-lg text-gray-300 mb-1">What is your budget?</p>
          <p className="text-sm text-gray-500 mb-4">
            The budget is exclusively allocated for activities and dining purposes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SelectBudgetOptions.map((budget) => (
              <Card
                key={budget.id}
                onClick={() => handleInputChange("budget", budget.title)}
                className={`cursor-pointer transition duration-300 border-2 ${formData.budget === budget.title
                  ? 'border-[#f472b6] shadow-[0_0_15px_#f472b6]'
                  : 'border-zinc-700'
                  } bg-zinc-900 text-white hover:border-[#f472b6]`}
              >
                <CardContent className="p-5 text-center space-y-1">
                  <div className="text-3xl">{budget.icon}</div>
                  <p className="text-xl font-semibold text-[#f472b6]">{budget.title}</p>
                  <p className="text-sm text-gray-400">{budget.desc}</p>
                  <p className="text-xs text-gray-500">{budget.range}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* who people */}
        <div>
          <p className="text-lg text-gray-300 mb-4">Who's traveling?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SelectTravelsList.map((type) => (
              <Card
                key={type.id}
                onClick={() => handleInputChange("travelerType", type.people)}
                className={`cursor-pointer transition duration-300 border-2 ${formData.travelerType === type.people
                  ? 'border-[#4effbe] shadow-[0_0_15px_#4effbe]'
                  : 'border-zinc-700'
                  } bg-zinc-900 text-white hover:border-[#4effbe]`}
              >
                <CardContent className="p-5 text-center space-y-1">
                  <div className="text-3xl">{type.icon}</div>
                  <p className="text-xl font-semibold text-[#4effbe]">{type.title}</p>
                  <p className="text-sm text-gray-400">{type.desc}</p>
                  <p className="text-xs text-gray-500">{type.people}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        <div className="flex justify-center mt-10">
          <SignedIn>
            <Button
              onClick={onGenerateTrip}
              disabled={isLoading}
              className={`text-xl w-full cursor-pointer font-semibold px-6 py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2
        ${isLoading ? "bg-gray-300  text-gray-600 cursor-not-allowed shadow-none" : "bg-[#4effbe] text-black shadow-[0_0_10px_#4effbe] hover:shadow-[0_0_15px_#4effbe] hover:bg-white"}
      `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkle className="w-5 h-5" />
                  Generate
                </>
              )}
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </form>
    </section>
  );
};

export default CreateTripPage;
