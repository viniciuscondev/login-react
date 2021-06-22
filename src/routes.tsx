import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Login from './pages/Login';
import Register from './pages/Register';

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
            path="/"
            component={Login}
          />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Routes;
