import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import State from './Components/StatePage';
import City from './Components/CityPage';
import WareHouse from './Components/WareHouse';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/state" element={<State />} /> 
          <Route path="/city" element={<City />} /> 
          <Route path="/warehouse" element={<WareHouse />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
