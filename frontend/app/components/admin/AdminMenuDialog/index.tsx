import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


type Props = {
  open: boolean;
  // selectedValue: string;
  onClose: (value: string) => void;
}

const AdminMenuDialog: FC<Props> = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose("");
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}  maxWidth="sm" fullWidth={true}>
      <DialogTitle>Admin Actions</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleListItemClick('createAsset')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Create Asset" />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('updateAsset')}>
          <ListItemAvatar>
            <Avatar>
              <EditIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Edit Asset" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AdminMenuDialog;
