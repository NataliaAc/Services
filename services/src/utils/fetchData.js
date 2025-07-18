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

export const addHoliday = async (newRow) => {
  const response = await fetch(`/api/holidays`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRow),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout");
  }

  return await response.json(); // doit retourner l’objet complet avec son vrai `id`
};

export const updateHoliday = async (updatedHoliday) => {
  const response = await fetch(`/api/holidays/${updatedHoliday.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedHoliday),
  });

  if (!response.ok) throw new Error("Erreur mise à jour");
  return await response.json();
};
export const deleteHoliday = async (id) => {
  const response = await fetch(`/api/holidays/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Erreur lors de la suppression");
  return true;
};
