import React from "react";
import { normalizeString } from "../../utils/normalizeString";
import { Button, Box } from "@mui/material";

const RenameResult = ({
  phrase,
  lang,
  categorie,
  categoriePosition,
  typeDoc,
  typePosition,
  prefixService,
  prefixType,
  dateEnabled,
  date,
  datePosition,
}) => {
  // Normalisation phrase (vide = aucun texte à ajouter)
  const normalized = phrase ? normalizeString(phrase) : "";
  const langSuffix = Array.isArray(lang) ? lang.join("_") : lang;

  /**
   * ----------------------------------------------------------
   * RÈGLE SPÉCIALE : CONSEIL COMMUNAL
   * ----------------------------------------------------------
   * CC-YYYY-MM-DD-ODJ_U1180_fr_nl
   * CC-YYYY-MM-DD-QO_U1180_fr_nl
   * CC-YYYY-MM-DD-text_U1180_fr_nl
   * ----------------------------------------------------------
   */
  if (categorie === "Conseil Communal") {
    const ccPrefix = prefixService["Conseil Communal"] || "CC";
    const typePrefix = prefixType[typeDoc] || "";
    const langStr = Array.isArray(lang) ? "fr_nl" : lang;

    // Format date CC
    let formattedDate = "0000-00-00";
    if (dateEnabled && date) {
      const d = new Date(date);
      formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    }
    const textPart = normalized ? `-${normalized}` : "";
    const result = `${ccPrefix}-${formattedDate}-${typePrefix}${textPart}_U1180_${langStr}`;

    return (
      <Box style={{ marginTop: 20 }}>
        <h3>Phrase renommée :</h3>
        <p style={{ fontWeight: "bold" }}>{result}</p>
        <Button
          onClick={() => navigator.clipboard.writeText(result)}
          variant="contained"
        >
          Copier
        </Button>
      </Box>
    );
  }

  /**
   * ----------------------------------------------------------
   * LOGIQUE NORMALE
   * ----------------------------------------------------------
   */
  const parts = [];

  // Catégorie
  if (categorie !== "none") {
    const prefix = prefixService[categorie] || "";
    if (categoriePosition === "start") parts.unshift(prefix);
    else parts.push(prefix);
  }

  // Type
  if (typeDoc !== "none") {
    const prefix = prefixType[typeDoc] || "";
    if (typePosition === "start") parts.unshift(prefix);
    else parts.push(prefix);
  }

  // Date
  if (dateEnabled) {
    const now = date ? new Date(date) : new Date();
    const fullDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    if (datePosition === "start") parts.unshift(fullDate);
    else parts.push(fullDate);
  }

  // Phrase seulement si elle existe
  if (normalized.trim() !== "") {
    parts.push(normalized);
  }

  // Suffixe final obligatoire
  parts.push(`U1180_${langSuffix}`);

  const renamed = parts.join("_");

  const handleCopy = () => navigator.clipboard.writeText(renamed);

  return (
    <Box style={{ marginTop: 20 }}>
      <h3>Phrase renommée :</h3>
      <p style={{ fontWeight: "bold" }}>{renamed}</p>
      <Button onClick={handleCopy} variant="contained">
        Copier
      </Button>
    </Box>
  );
};

export default RenameResult;
