import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './chatMember-jss';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BlockIcon from '@mui/icons-material/Block';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  deleteMemberFromChat,
  setChatMemberPermission,
} from '../../redux/actions/chatAction';
import ActionConfirmation from '../ActionConfirmation/ActionConfirmation';
import Popup from '../Popup/Popup';
import { formatDateWithTime } from '../../utils/formatDateWithTime';

const ChatMember = (props) => {
  const {
    classes,
    chatId,
    memberId,
    userMember,
    addedIn,
    canAddOthers,
    chatCreator,
    isPrivateChat,
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const loggedUser = useSelector((state) => state.auth.user);

  const isAdmin = loggedUser && loggedUser.roles.indexOf('ROLE_ADMIN') > -1;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const handleCloseMemberManage = () => {
    setAnchorEl(null);
  };

  const handleClickMemberManage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickSetMemberPermission = (permission) => {
    handleCloseMemberManage();
    dispatch(setChatMemberPermission(chatId, memberId, permission));
  };

  const handleClickDeleteChatMember = () => {
    handleCloseMemberManage();
    setOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const deleteChatMemberClick = () => {
    handleCloseDeletePopup();
    dispatch(deleteMemberFromChat(memberId, true));
  };

  return (
    <div className={classes.memberContainer}>
      <Avatar
        src={
          userMember.profilePhoto
            ? userMember.profilePhoto.url
            : defaultUserPhoto
        }
        alt={userMember.firstName + ' ' + userMember.lastName}
        className={classes.memberPhoto}
        onClick={() => history.push('/app/profile/' + userMember.userId)}
      />
      <div>
        <Typography variant="body1" fontWeight={500} noWrap>
          {userMember.firstName + ' ' + userMember.lastName}
        </Typography>
        <Typography fontSize="12px" noWrap lineHeight={1.2}>
          {'Dołączył(a): ' + formatDateWithTime(addedIn)}
        </Typography>
        {!isPrivateChat && chatCreator && (
          <div>
            {userMember.userId !== chatCreator.userId ? (
              <Typography fontSize="12px">
                {'Uprawnienie: ' + (canAddOthers ? 'zapraszanie' : 'brak')}
              </Typography>
            ) : (
              <Typography fontSize="12px">Założyciel czatu</Typography>
            )}
          </div>
        )}
      </div>
      {chatCreator &&
        userMember.userId !== chatCreator.userId &&
        !isPrivateChat &&
        (loggedUser.userId === chatCreator.userId || isAdmin) && (
          <div className={classes.manageMemberBox}>
            <IconButton onClick={handleClickMemberManage}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMemberManage}
              disableScrollLock={true}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {canAddOthers ? (
                <MenuItem onClick={() => handleClickSetMemberPermission(false)}>
                  <ListItemIcon>
                    <BlockIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="subtitle2">
                        Usuń uprawnienie
                      </Typography>
                    }
                  />
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleClickSetMemberPermission(true)}>
                  <ListItemIcon>
                    <PersonAddIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="subtitle2">
                        Daj uprawnienie do zapraszania
                      </Typography>
                    }
                  />
                </MenuItem>
              )}
              <MenuItem onClick={handleClickDeleteChatMember}>
                <ListItemIcon>
                  <DeleteIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">Usuń członka</Typography>
                  }
                />
              </MenuItem>
            </Menu>
            <Popup
              open={openDeletePopup}
              type="confirmation"
              title="Usuwanie członka"
              onClose={handleCloseDeletePopup}
            >
              <ActionConfirmation
                title="Czy napewno chcesz usunąć członka?"
                confirmationAction={deleteChatMemberClick}
                rejectionAction={handleCloseDeletePopup}
              />
            </Popup>
          </div>
        )}
    </div>
  );
};

ChatMember.propTypes = {
  classes: PropTypes.object.isRequired,
  chatId: PropTypes.number.isRequired,
  memberId: PropTypes.number.isRequired,
  userMember: PropTypes.object.isRequired,
  addedIn: PropTypes.string.isRequired,
  canAddOthers: PropTypes.bool,
  chatCreator: PropTypes.object,
  isPrivateChat: PropTypes.bool,
};

export default withStyles(styles)(ChatMember);
