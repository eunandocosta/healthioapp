import React, { useState, useEffect } from "react";
import { TextField, IconButton, Button, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress, Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const Show = ({ firebaseUUID }) => {
  const [dieta, setDieta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    const fetchDieta = async () => {
      try {
        const response = await fetch(`http://localhost:5001/dieta?firebase_uuid=${firebaseUUID}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dieta");
        }
        const result = await response.json();
        setDieta(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDieta();
  }, [firebaseUUID]);

  const handleUpdateQuantidade = async (alimentoId) => {
    try {
      const response = await fetch('http://localhost:5001/update_quantidade', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alimento_id: alimentoId, nova_quantidade: newQuantity })
      });

      if (response.ok) {
        const updatedAlimento = await response.json();
        setDieta(prevDieta => ({
          ...prevDieta,
          refeicoes: prevDieta.refeicoes.map(refeicao => ({
            ...refeicao,
            alimentos: refeicao.alimentos.map(alimento => alimento.id === updatedAlimento.id ? updatedAlimento : alimento)
          }))
        }));
        setEditMode(null);
        setNewQuantity("");
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar a quantidade do alimento', errorData);
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  const handleDeleteAlimento = async (alimentoId) => {
    try {
      const response = await fetch('http://localhost:5001/delete_alimento', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alimento_id: alimentoId })
      });

      if (response.ok) {
        setDieta(prevDieta => ({
          ...prevDieta,
          refeicoes: prevDieta.refeicoes.map(refeicao => ({
            ...refeicao,
            alimentos: refeicao.alimentos.filter(alimento => alimento.id !== alimentoId)
          }))
        }));
      } else {
        const errorData = await response.json();
        console.error('Erro ao deletar o alimento', errorData);
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  const handleDeleteDieta = async () => {
    try {
      const response = await fetch('http://localhost:5001/delete_dietas', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firebase_uuid: firebaseUUID })
      });

      if (response.ok) {
        setDieta(null);
      } else {
        const errorData = await response.json();
        console.error('Erro ao deletar a dieta', errorData);
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      {dieta ? (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          {dieta.refeicoes.map((refeicao, index) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <Typography variant="h6"><strong>Tipo de Refeição:</strong> {refeicao.tipo}</Typography>
              <List sx={{ width: "50vw" }}>
                {refeicao.alimentos.map((alimento, i) => (
                  <ListItem key={i} style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                    {editMode === alimento.id ? (
                      <TextField
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        placeholder="Nova quantidade"
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: '10px' }}
                      />
                    ) : (
                      <ListItemText primary={`${alimento.nome} - ${alimento.quantidade}g`} />
                    )}
                    <ListItemSecondaryAction>
                      {editMode === alimento.id ? (
                        <IconButton onClick={() => handleUpdateQuantidade(alimento.id)} sx={{ color: "#54C6A8" }}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => { setEditMode(alimento.id); setNewQuantity(alimento.quantidade); }} sx={{ color: "#54C6A8" }}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDeleteAlimento(alimento.id)} sx={{ color: "#FF6F61" }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteDieta}
            sx={{ backgroundColor: '#FF6F61', marginTop: '20px', "&:hover": { backgroundColor: '#FF4F41' } }}
          >
            Deletar Dieta
          </Button>
        </div>
      ) : (
        <Typography>Nenhuma dieta encontrada</Typography>
      )}
    </Container>
  );
};

export default Show;
