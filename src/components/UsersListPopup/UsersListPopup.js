import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useHistory } from 'react-router-dom';
import { ListItemButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';

const UsersListPopup = (props) => {
  const { title, open, users, onClose } = props;

  const history = useHistory();

  return (
    <Dialog open={open} onBackdropClick={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItemButton
            key={user.userId}
            onClick={() => history.push('/app/profile/' + user.userId)}
            sx={{ marginLeft: '10px' }}
          >
            <ListItemAvatar>
              <Avatar
                alt={user.firstName + ' ' + user.lastName}
                src={
                  user.profilePhoto ? user.profilePhoto.url : defaultUserPhoto
                }
                sx={{ width: 48, height: 48 }}
              />
            </ListItemAvatar>
            <ListItemText
              sx={{ marginLeft: '15px', textOverflow: 'ellipsis' }}
              disableTypography
              primary={
                <Typography variant="subtitle1" noWrap>
                  {user.firstName + ' ' + user.lastName}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
};

UsersListPopup.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UsersListPopup;
