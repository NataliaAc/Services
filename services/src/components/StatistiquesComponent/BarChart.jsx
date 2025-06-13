/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/Table.js
import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { green, red } from '@mui/material/colors';

const Statistiques = ({data}) => { 

    // Regrouper les données par projet et compter les envoyés et non envoyés
    const projetsStats = data.reduce((acc, row) => {
        const nomProjet = row.nomProjet;
        if (!acc[nomProjet]) {
            acc[nomProjet] = { envoye: 0, nonEnvoye: 0 };
        }
        if (row.siEnvoi) {
            acc[nomProjet].envoye += 1;
        } else {
            acc[nomProjet].nonEnvoye += 1;
        }
        return acc;
    }, {});

    // Préparer les données pour le BarChart
    const projets = Object.keys(projetsStats);
    const envoyeData = projets.map(projet => projetsStats[projet].envoye);
    const nonEnvoyeData = projets.map(projet => projetsStats[projet].nonEnvoye);

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: projets }]}  // Affiche les noms des projets sur l'axe des X
            series={[
                { data: envoyeData, label: 'Envoyé', color: green[500] },  // Données des envoyés
                { data: nonEnvoyeData, label: 'Non envoyé', color: red[500] }  // Données des non envoyés
            ]}
            width={500}
            height={300}
        />
    );
};

export default Statistiques;