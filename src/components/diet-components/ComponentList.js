import React, { useState } from "react";
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const ComponentList = ({ items, firebaseUUID, onRemoveItem }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = async () => {
    const data = {
      firebase_uuid: firebaseUUID,
      refeicoes: Object.entries(items).map(([mealType, alimentos]) => ({
        tipo: mealType,
        alimentos: Object.values(alimentos).map(item => ({
          nome: item.Nome,
          quantidade: item.quantidade || 1
        }))
      }))
    };

    console.log(data);

    try {
      const response = await fetch('http://localhost:5001/dietas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Dieta criada com sucesso', result);
      } else {
        const errorData = await response.json();
        console.error('Erro ao criar a dieta', errorData);
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        height: isMinimized ? "12vh" : "80vh",
        width: "25%",
        backgroundColor: "white",
        overflowY: "auto",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#3E9A81",
        padding: "10px",
        color: "aliceblue"
      }}>
        <h2>Itens Selecionados</h2>
        <IconButton onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? <MenuIcon sx={{ color: 'aliceblue' }} /> : <MenuOpenIcon sx={{ color: 'aliceblue' }} />}
        </IconButton>
      </div>
      {!isMinimized && Object.entries(items).map(([mealType, alimentos], index) => (
        <div key={index} style={{ padding: "5px" }}>
          <h3>{mealType}</h3>
          <ul>
            {Object.entries(alimentos).map(([nome, item], itemIndex) => (
              <li key={itemIndex}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{nome} - {item.quantidade}g</span>
                  <IconButton onClick={() => onRemoveItem(mealType, nome)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!isMinimized && (
        <Button
          sx={{
            color: "aliceBlue",
            backgroundColor: "#54C6A8",
            '&:hover': {
              backgroundColor: "#3E9A81"
            },
            borderRadius: "5px",
            margin: "5px",
          }}
          onClick={handleSubmit}
        >
          Enviar Dieta
        </Button>
      )}
    </div>
  );
};

export default ComponentList;
