import React, { useState, useEffect } from "react";
import {
  fetchHolidays,
  addHoliday,
  updateHoliday,
  deleteHoliday,
} from "../../utils/fetchData";

import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  useGridApiRef,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const Fetes = () => {
  const [data, setData] = useState([]);
  const apiRef = useGridApiRef();
  const [rowModesModel, setRowModesModel] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [formValues, setFormValues] = useState({
    nomFr: "",
    nomNL: "",
    start: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const obtenirData = async () => {
      const reponse = await fetchHolidays();

      const donneesTransformees = reponse.map((item, index) => ({
        id: item.id ?? index, // remplace index par item.id si dispo
        nomFr: item.extendedProps.fr,
        nomNL: item.extendedProps.nl,
        start: new Date(item.start),
        siAnnuel: true,
      }));

      setData(donneesTransformees);
    };

    obtenirData();
  }, []);

  const handleRowUpdate = async (newRow, oldRow) => {
    if (!newRow.nomFr.trim() || !newRow.nomNL.trim()) {
      throw new Error("Les champs 'Nom FR' et 'Nom NL' sont obligatoires.");
    }

    try {
      const updated = await updateHoliday(newRow);
      const updatedRows = data.map((row) =>
        row.id === oldRow.id ? updated : row
      );
      setData(updatedRows);
      return updated;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      throw error;
    }
  };

  const handleAddRow = async () => {
    const nouvelleFete = {
      nomFr: "",
      nomNL: "",
      start: new Date().toISOString().split("T")[0],
      siAnnuel: false,
    };

    try {
      const feteAjoutee = await addHoliday(nouvelleFete);
      setData((prev) => [...prev, feteAjoutee]);

      // Édite immédiatement la cellule "nomFr"
      setTimeout(() => {
        apiRef.current.setCellMode(feteAjoutee.id, "nomFr", "edit");
      }, 100);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Ajout échoué");
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));

    // ⏳ Attendre un tick que la ligne soit en mode édition
    setTimeout(() => {
      // Met le focus sur la première cellule éditable ("nomFr")
      apiRef.current.setCellFocus(id, "nomFr");
    }, 50);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleDeleteClick = (id) => async () => {
    if (window.confirm("Confirmer la suppression ?")) {
      await deleteHoliday(id);
      setData((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", age: "", role: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "nomFr",
      headerName: "Nom FR",
      width: 300,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "nomNL",
      headerName: "Nom NL",
      width: 300,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "start",
      headerName: "Date",
      type: "date",
      width: 130,
      headerAlign: "center",
      editable: true,
    },
  ];

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>Tableau des fêtes</h1>
      <button onClick={handleAddRow} style={{ marginBottom: "1rem" }}>
        Ajouter une fête
      </button>
      <DataGrid
        apiRef={apiRef}
        showToolbar
        editMode="row"
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowHeight={45}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={(error) => {
          alert("Erreur : " + error.message);
        }}
        experimentalFeatures={{ newEditingApi: true }}
        sx={{ backgroundColor: "#ffffff" }}
      />
    </div>
  );
};

export default Fetes;
