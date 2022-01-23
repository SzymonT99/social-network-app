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

const schoolTypes = {
  PRIMARY_SCHOOL: 'Szkoła Podstawowa',
  SECONDARY_SCHOOL: 'Szkoła Średnia',
  UNIVERSITY: 'Szkoła Wyższa',
};

const SchoolInfoItem = (props) => {
  const { classes, type, name, startDate, graduationDate } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickSchoolSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSchoolSettings = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.schoolItemContainer}>
      <Typography className={classes.schoolItemType} variant="h6">
        {schoolTypes[type]}
      </Typography>
      <div className={classes.schoolItemContent}>
        <SchoolIcon fontSize="large" color="primary" />
        <div className={classes.schoolItemDetails}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" noWrap>
            {'Uczęszczał(a) od ' +
              startDate +
              (graduationDate && ' do ' + graduationDate)}
          </Typography>
        </div>
        <div>
          <IconButton
            className={classes.schoolSettingsBtn}
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
            <MenuItem>
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
            <MenuItem>
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
      </div>
    </div>
  );
};

SchoolInfoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  graduationDate: PropTypes.string,
};

export default withStyles(styles)(SchoolInfoItem);
