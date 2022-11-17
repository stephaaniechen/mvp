import { useState, forwardRef } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = ({ index, place, changeView, waitRefresh }) => {
  const [open, setOpen] = useState(false);
  const [fave, setFave] = useState(place.favorite);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const seeDetails = (event) => {
    changeView('details', index);
  };

  const onDelete = (event) => {
    axios.delete(`/places/${place._id}`, { data: { _id: place._id } })
      .then(res => {
        setOpen(true);
        waitRefresh();
      })
      .catch(err => console.log(err));
  };

  const onFave = (event) => {
    axios.patch(`/places/${place._id}`, { favorite: !fave })
      .then(res => setFave(!fave))
      .catch(err => console.log(err));
  };

  return (
    // <div className="item-container">
    //   <img className="item-image" src={place.images[0]}/>
    //   <div className="item-overlay">
    //     <button className="item-details" onClick={seeDetails}>Details</button>
    //   </div>
    // </div>
    <>
      <Card id="item" sx={{ width: 350, height: 425 }}>
        <CardMedia
          component="img"
          height="225"
          image={place.images[0]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {place.name}
          </Typography>
          <p>📍<i>{place.city}, {place.country}</i></p>
          <Typography variant="body2" color="text.secondary">
            {place.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button id="photos-button" onClick={seeDetails}>Photos</Button>
          {fave ? <button className="item-control faved" onClick={onFave}><FavoriteIcon/></button>
            : <button className="item-control fave" onClick={onFave}><FavoriteBorderIcon/></button>}
          <button className="item-control"><EditIcon/></button>
          <button className="item-control" onClick={onDelete}><DeleteForeverIcon/></button>
        </CardActions>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Deleted
        </Alert>
      </Snackbar>
    </>
  );
};

export default Item;
