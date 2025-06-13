import React, { useState, useEffect } from "react";
import { fetchHolidays } from "../../utils/fetchData";

import { DataGrid } from "@mui/x-data-grid";

const Fetes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenirData = async () => {
      const reponse = await fetchHolidays();

      const donneesTransformees = reponse.map((item, index) => ({
        id: index, // ou un vrai identifiant si dispo
        nomFr: item.extendedProps.fr,
        nomNL: item.extendedProps.nl,
        start: item.start,
        siAnnuel: true, // ou false selon ta logique
      }));

      setData(donneesTransformees);
    };

    obtenirData();
  }, []);

  // console.log("Premier élément des données :", data[0]);
  const columns = [
    // {
    //   field: "id",
    //   headerName: "id",
    //   width: 200,
    //   headerAlign: "center",
    // },
    {
      field: "nomFr",
      headerName: "Nom FR",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "nomNL",
      headerName: "Nom NL",
      width: 300,
      headerAlign: "center",
    },

    {
      field: "start",
      headerName: "date",
      width: 130,
      headerAlign: "center",
    },
  ];

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>Tableau des fêtes</h1>
      <DataGrid
        rows={data}
        columns={columns}
        sx={{ backgroundColor: "#ffffff" }}
        getRowId={(row) => row.id}
        pageSize={10}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
      />
    </div>
  );
};

export default Fetes;
