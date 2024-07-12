import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SignPage from './components/SignPage';
import Homepage from './components/Homepage';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("UUID do usuário:", user.uid);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='loading-container'>
        <div className="loading-spinner">
          <div className='loading-logo'> 
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {user ? (
        <div>
          <Homepage setUser={setUser} />
        </div>
      ) : (
        <SignPage />
      )}
    </div>
  );
};

export default App;
