import React from "react";
import { normalizeString } from "../../utils/normalizeString";

const RenameResult = ({
  phrase,
  lang,
  categorie,
  prefixMap,
  dateAfterPrefix,
  selectedDate,
}) => {
  if (!phrase) return null;

  // Si selectedDate est fourni, on l'utilise, sinon date actuelle
  const now = selectedDate ? new Date(selectedDate) : new Date();

  const annee = now.getFullYear();
  const mois = String(now.getMonth() + 1).padStart(2, "0");
  const jour = String(now.getDate()).padStart(2, "0");
  const fullDate = `${annee}-${mois}-${jour}`;

  const normalized = normalizeString(phrase);
  const langSuffix = Array.isArray(lang) ? lang.join("_") : lang;
  const prefix = prefixMap[categorie] || "";

  let renamed;
  if (prefix && dateAfterPrefix) {
    renamed = `${prefix}_${fullDate}_${normalized}_U1180_${langSuffix}`;
  } else if (prefix) {
    renamed = `${prefix}_${normalized}_U1180_${langSuffix}`;
  } else {
    renamed = `${normalized}_U1180_${langSuffix}`;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renamed);
      alert("Résultat copié !");
    } catch {
      alert("Échec de la copie !");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Phrase renommée :</h3>
      <p style={{ fontWeight: "bold" }}>{renamed}</p>
      <button
        onClick={handleCopy}
        style={{ padding: "6px 12px", cursor: "pointer" }}
      >
        Copier
      </button>
    </div>
  );
};

export default RenameResult;
