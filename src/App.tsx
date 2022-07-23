import React, { useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { AppBarComponent, SideBar, Menu } from './components';
import { Blotter, Dashboard, TradeTicket } from './features';
import { BLOTTER, MAIN, ROUTES, TRADETICKET } from './routes';
import { store } from './store';

export const App: React.FC = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);
  const history = useHistory();

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
    typography: {
      fontSize: 14,
    },
  });

  const handleDrawerToggle = React.useCallback(() => {
    setSideBarToggle(!sideBarToggle);
  }, [sideBarToggle]);

  const onThemeChange = React.useCallback(() => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }, [themeMode]);

  const menuClickHandler = React.useCallback(
    (link) => {
      history.push(link);
      setSideBarToggle(!sideBarToggle);
    },
    [history, sideBarToggle]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBarComponent
          handleDrawerToggle={handleDrawerToggle}
          onThemeChange={onThemeChange}
          isDarkMode={themeMode === 'dark'}
          isDrawerOpen={sideBarToggle}
        />
        <SideBar
          isOpen={sideBarToggle}
          handleDrawerToggle={handleDrawerToggle}
          children={<Menu links={ROUTES} menuClickHandler={menuClickHandler} />}
        />
        <Switch>
          <Route exact path={MAIN}>
            <Dashboard />
          </Route>
          <Route exact path={BLOTTER}>
            <Blotter />
          </Route>
          <Route exact path={TRADETICKET}>
            <TradeTicket />
          </Route>
        </Switch>
      </ThemeProvider>
    </Provider>
  );
};
