// AddButton.jsx
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

const AddButton = ({ onAdd, promptMessage }) => {
  const handleAddClick = () => {
    const result = window.prompt(promptMessage);
    if (result) {
      onAdd(result);
    }
  };

  return (
    <Tooltip title="Add New" enterDelay={500} leaveDelay={200}>
      <IconButton onClick={handleAddClick} size="large">
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
