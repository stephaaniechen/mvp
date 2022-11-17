import Container from '@mui/material/Container';

const Photos = ({ place }) => (
  <Container id="photos-container">
    <div className="main-title-container">
      <h1 className="main-title">{place.name}</h1>
    </div>
    <div className="photos-container">
      {place.images.map((image, index) => <img key={index} className="photos" src={image}/>)}
    </div>
  </Container>
);

export default Photos;
