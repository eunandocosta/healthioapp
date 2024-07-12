import React, { useState } from "react";
import { TextField, Button, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Logo from "../media/Logo.svg";
import axios from 'axios';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignPage = (props) => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const isPasswordValid = (password) => {
    const minLength = 6;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
    return password.length >= minLength && regex.test(password);
  };

  const isPasswordMatch = isPasswordValid(password) && isPasswordValid(confirmPassword) && password === confirmPassword;

  const handleRegister = () => {
    if (isPasswordMatch) {
        axios.post('http://localhost:5004/register', { email, password })
            .then((response) => {
                if (response && response.data) {
                    console.log("Registration successful:", response.data);
                } else {
                    console.error("Registration failed: No data received");
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    console.error("Error registering:", error.response.data);
                } else {
                    console.error("Error registering:", error.message);
                }
            });
        }
    };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userCredential.user.getIdToken().then((idToken) => {
                axios.post('http://localhost:5004/login', { idToken })
                    .then((response) => {
                        if (response && response.data) {
                            console.log("Login successful");
                        } else {
                            console.error("Login failed: No data received");
                        }
                    })
                    .catch((error) => {
                        if (error.response && error.response.data) {
                            console.error("Error logging in:", error.response.data);
                        } else {
                            console.error("Error logging in:", error.message);
                        }
                    });
            });
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
  };

  return (
    <div className="container" style={{
      backgroundColor: '#54C6A8',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="announcement">
        <h1 className="announcement-title">Health.io é o seu assistente de dietas</h1>
      </div>
      <div className="login">
        {!login ?
          <div className="control-area">
            <img className="main-logo" src={Logo} alt="Logotipo" />
            <TextField
              className="TextField"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              fullWidth required
            />

            <TextField
              className="TextField"
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$"
              inputProps={{
                minLength: 6,
                title: "A senha deve ter pelo menos 6 caracteres, incluindo letras e números."
              }}
              fullWidth required
            />

            <Button variant="contained" fullWidth
              sx={{ backgroundColor: '#54C6A8', '&:hover': { backgroundColor: '#3E9A81' } }}
              onClick={handleLogin}
            >Entrar</Button>

            <Button variant="outlined" fullWidth
              sx={{ borderColor: '#54C6A8', color: '#54C6A8', '&:hover': { borderColor: '#3E9A81' } }}
              onClick={() => setLogin(true)}>Cadastrar</Button>

            <p className="text-link">Esqueci minha senha</p>

            <IconButton
              sx={{
                backgroundColor: '#FF5733',
                '&:hover': { backgroundColor: '#C70039' },
                color: '#fff',
                width: 60,
                height: 60,
                borderRadius: '50%',
              }}
            >
              <GoogleIcon />
            </IconButton>
          </div>
          :
          <div className="control-area">
            <img className="main-logo" src={Logo} alt="Logotipo" />
            <TextField
              className="TextField"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              fullWidth required
            />

            <TextField
              className="TextField"
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$"
              inputProps={{
                minLength: 6,
                title: "A senha deve ter pelo menos 6 caracteres, incluindo letras e números."
              }}
              fullWidth required
            />

            <TextField
              className="TextField"
              label="Repetir senha"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$"
              inputProps={{
                minLength: 6,
                title: "A senha deve ter pelo menos 6 caracteres, incluindo letras e números."
              }}
              fullWidth required
            />

            <Button variant="contained" fullWidth
              sx={{ backgroundColor: '#54C6A8', '&:hover': { backgroundColor: '#3E9A81' } }}
              disabled={!isPasswordMatch}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>

            <Button variant="outlined" fullWidth
              sx={{ borderColor: '#54C6A8', color: '#54C6A8', '&:hover': { borderColor: '#3E9A81' } }}
              onClick={() => setLogin(false)}>Entrar</Button>

            <p className="text-link">Esqueci minha senha</p>

            <IconButton
              sx={{
                backgroundColor: '#FF5733',
                '&:hover': { backgroundColor: '#C70039' },
                color: '#fff',
                width: 60,
                height: 60,
                borderRadius: '50%',
              }}
            >
              <GoogleIcon />
            </IconButton>
          </div>
        }
      </div>
    </div>
  );
};

export default SignPage;
