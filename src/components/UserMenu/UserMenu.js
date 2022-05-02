import React from 'react';
import styles from './userMenu-jss';
import { withStyles } from '@mui/styles';
import { PropTypes } from 'prop-types';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import Typography from '@mui/material/Typography';
import { changeUserStatus } from '../../redux/actions/userProfileActions';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Logout, Settings } from '@mui/icons-material';
import { logoutUser } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#f59c11',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const UserMenu = (props) => {
  const { classes, anchorEl, closeAccountMenu, userProfile, userId } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={Boolean(anchorEl)}
      onClose={closeAccountMenu}
      onClick={closeAccountMenu}
      disableScrollLock={true}
      PaperProps={{
        elevation: 2,
        className: classes.userMenu,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem
        className={classes.userMenuItem}
        onClick={() =>
          history.push('/app/profile/' + userProfile.userProfileId)
        }
      >
        <Avatar
          src={
            userProfile.profilePhoto !== null
              ? userProfile.profilePhoto.url
              : defaultUserPhoto
          }
          alt={userProfile.firstName + ' ' + userProfile.lastName}
        />
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subtitle1" fontWeight={500}>
              Mój profil
            </Typography>
          }
        />
      </MenuItem>
      <Divider className={classes.divider} />
      <MenuItem className={classes.userMenuItem} disabled>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subtitle2" fontWeight="bold">
              Ustaw status aktywności
            </Typography>
          }
        />
      </MenuItem>
      <MenuItem
        className={classes.userMenuItem}
        onClick={() => dispatch(changeUserStatus('ONLINE'))}
      >
        <ListItemIcon>
          <FiberManualRecordIcon style={{ color: activeStatus['ONLINE'] }} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">Dostępny</Typography>}
        />
      </MenuItem>
      <MenuItem
        className={classes.userMenuItem}
        onClick={() => dispatch(changeUserStatus('BUSY'))}
      >
        <ListItemIcon>
          <FiberManualRecordIcon style={{ color: activeStatus['BUSY'] }} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">Zajęty</Typography>}
        />
      </MenuItem>
      <MenuItem
        className={classes.userMenuItem}
        onClick={() => dispatch(changeUserStatus('BE_RIGHT_BACK'))}
      >
        <ListItemIcon>
          <FiberManualRecordIcon
            style={{ color: activeStatus['BE_RIGHT_BACK'] }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">Zaraz wracam</Typography>}
        />
      </MenuItem>
      <MenuItem
        className={classes.userMenuItem}
        onClick={() => dispatch(changeUserStatus('OFFLINE'))}
      >
        <ListItemIcon>
          <FiberManualRecordIcon style={{ color: activeStatus['OFFLINE'] }} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">Niedostępny</Typography>}
        />
      </MenuItem>
      <Divider className={classes.divider} />
      <MenuItem
        className={classes.userMenuItem}
        onClick={() => history.push('/app/settings')}
      >
        <ListItemIcon>
          <Settings fontSize="medium" />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subtitle2">Ustawienia konta</Typography>
          }
        />
      </MenuItem>
      <MenuItem
        className={classes.userMenuItem}
        onClick={() => {
          history.push('/auth/login');
          dispatch(logoutUser(userId));
        }}
      >
        <ListItemIcon>
          <Logout fontSize="medium" />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="subtitle2">Wyloguj się</Typography>}
        />
      </MenuItem>
    </Menu>
  );
};

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object.isRequired,
  closeAccountMenu: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userProfile: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserMenu);
