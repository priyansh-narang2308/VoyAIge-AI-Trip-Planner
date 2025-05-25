import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const config = {
    responseMimeType: 'application/json',
};

const model = 'gemini-1.5-flash';

export const generateTripPlan = async (prompt) => {
    const contents = [
        {
            role: 'user',
            parts: [{ text: prompt }],
        },
    ];

    const result = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    console.log("🧠 Gemini Raw Response:", result);

    const candidate = result?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("Gemini returned an empty or malformed response.");
    }

    return text;
};


