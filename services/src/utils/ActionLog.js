import { LIEN_API_PutLog } from "../config";

const handleAppliquerAction = async (selectedObjects) => {
  const url = LIEN_API_PutLog;

  const body = {
    ids: selectedObjects,
    action: "archiver",
    payload: {
      SiArchive: "true",
    },
  };
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error("Erreur:", error);
      alert("Erreur lors de l'application de l'action");
      return;
    }

    alert("Action appliquée avec succès");
  } catch (error) {
    console.error("Erreur réseau ou serveur", error);
    alert("Erreur de communication avec le serveur");
  }
};

export default handleAppliquerAction;
