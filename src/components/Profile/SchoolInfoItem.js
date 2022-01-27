import React, { useState } from 'react';
import styles from './profile-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Popup from '../Popup/Popup';
import AddSchoolForm from '../Forms/AddSchoolForm';
import ActionConfirmation from '../ActionConfirmation/ActionConfirmation';
import { useDispatch } from 'react-redux';
import { deleteSchoolInformation } from '../../redux/actions/userProfileActions';

const schoolTypes = {
  PRIMARY_SCHOOL: 'Szkoła Podstawowa',
  SECONDARY_SCHOOL: 'Szkoła Średnia',
  UNIVERSITY: 'Szkoła Wyższa',
};

const SchoolInfoItem = (props) => {
  const { classes, schoolId, type, name, startDate, graduationDate, manage } =
    props;

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditionSchoolPopup, setOpenEditionSchoolPopup] = useState(false);
  const [openDeleteSchoolPopup, setOpenDeleteSchoolPopup] = useState(false);

  const handleClickSchoolSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSchoolSettings = () => {
    setAnchorEl(null);
  };

  const handleCloseEditionSchoolPopup = () => {
    setOpenEditionSchoolPopup(false);
  };

  const handleOpenEditionSchoolPopupClick = () => {
    setOpenEditionSchoolPopup(true);
    handleCloseSchoolSettings();
  };

  const handleCloseSchoolDeletePopup = () => {
    setOpenDeleteSchoolPopup(false);
  };

  const handleDeleteSchoolInformation = () => {
    dispatch(deleteSchoolInformation(schoolId));
    handleCloseSchoolSettings();
  };

  const handleDeleteSchoolClick = () => {
    setOpenDeleteSchoolPopup(true);
    handleCloseSchoolSettings();
  };

  return (
    <div className={classes.profileInfoItemContainer}>
      <Typography className={classes.schoolItemType} variant="h6">
        {schoolTypes[type]}
      </Typography>
      <div className={classes.profileInfoItemContent}>
        <SchoolIcon fontSize="large" color="primary" />
        <div className={classes.profileInfoItemDetails}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" noWrap>
            {'Uczęszczał(a) od ' + startDate}
            <span>{graduationDate !== null && ' do ' + graduationDate}</span>
          </Typography>
        </div>
        {manage && (
          <div>
            <IconButton
              className={classes.profileInfoItemSettingsBtn}
              onClick={handleClickSchoolSettings}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseSchoolSettings}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleOpenEditionSchoolPopupClick}>
                <ListItemIcon>
                  <EditIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">Edytuj szkołę</Typography>
                  }
                />
              </MenuItem>
              <MenuItem onClick={handleDeleteSchoolClick}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">Usuń szkołę</Typography>
                  }
                />
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <Popup
        open={openEditionSchoolPopup}
        type="profileInfo"
        title="Edytuj dodaną szkołę"
        onClose={handleCloseEditionSchoolPopup}
      >
        <AddSchoolForm
          edition
          schoolId={schoolId}
          editedSchoolName={name}
          editedSchoolType={type}
          editedStartDate={startDate}
          editedGraduationDate={graduationDate}
          closePopup={handleCloseEditionSchoolPopup}
        />
      </Popup>
      <Popup
        open={openDeleteSchoolPopup}
        type="confirmation"
        title="Usuwanie informacji o szkole"
        onClose={handleCloseSchoolDeletePopup}
      >
        <ActionConfirmation
          title="Czy napewno chcesz usunąć wskazaną szkołę?"
          confirmationAction={handleDeleteSchoolInformation}
          rejectionAction={handleCloseSchoolDeletePopup}
        />
      </Popup>
    </div>
  );
};

SchoolInfoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  schoolId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  graduationDate: PropTypes.string,
  manage: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SchoolInfoItem);
