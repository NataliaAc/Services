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
  if (!phrase) return null;

  const normalized = normalizeString(phrase);
  const langSuffix = Array.isArray(lang) ? lang.join("_") : lang;

  // Формируем массив элементов для сборки строки
  const parts = [];

  // Категория
  if (categorie !== "none") {
    const prefix = prefixService[categorie] || "";
    if (categoriePosition === "start") parts.unshift(prefix);
    else parts.push(prefix);
  }

  // Тип документа
  if (typeDoc !== "none") {
    const prefix = prefixType[typeDoc] || "";
    if (typePosition === "start") parts.unshift(prefix);
    else parts.push(prefix);
  }

  // Дата
  if (dateEnabled) {
    const now = date ? new Date(date) : new Date();
    const annee = now.getFullYear();
    const mois = String(now.getMonth() + 1).padStart(2, "0");
    const jour = String(now.getDate()).padStart(2, "0");
    const fullDate = `${annee}-${mois}-${jour}`;
    if (datePosition === "start") parts.unshift(fullDate);
    else parts.push(fullDate);
  }

  // Основная фраза всегда в центре, после префиксов, до суффикса
  parts.push(normalized);

  // Суффикс
  parts.push(`U1180_${langSuffix}`);

  const renamed = parts.join("_");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renamed);
      alert("Résultat copié !");
    } catch {
      alert("Échec de la copie !");
    }
  };

  return (
    <Box style={{ marginTop: 20 }}>
      <h3>Phrase renommée :</h3>
      <p style={{ fontWeight: "bold" }}>{renamed}</p>
      <Button
        onClick={handleCopy}
        style={{ padding: "6px 12px", cursor: "pointer" }}
        variant="contained"
      >
        Copier
      </Button>
    </Box>
  );
};

export default RenameResult;
