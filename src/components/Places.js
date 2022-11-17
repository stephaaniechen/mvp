import Container from '@mui/material/Container';
import Item from './Item.js';

const Places = ({ places, filter, changeView, waitRefresh }) => {
  return (
    <Container>
      <div className="main-title-container">
        <h1 className="main-title">{filter}</h1>
      </div>
      <div className="main-items-container">
        {places.map((place, index) => <Item key={place._id} index={index} place={place} changeView={changeView} waitRefresh={waitRefresh}/>)}
      </div>
    </Container>
  );
};

export default Places;
