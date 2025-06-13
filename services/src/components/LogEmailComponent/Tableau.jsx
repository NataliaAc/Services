import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";
import "./Tableau.css";
import { DataGrid } from "@mui/x-data-grid";

const Tableau = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenirData = async () => {
      const reponse = await fetchData();
      setData(reponse); // Mettez à jour l'état avec les données récupérées
    };
    obtenirData();
  }, []);

  // console.log("Premier élément des données :", data[0]);
  const columns = [
    { field: "idlog", headerName: "ID", width: 50, headerAlign: "center" },
    {
      field: "destinataire",
      headerName: "Destinataire",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "emetteur",
      headerName: "Emetteur",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "destinataireSecondaire",
      headerName: "Destinataire secondaire",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "nomProjet",
      headerName: "Nom du projet",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "message",
      headerName: "Message",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "dateEnvoi",
      headerName: "Date d'envoi",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "siEnvoi",
      headerName: "Envoyé",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => (params.row.siEnvoi ? "Oui" : "Non"),
    },
  ];

  return (
    <div className="tab">
      <h1>Tableau des Logs</h1>

      <DataGrid
        rows={data}
        columns={columns}
        getRowClassName={(params) =>
          params.row.siEnvoi ? "cell-envoye" : "cell-non-envoye"
        }
        sx={{ backgroundColor: "#ffffff" }}
        getRowId={(row) => row.idlog}
        pageSize={10}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
      />
    </div>
  );
};

export default Tableau;
