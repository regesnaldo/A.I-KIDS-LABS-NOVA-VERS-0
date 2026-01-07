
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askAITutor(question: string, ageGroup: 'child' | 'adult') {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = ageGroup === 'child' 
    ? "Você é o 'Neo', um robô amigável e futurista que explica conceitos de IA para crianças de 7 a 10 anos. Use analogias simples (como LEGO, super-poderes ou culinária). Seja entusiasta e curto nas respostas."
    : "Você é o 'Neo', um consultor especialista em tecnologia. Explique conceitos de IA para adultos leigos de forma clara, profissional, mas acessível, evitando jargões técnicos excessivos.";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, meu processador falhou. Pode perguntar de novo?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops! Tive um problema de conexão com a Matrix. Tente novamente!";
  }
}
