export const AI_PROMPT = `
Generate a detailed travel plan for the following:
- 📍 Location: {location}
- 📅 Duration: {totalDays} days
- 👤 Traveler type: {traveler}
- 💰 Budget: {budget}

Requirements:
1. Provide a list of hotel options with the following details:
   - Hotel name
   - Address
   - Price
   - Image URL
   - Geo coordinates
   - Rating
   - Description(make it detailed)

2. Suggest a day-wise itinerary for {totalDays} days with:
   - Place name
   - Place details (make it detailed)
   - Image URL (authentic image)
   - Geo coordinates
   - Time (like if morning then the morning time 9 AM to 11 PM like this if evening and if night like this )
   - Ticket pricing
   - Best time to visit
   - Approximate travel time between locations

Output must be in **JSON format**, structured for both hotel listings and daily itinerary plans.
`;
