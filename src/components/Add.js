import AddIcon from '@mui/icons-material/Add';

const Add = ({ changeView }) => {
  const handleClick = (event) => {
    changeView('form');
  };

  return (
    <div className="add-container">
      <button className="add-button" onClick={handleClick}>
        <AddIcon/>
      </button>
    </div>
  );
};

export default Add;
