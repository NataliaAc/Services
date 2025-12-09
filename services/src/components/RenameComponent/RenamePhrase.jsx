import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Paper,
  Grid,
  Autocomplete,
} from "@mui/material";
import RenameResult from "./RenameResult";

const PREFIXESSERVICE = {
  "Action Sociale": "SOCI",
  "Activités économiques": "ECON",
  "Affaires Générales": "Gene",
  Animaux: "ANIM",
  "Conseil Communal": "CC",
  Culture: "CULT",
  Empoi: "EMPL",
  Enfance: "ENFA",
  Jeunesse: "JEUN",
  Enseignement: "ENSE",
  Environment: "ENV",
  Mobilité: "MOBI",
  Population: "POP",
  Prévention: "PREV",
  Propreté: "PROP",
  Santé: "SANT",
  Séniors: "SENI",
  Stationnement: "STAT",
  Urbanisme: "URBA",
  Voirie: "VOIR",
  Travaux: "TRAV",
  Taxe: "Taxe",
  Transparence: "TRANSP",
};

const PREFIXESTYPE = {
  Affiche: "AFF",
  Avies: "AVIES",
  Formulaire: "FORM",
  Interpellations: "Interpellations",
  "Interpellations citoyennes": "IC",
  "Notes explicatives": "NE",
  "Notes explicatives complémentaires": "NEC",
  "Ordre du jour": "ODJ",
  "Ordre du jour complémentaire": "ODJC",
  Motions: "Motions",
  "Questions écrites": "QE",
  "Questions orales": "QO",
  Reglement: "REGL",
  Registre: "Registre",
};

const RenamePhraseUI = () => {
  const [phrase, setPhrase] = useState("");
  const [lang, setLang] = useState("fr");

  const [categorie, setCategorie] = useState("none");
  const [categoriePosition, setCategoriePosition] = useState("start");

  const [typeDoc, setTypeDoc] = useState("none");
  const [typePosition, setTypePosition] = useState("start");

  const [dateEnabled, setDateEnabled] = useState(false);
  const [date, setDate] = useState("");
  const [datePosition, setDatePosition] = useState("start");

  return (
    <Box sx={{ mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Normalize String
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Colonne gauche : toutes les options */}
        <Grid size={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Langue
              </Typography>
              <Stack direction="row" spacing={2} mb={2}>
                <Button
                  variant={lang === "fr" ? "contained" : "outlined"}
                  onClick={() => setLang("fr")}
                >
                  FR
                </Button>
                <Button
                  variant={lang === "nl" ? "contained" : "outlined"}
                  onClick={() => setLang("nl")}
                >
                  NL
                </Button>
                <Button
                  variant={Array.isArray(lang) ? "contained" : "outlined"}
                  onClick={() => setLang(["fr", "nl"])}
                >
                  FR + NL
                </Button>
              </Stack>

              <Typography variant="h6" gutterBottom>
                Options
              </Typography>
              <Stack spacing={2}>
                {/* Date */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dateEnabled}
                      onChange={(e) => setDateEnabled(e.target.checked)}
                    />
                  }
                  label="Ajouter la date"
                />
                {dateEnabled && categorie !== "Conseil Communal" && (
                  <>
                    <TextField
                      variant="outlined"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel>Position date</InputLabel>
                      <Select
                        value={datePosition}
                        onChange={(e) => setDatePosition(e.target.value)}
                        label="Position date"
                      >
                        <MenuItem value="start">Au début</MenuItem>
                        <MenuItem value="end">À la fin</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}

                {/* Catégorie */}

                <InputLabel>Catégorie</InputLabel>
                <Autocomplete
                  options={Object.keys(PREFIXESSERVICE)}
                  value={categorie !== "none" ? categorie : null}
                  onChange={(event, newValue) =>
                    setCategorie(newValue || "none")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Catégorie"
                      variant="outlined"
                    />
                  )}
                />

                {categorie !== "none" && categorie !== "Conseil Communal" && (
                  <FormControl fullWidth>
                    <InputLabel>Position catégorie</InputLabel>
                    <Select
                      value={categoriePosition}
                      onChange={(e) => setCategoriePosition(e.target.value)}
                      label="Position catégorie"
                    >
                      <MenuItem value="start">Au début</MenuItem>
                      <MenuItem value="end">À la fin</MenuItem>
                    </Select>
                  </FormControl>
                )}

                {/* Type */}
                <InputLabel>Type</InputLabel>
                <Autocomplete
                  options={Object.keys(PREFIXESTYPE)}
                  value={typeDoc !== "none" ? typeDoc : null}
                  onChange={(event, newValue) => setTypeDoc(newValue || "none")}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" variant="outlined" />
                  )}
                />

                {typeDoc !== "none" && categorie !== "Conseil Communal" && (
                  <FormControl fullWidth>
                    <InputLabel>Position type</InputLabel>
                    <Select
                      value={typePosition}
                      onChange={(e) => setTypePosition(e.target.value)}
                      label="Position type"
                    >
                      <MenuItem value="start">Au début</MenuItem>
                      <MenuItem value="end">À la fin</MenuItem>
                    </Select>
                  </FormControl>
                )}

                {/* Phrase */}
                <TextField
                  label="Entrez une phrase"
                  variant="outlined"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Colonne droite : phrase renommée + bouton copier */}
        <Grid size={5}>
          {
            /* {phrase && ( }*/
            <Paper elevation={3} sx={{ p: 2 }}>
              <RenameResult
                phrase={phrase}
                lang={lang}
                categorie={categorie}
                categoriePosition={categoriePosition}
                typeDoc={typeDoc}
                typePosition={typePosition}
                prefixService={PREFIXESSERVICE}
                prefixType={PREFIXESTYPE}
                dateEnabled={dateEnabled}
                date={date}
                datePosition={datePosition}
              />
            </Paper>
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default RenamePhraseUI;
