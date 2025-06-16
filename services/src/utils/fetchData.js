import { LIEN_API_GetEmails } from "../config";
import { LIEN_API_Holidays } from "../config";

export const fetchData = async () => {
  try {
    const response = await fetch(`${LIEN_API_GetEmails}`, { mode: "cors" });

    if (!response.ok) {
      throw new Error("Erreur dans la réponse de l'API");
    }

    const text = await response.text(); // Récupère le texte brut

    try {
      const data = JSON.parse(text); // Parse seulement si c'est du JSON valide
      return data;
    } catch (e) {
      console.error("Erreur lors du parsing JSON:", e);
      throw e; // Relance l'erreur pour qu'elle soit capturée par le bloc catch externe
    }
  } catch (error) {
    console.error("Erreur:", error);
    throw error; // Lance l'erreur pour qu'elle soit capturée où fetchData est appelée
  }
};

export const fetchHolidays = async () => {
  try {
    const response = await fetch(`${LIEN_API_Holidays}`, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Erreur dans la réponse de l'API");
    }

    const text = await response.text(); // Récupère le texte brut

    try {
      const data = JSON.parse(text); // Parse seulement si c'est du JSON valide
      console.log(data, data);
      return data;
    } catch (e) {
      console.error("Erreur lors du parsing JSON:", e);
      throw e; // Relance l'erreur pour qu'elle soit capturée par le bloc catch externe
    }
  } catch (error) {
    console.error("Erreur:", error);
    throw error; // Lance l'erreur pour qu'elle soit capturée où fetchData est appelée
  }
};
