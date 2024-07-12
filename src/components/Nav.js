import React from "react"
import Logo from "../media/Logo Nav.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import LogoutIcon from '@mui/icons-material/Logout';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HomeIcon from '@mui/icons-material/Home';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Nav = (props) => {

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuário deslogado com sucesso");
        props.setUser(null);
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
      });
  };

  return (
    <div className="nav">
      <div className="nav-logo-container">
        <img className="nav-logo" src={Logo} alt="Logotipo" />
      </div>
      <ul className="menu">
        <li className="menu-itens">
          <Link to="/">
            <Button
              variant="text"
              startIcon={<HomeIcon sx={{ color: 'aliceblue' }} />}
              sx={{
                color: 'aliceblue',
                borderColor: 'aliceblue',
                '&:hover': {
                  borderColor: 'lightblue',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Principal
            </Button>
          </Link>
        </li>
        <li className="menu-itens">
          <Link to="/diet">
            <Button
              variant="text"
              startIcon={<LocalDiningIcon sx={{ color: 'aliceblue' }} />}
              sx={{
                color: 'aliceblue',
                borderColor: 'aliceblue',
                '&:hover': {
                  borderColor: 'lightblue',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Dieta
            </Button>
          </Link>
        </li>
        <li className="menu-itens">
          <Link to="/recipes">
            <Button
              variant="text"
              startIcon={<ElectricBoltIcon sx={{ color: 'aliceblue' }} />}
              sx={{
                color: 'aliceblue',
                borderColor: 'aliceblue',
                '&:hover': {
                  borderColor: 'lightblue',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Receitas
            </Button>
          </Link>
        </li>
        <Button
          variant="outlined"
          onClick={handleLogout}
          startIcon={<LogoutIcon sx={{ color: 'aliceblue' }} />}
          sx={{
            color: 'aliceblue',
            borderColor: 'aliceblue',
            '&:hover': {
              borderColor: 'lightblue',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Sair
        </Button>
      </ul>
    </div>
  )
};

export default Nav;
