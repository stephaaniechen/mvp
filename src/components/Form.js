import { useState, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const dataTemplate = {
  name: '',
  category: '',
  city: '',
  country: '',
  description: '',
  images: '',
  favorite: false
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form = ({ waitRefresh }) => {
  const [data, setData] = useState(dataTemplate);
  const [open, setOpen] = useState(false);

  const fillingForm = (event) => {
    const {name, value} = event.target;
    if (name === 'images') {
      let images = value.split('\n');
      setData({
        ...data,
        [name]: images,
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (data.name && data.category && data.country && data.description && data.images) {
      axios.post('/places', data)
        .then(res => {
          setData(dataTemplate);
          setOpen(true);
          waitRefresh();
        })
        .catch(err => console.log(err));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="form-container">
      <section className="form">
        <header className="form-title">
          <h2>I want to visit...</h2>
        </header>
        <form onSubmit={onSubmit}>
          <label>Name:
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={fillingForm}/>
          </label>
          <label> Category:
            <select
              name="category"
              value={data.category}
              onChange={fillingForm}>
              <option value="" disabled>—</option>
              <option value="activity">Activity</option>
              <option value="attraction">Attraction</option>
              <option value="food">Food</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>City:
            <input
              type="text"
              name="city"
              value={data.city}
              onChange={fillingForm}/>
          </label>
          <label>Country:
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={fillingForm}/>
          </label>
          <label>Description:
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={fillingForm}/>
          </label>
          <label>Images: <i>(one link per line)</i>
            <textarea
              name="images"
              onChange={fillingForm}/>
          </label>
          <input type="submit" value="Add Place"/>
        </form>
      </section>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Added!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
