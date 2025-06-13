/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";
import PieChart from "./PieChart"; // Assurez-vous que le chemin est correct
import "./Stats.css";
import BarChart from "./BarChart";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenirData = async () => {
      const reponse = await fetchData();
      setData(reponse); // Mettez à jour l'état avec les données récupérées
    };
    obtenirData();
  }, []);

  return (
    <div className="grid-container-stats">
      <h1>Les statistiques</h1>

      <div className="PieChart">
        <PieChart data={data} />
      </div>
      <div className="BarChart">
        <BarChart data={data} />
      </div>
    </div>
  );
};

export default Stats;
