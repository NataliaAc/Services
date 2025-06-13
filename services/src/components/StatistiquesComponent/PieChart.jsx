import React, { useState, useEffect } from "react";

import { PieChart } from "@mui/x-charts/PieChart";
import { green, red } from "@mui/material/colors";

const Statistiques = ({ data }) => {
  const [selectedService, setSelectedService] = useState("");
  const filteredData = data.filter((row) => row.nomProjet === selectedService);
  const dataForPieChart = [
    {
      label: "Envoyé",
      value: filteredData.filter((row) => row.siEnvoi).length,
      color: green[500],
    },
    {
      label: "Non envoyé",
      value: filteredData.filter((row) => !row.siEnvoi).length,
      color: red[500],
    },
  ];

  return (
    <div className="select">
      {/* Dropdown pour sélectionner le service */}
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">Sélectionner un service</option>
        {Array.from(new Set(data.map((row) => row.nomProjet))) // Générer des options de service dynamiques
          .map((nomProjet, index) => (
            <option key={index} value={nomProjet}>
              {nomProjet}
            </option>
          ))}
      </select>
      <PieChart series={[{ data: dataForPieChart }]} width={500} height={300} />
    </div>
  );
};
export default Statistiques;
