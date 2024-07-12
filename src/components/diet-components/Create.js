import React, { useState, useEffect } from "react";
import { FormControl, TextField, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ComponentList from "./ComponentList";
import { auth } from "../../firebaseConfig";

const Create = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [firebaseUUID, setFirebaseUUID] = useState("");
  const [mealType, setMealType] = useState("");
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleAddItem = (item) => {
    const quantityFactor = (quantity[item.id] || 100) / 100;
    const itemWithQuantity = {
      ...item,
      quantidade: quantity[item.id] || 100,
      carboidratos: (item["Carboidrato"] * quantityFactor).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 3 }),
      proteinas: (item["Proteina"] * quantityFactor).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 3 }),
      lipidios: (item["Lipideos"] * quantityFactor).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 3 }),
      energia: (item["Energia_kcal"] * quantityFactor).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })
    };

    if (!selectedItems[mealType]) {
      selectedItems[mealType] = {};
    }
    setSelectedItems({
      ...selectedItems,
      [mealType]: {
        ...selectedItems[mealType],
        [item.Nome]: itemWithQuantity
      }
    });
  };

  const handleRemoveItem = (mealType, itemName) => {
    const updatedItems = { ...selectedItems };
    delete updatedItems[mealType][itemName];
    if (Object.keys(updatedItems[mealType]).length === 0) {
      delete updatedItems[mealType];
    }
    setSelectedItems(updatedItems);
  };

  const handleSelectType = () => {
    if (mealType) {
      setIsTypeSelected(true);
      if (!selectedItems[mealType]) {
        setSelectedItems({
          ...selectedItems,
          [mealType]: {}
        });
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/search_alimentos?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar alimentos");
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const listaDeAlimentos = () => {
    return (
      <ul style={{ width: "100%" }}>
        {searchResults.map((item) => (
          <li key={item.id} className="list-item">
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", textAlign: "left", justifyContent: "start", width: "100%" }}>
              <h3>{item.Nome}</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <p>Carboidratos: {((item["Carboidrato"] / 100) * (quantity[item.id] || 100)).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} g</p>
                <p>Proteínas: {((item["Proteina"] / 100) * (quantity[item.id] || 100)).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} g</p>
                <p>Lipídeos: {((item["Lipideos"] / 100) * (quantity[item.id] || 100)).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} g</p>
                <p>Energia: {((item["Energia_kcal"] / 100) * (quantity[item.id] || 100)).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kcal</p>
              </div>
            </div>
            <FormControl fullWidth sx={{ width: "100%", display: "flex", margin: "10px" }}>
              <TextField
                label="Quantidade (g)"
                variant="outlined"
                value={quantity[item.id] || 100}
                onChange={(e) => setQuantity({ ...quantity, [item.id]: e.target.value })}
                sx={{
                  width: "100%",
                  '& .MuiOutlinedInput-root': {
                    width: "100%"
                  }
                }}
              />
            </FormControl>
            <IconButton
              sx={{
                color: "#54C6A8",
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: "#3E9A81",
                  color: "white"
                }
              }}
              onClick={() => handleAddItem(item)}
              disabled={!isTypeSelected}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </li>
        ))}
      </ul>
    );
  };

  const hasItems = Object.keys(selectedItems).length > 0;

  return (
    <div className="input-container" style={{ width: "100%" }}>
      <div style={{ width: "80%", display: "flex", alignItems: 'center', justifyContent: "center", gap: "10px" }}>
        <FormControl fullWidth sx={{ width: "100%", display: "flex" }}>
          <TextField
            label="Tipo de Refeição"
            variant="outlined"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                width: "100%"
              }
            }}
          />
        </FormControl>
        <Button
          sx={{
            color: "aliceBlue",
            backgroundColor: "#54C6A8",
            '&:hover': {
              backgroundColor: "#3E9A81"
            },
            borderRadius: "5px"
          }}
          onClick={handleSelectType}
        >
          Confirmar
        </Button>
      </div>
      <p>Entre com a hora da refeição acima (Exemplo: Almoço - 10:00)</p>
      <div style={{ width: "80%", display: "flex", alignItems: 'center', justifyContent: "center", gap: "10px" }}>
        <FormControl fullWidth sx={{ width: "100%", display: "flex" }}>
          <TextField
            label="Buscar Alimento"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                width: "100%"
              }
            }}
          />
        </FormControl>
        <Button
          sx={{
            color: "aliceBlue",
            backgroundColor: "#54C6A8",
            '&:hover': {
              backgroundColor: "#3E9A81"
            },
            borderRadius: "5px"
          }}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
      {loading ?
        <div className='loading-container'>
          <div className="loading-spinner">
            <div className='loading-logo'></div>
          </div>
        </div>
        :
        error ? (
          <div>Error: {error}</div>
        ) : (
          listaDeAlimentos()
        )
      }
      {hasItems && (
        <ComponentList items={selectedItems} firebaseUUID={firebaseUUID} onRemoveItem={handleRemoveItem} />
      )}
    </div>
  );
};

export default Create;
