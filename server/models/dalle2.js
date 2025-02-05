import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config.js";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // Asegúrate de que la API key esté cargada
});

export const generarImagenConDalle2 = async (prompt) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    return response.data[0].url; // Devuelve la URL de la imagen generada
  } catch (error) {
    console.error(
      "Error al generar la imagen:",
      error.response?.data || error.message
    );
    throw new Error("No se pudo generar la imagen.");
  }
};