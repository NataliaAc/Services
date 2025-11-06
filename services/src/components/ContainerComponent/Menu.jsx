import React from "react";

const menuItems = [
  { id: "normalize", label: "Normalize String" },
  // { id: "emails", label: "Emails" },
  // { id: "stats", label: "Statistique" },
  // { id: "fetes", label: "Fêtes" },
];

export default function Menu({ selectedMenu, onSelect }) {
  return (
    <nav
      style={{
        width: "100%",
        padding: 20,
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: 20 }}>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              marginBottom: 12,
              cursor: "pointer",
              fontWeight: selectedMenu === item.id ? "bold" : "normal",
              color: selectedMenu === item.id ? "#003B67" : "black",
              padding: "6px 10px",
              borderRadius: "4px",
              backgroundColor:
                selectedMenu === item.id ? "#e0f0ff" : "transparent",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                selectedMenu === item.id ? "#e0f0ff" : "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                selectedMenu === item.id ? "#e0f0ff" : "transparent";
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
