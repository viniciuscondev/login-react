import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  input, select, textarea, span, button, ul, li {
    font-family:inherit;
  }
`;

const theme = {
  colors: {
    background: '#152ba7',
    white: '#f8f8f8',
    black: '#181818',
    gray: '#b6b6b6'
  }
}

function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setAuth(boolean: boolean): void {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3333/users/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route
            exact
            path="/register"
            component={Register}
          />
          <Route
            exact
            path="/dashboard"
            render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/" />}
          />
          <Route
            exact
            path="/"
            render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />}
          />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Routes;
