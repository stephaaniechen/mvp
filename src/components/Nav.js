import { AppBar, Toolbar, Button } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Filters from './Filters.js';
import axios from 'axios';

const Nav = ({ changeView, updatePlaces, updateFilter }) => {
  const onHome = () => {
    axios.get('/places')
      .then(res => {
        updatePlaces(res.data);
        changeView('main');
        updateFilter('All');
      })
      .then(err => console.log(err));
  };

  return (
    <AppBar position="static">
      <Toolbar className="nav-container">
        <div className="nav-branding">
          <img className="logo" src="https://static.vecteezy.com/system/resources/thumbnails/007/071/049/small/hand-drawn-doodle-earth-globe-love-icon-illustration-isolated-vector.jpg"/>
          <h1 className="company-name">Places</h1>
        </div>
        <div className="nav-buttons">
          <Button id="home-button" onClick={onHome}>
            <HomeRoundedIcon/>
          </Button>
          <Filters changeView={changeView} updatePlaces={updatePlaces} updateFilter={updateFilter}/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
