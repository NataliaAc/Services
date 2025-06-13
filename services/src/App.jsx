import React, { useState } from "react";
import Menu from "./components/ContainerComponent/Menu";
import NormalizeComponent from "./components/RenameComponent/RenamePhrase";
import Tableau from "./components/LogEmailComponent/Tableau";
import Footer from "./components/ContainerComponent/Footer";
import Statistiques from "./components/StatistiquesComponent/Statistiques";
import Fetes from "./components/FetesComponent/Fetes";

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("normalize");
  console.log("Selected menu:", selectedMenu);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar Menu */}
      <aside
        style={{
          width: "250px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Menu selectedMenu={selectedMenu} onSelect={setSelectedMenu} />
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f4f4f4",
        }}
      >
        <main
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {selectedMenu === "normalize" && (
            <NormalizeComponent key="normalize" />
          )}
          {selectedMenu === "emails" && <Tableau key="emails" />}
          {selectedMenu === "stats" && <Statistiques key="stats" />}
          {selectedMenu === "fetes" && <Fetes key="fetes" />}
        </main>

        <footer
          style={{
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <Footer />
        </footer>
      </div>
    </div>
  );
}
