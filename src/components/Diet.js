import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import Create from "./diet-components/Create.js";
import Show from "./diet-components/Show.js";
import { auth } from "../firebaseConfig";

const Diet = (props) => {
  const [selectedComponent, setSelectedComponent] = useState("Create");
  const [firebaseUUID, setFirebaseUUID] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUUID(user.uid);
      } else {
        setFirebaseUUID("");
      }
    });

    return () => unsubscribe();
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Create":
        return <Create />;
      case "Show":
        return <Show firebaseUUID={firebaseUUID} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="container-limit">
        <h1 style={{ padding: "0px 20px", color: "#3E9A81", borderBottom: "3px solid #3E9A81", textAlign: "center" }}>
          Dieta
        </h1>
        <div className="container-dietas" style={{ display: "flex", width: "100%" }}>
          <div className="criar-dieta" style={{ display: "flex", flexDirection: "column", width: "70%" }}>
            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              size="large"
              sx={{
                '& .MuiButtonGroup-grouped': {
                  backgroundColor: '#3E9A81',
                  borderColor: 'transparent',
                  '&.Mui-selected': {
                    backgroundColor: '#54C6A8',
                    color: '#fff',
                  },
                  '&:hover': {
                    backgroundColor: '#54C6A8',
                    color: '#fff',
                  },
                },
              }}
            >
              <Button onClick={() => setSelectedComponent("Create")}>Criar Dieta</Button>
              <Button onClick={() => setSelectedComponent("Show")}>Ver Dieta</Button>
            </ButtonGroup>
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;
