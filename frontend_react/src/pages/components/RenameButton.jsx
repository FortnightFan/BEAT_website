import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';

const RenameButton = ({ onRename, promptMessage }) => {
  const handleRename = (event) => {
    event.stopPropagation();

    const newName = window.prompt(promptMessage);
    if (newName) {
      onRename(newName);
    }
  };

  return (
    <Tooltip title="Rename" enterDelay={500} leaveDelay={200}>
      <IconButton aria-label="edit" onClick={handleRename}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RenameButton;
