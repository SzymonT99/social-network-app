import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from '@mui/material';
import { changeProfileNav } from '../../redux/actions/userProfileActions';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@mui/styles';
import styles from './profile-jss';
import { useDispatch } from 'react-redux';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';

const UserImagesBox = (props) => {
  const { classes, userImages } = props;

  const dispatch = useDispatch();

  return (
    <Paper elevation={4} sx={{ borderRadius: '10px' }}>
      <div className={classes.profileInfoBoxHeading}>
        <Typography variant="h6">Dodane zdjęcia</Typography>
        <Link
          component="button"
          variant="subtitle1"
          onClick={() => {
            dispatch(changeProfileNav(2));
          }}
        >
          Zobacz więcej
        </Link>
      </div>
      <div className={classes.profileInfoBoxContent}>
        <ImageList
          cols={3}
          rowHeight={120}
          sx={{ margin: 0 }}
          gap={6}
          variant="quilted"
        >
          {userImages.map((item, index) => {
            if (index < 9) {
              return (
                <ImageListItem key={item.url}>
                  <img src={item.url} alt={item.filename} loading="lazy" />
                </ImageListItem>
              );
            }
          })}
        </ImageList>
      </div>
    </Paper>
  );
};

UserImagesBox.propTypes = {
  classes: PropTypes.object.isRequired,
  userImages: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserImagesBox);
