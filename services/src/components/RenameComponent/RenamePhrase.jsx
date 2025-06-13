import React, { useState } from "react";
import RenameResult from "./RenameResult";

const PREFIXES = {
  "Conseil Communal": "CC",
  Culture: "CULT",
  Environment: "ENV",
  Mobilité: "MOBI",
  Population: "POP",
  Séniors: "SENI",
  Urbanisme: "URBA",
  Prévention: "PREV",
};

const RenamePhrase = () => {
  const [phrase, setPhrase] = useState("");
  const [lang, setLang] = useState("fr");
  const [categorie, setCategorie] = useState("none");
  const [dateAfterPrefix, setDateAfterPrefix] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // état pour la date personnalisée

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "20px 40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Normalize String</h1>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setLang("fr")}>FR</button>{" "}
        <button onClick={() => setLang("nl")}>NL</button>{" "}
        <button onClick={() => setLang(["fr", "nl"])}>FR + NL</button>
      </nav>

      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        style={{
          marginBottom: 20,
          padding: "8px",
          fontSize: "16px",
          width: "100%",
        }}
      >
        <option value="none">Aucun préfixe</option>
        {Object.keys(PREFIXES).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label style={{ display: "block", marginBottom: 20 }}>
        <input
          type="checkbox"
          checked={dateAfterPrefix}
          onChange={(e) => setDateAfterPrefix(e.target.checked)}
          style={{ marginRight: 8 }}
        />
        Mettre la date après le préfixe
      </label>

      {/* Afficher input date seulement si checkbox cochée */}
      {dateAfterPrefix && (
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            marginBottom: 20,
            padding: "8px",
            fontSize: "16px",
            width: "100%",
          }}
        />
      )}

      <input
        type="text"
        placeholder="Entrez une phrase"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />

      {phrase && (
        <RenameResult
          phrase={phrase}
          lang={lang}
          categorie={categorie}
          prefixMap={PREFIXES}
          dateAfterPrefix={dateAfterPrefix}
          selectedDate={selectedDate} // passe la date personnalisée
        />
      )}
    </div>
  );
};

export default RenamePhrase;
