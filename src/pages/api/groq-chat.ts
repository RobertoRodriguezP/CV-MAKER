// pages/api/groq-chat.ts

import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { parsedCV } = req.body;

  if (!parsedCV) {
    return res.status(400).json({ error: "parsedCV is missing in body" });
  }

  try {
    const prompt = `
Recibirás un currículum en JSON. Devuelve exactamente este formato en JSON **sin explicaciones**:

{
  "roles": ["rol1", "rol2", "rol3"],
  "sobreMi": {
    "rol1": "Texto adaptado para rol1...",
    "rol2": "Texto adaptado para rol2..."
  },
  "experienciaAdaptada": {
    "rol1": "Experiencia adaptada para rol1...",
    "rol2": "..."
  }
}

Currículum:
${JSON.stringify(parsedCV, null, 2)}
`;


    const completion = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.choices[0].message?.content;

    console.log("🔵 Respuesta de Groq:", responseText);

    let resultJson;
    try {
      resultJson = JSON.parse(responseText || "{}");
    } catch (parseError) {
      console.error("❌ Error al parsear JSON:", parseError);
      return res.status(500).json({
        error: "La IA no devolvió un JSON válido.",
        raw: responseText,
      });
    }

    res.status(200).json(resultJson);
  } catch (err: any) {
    console.error("🔥 Error API Groq:", err);
    res.status(500).json({ error: err.message || "Error interno" });
  }
}
