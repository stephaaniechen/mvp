import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HikingIcon from '@mui/icons-material/Hiking';
import AttractionsIcon from '@mui/icons-material/Attractions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Filters = ({ changeView, updatePlaces, updateFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const { id } = event.target;
    if (id === 'home') {
      axios.get('/places')
        .then(res => {
          updatePlaces(res.data);
          updateFilter('All');
        })
        .catch(err => console.log(err));
    } else if (id === 'food') {
      axios.get('/food')
        .then(res => {
          updatePlaces(res.data);
          updateFilter('Food');
        })
        .catch(err => console.log(err));
    } else if (id === 'activities') {
      axios.get('/activities')
        .then(res => {
          updatePlaces(res.data);
          updateFilter('Activities');
        })
        .catch(err => console.log(err));
    } else if (id === 'attractions') {
      axios.get('/attractions')
        .then(res => {
          updatePlaces(res.data);
          updateFilter('Attractions');
        })
        .catch(err => console.log(err));
    } else if (id === 'favorites') {
      axios.get('/faves')
        .then(res => {
          updatePlaces(res.data);
          updateFilter('Favorites');
        })
        .catch(err => console.log(err));
    } else if (id === 'others') {
      axios.get('/others')
        .then(res => {
          updatePlaces(res.data);
          updateFilter('Others');
        })
        .catch(err => console.log(err));
    }
    changeView('main');
  };

  return (
    <div>
      <Button
        id="filter-button"
        aria-controls={open ? 'filters' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        Filters
      </Button>
      <StyledMenu
        MenuListProps={{
          'aria-labelledby': 'filters',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple id="food">
          <RestaurantIcon/>
          Food
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple id="activities">
          <HikingIcon/>
          Activities
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple id="attractions">
          <AttractionsIcon/>
          Attractions
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple id="favorites">
          <FavoriteIcon/>
          Favorites
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple id="location">
          <TravelExploreIcon/>
          Location
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple id="others">
          <MoreHorizIcon/>
          Others
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default Filters;
