import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Substitua useHistory por useNavigate

const LogoutButton = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Use useNavigate em vez de useHistory

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out.");
      navigate('/login'); // Redireciona para a página de login (usando useNavigate)
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out: ", error);
    });
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
