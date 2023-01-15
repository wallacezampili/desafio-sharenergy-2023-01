import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type AuthType = {
  login: (username: string, password: string, remember: boolean) => void,
  loggout: () => void,
  authenticated: boolean,
  authloading: boolean
};

export const AuthContext = createContext<AuthType | null>(null);

export function AuthProvider(props: React.PropsWithChildren) {

  const [authenticated, setAuthenticated] = useState(false);
  const [authloading, setauthLoading] = useState(true);
  const navigate = useNavigate();

  async function login(username: string, password: string, remember: boolean) {
    await axios
      .post("/login", { username, password, remember })
      .then(
        (response: { data: { authentication: boolean; message: string } }) => {
          console.log(response.data);
          if (response.data.authentication) {
            
            if(remember)
            {
              localStorage.setItem("username", username);
              localStorage.setItem("password", password);
            }
            else
            {
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("password", password);
            }
            console.log("Function Login");
            setAuthenticated(true);
            navigate("/");
            return true;
          }
          return false;
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  function loggout() {
    localStorage.clear();
    sessionStorage.clear();
    setAuthenticated(false);
    navigate("/login");
  }

  useEffect(() => {

    var username = null;
    var password = null;
    
    if(localStorage.getItem('username') && localStorage.getItem('password'))
    {
      username = localStorage.getItem('username');
      password = localStorage.getItem('password');

    }
    else
    {
      username = sessionStorage.getItem('username');
      password = sessionStorage.getItem('password');

    }

    const validateStorage = async (
      username: string | null,
      password: string | null
    ) => {
      await axios
        .post("/login", { username, password })
        .then(
          (response: {
            data: { authentication: boolean; message: string };
          }) => {
            if (response.data.authentication) 
            {
              setAuthenticated(response.data.authentication);
              
            }
            
            setauthLoading(false);
       
          }
        )
        .catch((err) => {
          console.log(err);
        });
    };
    validateStorage(username, password);
  }, []);

  return (
    <AuthContext.Provider value={{authenticated, login, loggout, authloading}}>
      {props.children}
    </AuthContext.Provider>
  );
}
