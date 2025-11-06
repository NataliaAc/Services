import React, { useState, useEffect } from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";

function Loader({ size = 40, color = "#873a74", speed = 1000 }) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setToggle((t) => !t), speed);
    return () => clearInterval(i);
  }, [speed]);

  const states = toggle ? ["O", "F", "O"] : ["F", "O", "F"];

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
      {states.map((type, i) => (
        <div
          key={i}
          style={{ position: "relative", width: size, height: size }}
        >
          <Inventory2Icon
            style={{
              fontSize: size,
              color,
              position: "absolute",
              transition: "opacity 0.6s, transform 0.9s",
              opacity: type === "F" ? 1 : 0,
              transform: type === "F" ? "scale(1)" : "scale(0.8)",
            }}
          />
          <Inventory2OutlinedIcon
            style={{
              fontSize: size,
              color,
              position: "absolute",
              transition: "opacity 0.6s, transform 0.9s",
              opacity: type === "O" ? 1 : 0,
              transform: type === "O" ? "scale(1)" : "scale(0.8)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
export default Loader;
