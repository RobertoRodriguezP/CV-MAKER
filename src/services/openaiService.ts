// src/services/openaiService.ts

import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1", // Groq API base
});

export const suggestRolesAndRewrite = async (parsedCV: object): Promise<string> => {
  const prompt = `
Eres un experto en recursos humanos y tecnología. Recibirás un currículum en formato JSON. Tu trabajo es:

1. Sugerir de 3 a 5 roles ideales que este perfil podría aplicar (ej. "Ingeniero de Datos para GCP", "Fullstack Cloud Developer").
2. Reescribir el párrafo de "sobre mí" adaptado a uno de esos roles.
3. Reescribir brevemente una experiencia laboral, transformándola para destacar en ese nuevo rol.

JSON del CV:
${JSON.stringify(parsedCV, null, 2)}

Por favor responde en formato Markdown.
`;

  const response = await openai.chat.completions.create({
    model: "llama3-70b-8192", // modelo recomendado en Groq
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content || "";
};
