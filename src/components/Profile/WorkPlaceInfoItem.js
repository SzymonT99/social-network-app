import React, { useState } from 'react';
import styles from './profile-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import WorkIcon from '@mui/icons-material/Work';
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
import ActionConfirmation from '../ActionConfirmation/ActionConfirmation';
import { useDispatch } from 'react-redux';
import { deleteWorkPlaceInformation } from '../../redux/actions/userProfileActions';
import AddWorkPlaceForm from '../Forms/AddWorkPlaceForm';

const WorkPlaceInfoItem = (props) => {
  const { classes, workId, company, position, startDate, endDate, manage } =
    props;

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditionWorkPopup, setOpenEditionWorkPopup] = useState(false);
  const [openDeleteWorkPopup, setOpenDeleteWorkPopup] = useState(false);

  const handleClickWorkSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseWorkSettings = () => {
    setAnchorEl(null);
  };

  const handleCloseEditionWorkPopup = () => {
    setOpenEditionWorkPopup(false);
  };

  const handleOpenEditionWorkPopupClick = () => {
    setOpenEditionWorkPopup(true);
    handleCloseWorkSettings();
  };

  const handleCloseWorkDeletePopup = () => {
    setOpenDeleteWorkPopup(false);
  };

  const handleDeleteWorkInformation = () => {
    dispatch(deleteWorkPlaceInformation(workId));
    handleCloseWorkSettings();
  };

  const handleDeleteWorkClick = () => {
    setOpenDeleteWorkPopup(true);
    handleCloseWorkSettings();
  };

  return (
    <div className={classes.profileInfoItemContainer}>
      <div className={classes.profileInfoItemContent}>
        <WorkIcon fontSize="large" color="primary" />
        <div className={classes.profileInfoItemDetails}>
          <Typography variant="subtitle1" noWrap>
            {'Nazwa firmy: ' + company}
          </Typography>
          <Typography variant="body1" noWrap>
            {'Pozycja: ' + position}
          </Typography>
          <Typography variant="body2" noWrap>
            {'Pracował(a) od ' + startDate}
            <span>{endDate !== null && ' do ' + endDate}</span>
          </Typography>
        </div>
        {manage && (
          <div>
            <IconButton
              className={classes.profileInfoItemSettingsBtn}
              onClick={handleClickWorkSettings}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseWorkSettings}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleOpenEditionWorkPopupClick}>
                <ListItemIcon>
                  <EditIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">Edytuj pracę</Typography>
                  }
                />
              </MenuItem>
              <MenuItem onClick={handleDeleteWorkClick}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">Usuń pracę</Typography>
                  }
                />
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <Popup
        open={openEditionWorkPopup}
        type="profileInfo"
        title="Edytuj dodane miejsce pracy"
        onClose={handleCloseEditionWorkPopup}
      >
        <AddWorkPlaceForm
          edition
          workId={workId}
          editedCompany={company}
          editedPosition={position}
          editedStartDate={startDate}
          editedEndDate={endDate}
          closePopup={handleCloseEditionWorkPopup}
        />
      </Popup>
      <Popup
        open={openDeleteWorkPopup}
        type="confirmation"
        title="Usuwanie informacji o pracy"
        onClose={handleCloseWorkDeletePopup}
      >
        <ActionConfirmation
          title="Czy napewno chcesz usunąć wskazaną pracę?"
          confirmationAction={handleDeleteWorkInformation}
          rejectionAction={handleCloseWorkDeletePopup}
        />
      </Popup>
    </div>
  );
};

WorkPlaceInfoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  workId: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  manage: PropTypes.bool,
};

export default withStyles(styles)(WorkPlaceInfoItem);
