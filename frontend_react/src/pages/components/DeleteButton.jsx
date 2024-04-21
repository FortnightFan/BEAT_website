// DeleteButton.jsx
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

const DeleteButton = ({ onDelete }) => {
  return (
    <Tooltip title="Delete" enterDelay={500} leaveDelay={200}>
      <IconButton aria-label="remove" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;