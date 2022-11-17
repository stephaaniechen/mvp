import { useState, useEffect } from 'react';
import Nav from './components/Nav.js';
import Places from './components/Places.js';
import Photos from './components/Photos.js';
import Form from './components/Form.js';
import Add from './components/Add.js';
import axios from 'axios';

const App = () => {
  const [view, setView] = useState('main');
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState(null);
  const [filter, setFilter] = useState('All');

  const refresh = () => {
    axios.get('/places')
      .then(res => {
        setPlaces(res.data);
        setView('main');
      })
      .catch(err => console.log(err));
  };

  const waitRefresh = () => {
    setTimeout(refresh, 1000);
  };

  const renderView = () => {
    if (view === 'main') {
      return <Places places={places} filter={filter} changeView={changeView} waitRefresh={waitRefresh}/>;
    } else if (view === 'details') {
      return <Photos place={place}/>;
    } else {
      return <Form waitRefresh={waitRefresh}/>;
    }
  };

  const changeView = (view, index) => {
    if (view === 'details') {
      setView('details');
      setPlace(places[index]);
    } else {
      setView(view);
    }
  };

  const updatePlaces = (places) => {
    setPlaces(places);
  };

  const updateFilter = (filter) => {
    setFilter(filter);
  };

  useEffect(refresh, []);

  return (
    <div>
      <Nav changeView={changeView} updatePlaces={updatePlaces} updateFilter={updateFilter}/>
      <div className="view">
        {renderView()}
      </div>
      <Add changeView={changeView}/>
    </div>
  );
};

export default App;
