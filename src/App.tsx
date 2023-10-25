import './App.scss';
import React from 'react'
import routes from './routes';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route>
        {routes.map(({ path, component: Component}) => (
            <Route
              path={path}
              element={
                <Component />
              }
            />
          ))}
      </Route>
    </Routes>
  );
}

export default App;
