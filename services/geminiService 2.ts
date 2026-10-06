import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es l'assistant virtuel intelligent de R.I.C.E (Réunion Ingénierie Consultant Environnement).
Ton rôle est d'informer les visiteurs sur les services de l'entreprise de manière professionnelle, écologique et bienveillante.

Informations clés sur R.I.C.E :
- Créé en 2008, basé à Le Tampon (97430), La Réunion.
- Expert en développement durable, ingénierie environnementale, dépollution, désamiantage.
- Missions : Assistance, Conseils, Études, Imagerie aérienne/3D (drones depuis 2014).
- Valeurs : Écoconception, Low-tech, Économie circulaire, RSE, Biodiversité.
- Services : Diagnostics, dossiers de financement (ADEME, BPI), plans climat, certifications (HQE, BREEAM).

Réponds de manière concise (max 3-4 phrases) et encourage l'utilisateur à contacter l'entreprise pour un devis ou une étude approfondie.
Si on te pose une question hors sujet, ramène poliment la conversation vers l'écologie et les services de R.I.C.E.
`;

export const sendMessageToGemini = async (
  history: string[], 
  newMessage: string
): Promise<string> => {
  try {
    // Accès sécurisé à process.env.API_KEY pour éviter les erreurs "undefined"
    // Note: Sur Netlify, assurez-vous que la variable d'environnement API_KEY est bien définie dans les paramètres du site.
    const apiKey = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;

    if (!apiKey) {
      console.error("ERREUR CRITIQUE: La clé API Gemini (API_KEY) n'est pas trouvée.");
      console.error("Veuillez vérifier vos variables d'environnement sur Netlify ou votre fichier .env.");
      console.error("DEBUG INFO: process.env =", typeof process !== 'undefined' ? process.env : 'process is undefined');
      throw new Error("Clé API manquante (API_KEY).");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `Historique de conversation:\n${history.join('\n')}\n\nNouvelle question: ${newMessage}` }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer.";
  } catch (error) {
    console.error("Erreur Gemini Service:", error);
    // On relance l'erreur pour qu'elle soit gérée par le composant Assistant
    throw error;
  }
};