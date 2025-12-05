import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";
import "./Tableau.css";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import handleAppliquerAction from "../../utils/ActionLog";

const Tableau = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useGridApiRef();
  const [rowSelectionModel, setRowSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });
  const obtenirData = async () => {
    setLoading(true);
    const reponse = await fetchData();
    setData(reponse); // Mettez à jour l'état avec les données récupérées
    setLoading(false);
  };

  useEffect(() => {
    obtenirData();
  }, []);

  const handleGroupAction = async () => {
    const selectedRowsMap = apiRef.current.getSelectedRows();
    const selectedObjects = Array.from(selectedRowsMap.keys()); // ← récupère une liste d'objets
    await handleAppliquerAction(selectedObjects);
    await obtenirData();
    console.log("Objets sélectionnés :", selectedObjects);
  };
  console.log("Premier élément des données :", data[0]);
  const columns = [
    { field: "idLog", headerName: "ID", width: 50, headerAlign: "center" },
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
    {
      field: "siArchive",
      headerName: "Archiver",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => (params.row.siArchive ? "Oui" : "Non"),
    },
  ];

  return (
    <div className="tab">
      <h1>Tableau des Logs</h1>
      <Button variant="outlined" onClick={handleGroupAction} className="button">
        Supprimer
      </Button>
      <DataGrid
        apiRef={apiRef}
        rows={data}
        columns={columns}
        getRowClassName={(params) =>
          params.row.siEnvoi ? "cell-envoye" : "cell-non-envoye"
        }
        sx={{ backgroundColor: "#ffffff" }}
        getRowId={(row) => row.idlog}
        loading={loading}
        pageSize={10}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(newModel) => setRowSelectionModel(newModel)}
      />
    </div>
  );
};

export default Tableau;
