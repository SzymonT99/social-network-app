import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './post-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const Post = (props) => {
  const { classes } = props;

  return (
    <Paper
      elevation={7}
      sx={{ borderRadius: '10px' }}
      className={classes.postContainer}
    >
      <div className={classes.authorContainer}>
        <img
          src={defaultUserPhoto}
          alt="Zdjęcie użytkownika"
          className={classes.userPhoto}
        />
        <div>
          <Typography variant="subtitle1" component="div" fontWeight="bold">
            Jan Kowalski
            <span className={classes.actionName}> dodał nowy wpis</span>
          </Typography>
          <Typography variant="body2" component="div">
            1 godz. temu
          </Typography>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.postContent}>
        <Typography variant="body1" component="div">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          dictum lectus ut ligula bibendum, sit amet varius ex ornare. Duis ante
          ante, ultricies quis justo ut, fermentum mollis orci. Nunc dui lectus,
          facilisis eget placerat at, lacinia ut felis. Sed erat purus, eleifend
          at sodales viverra, finibus et lacus. Suspendisse vulputate dolor eget
          tellus pharetra, eget ornare ante gravida. Vivamus commodo leo id erat
          volutpat, a accumsan nulla semper. Donec ullamcorper volutpat ex eget
          porttitor. Ut ipsum leo, hendrerit ut gravida in, ullamcorper in
          turpis. Fusce viverra, libero venenatis luctus cursus, ipsum diam
          convallis sapien, ac eleifend enim elit nec mi. Aliquam eget suscipit
          velit. Sed nec tortor et erat dictum egestas ac id ipsum. Mauris
          varius tincidunt urna a lacinia.
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.postReactionContainer}>
        <Typography
          variant="subtitle2"
          component="div"
          className={classes.postReactionItem}
        >
          <ThumbUpAltOutlinedIcon
            sx={{ fontSize: '35px', marginRight: '6px' }}
          />
          Lubię to | 123
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          className={classes.postReactionItem}
        >
          <ChatBubbleOutlineOutlinedIcon
            sx={{ fontSize: '35px', marginRight: '6px' }}
          />
          Komentarze | 14
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          className={classes.postReactionItem}
        >
          <ShareOutlinedIcon sx={{ fontSize: '35px', marginRight: '6px' }} />
          Udostępnienia | 3
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.commentContainer}>
        <img
          src={defaultUserPhoto}
          alt="Zdjęcie użytkownika"
          className={classes.userPhotoSmall}
        />
        <TextField
          fullWidth
          id="createPostInput"
          variant="filled"
          placeholder="Napisz komentarz"
          className={classes.postClasses}
          InputProps={{
            disableUnderline: true,
            underline: {
              borderBottom: 'none',
            },
            style: {
              fontSize: 17,
              height: '80px',
              borderRadius: '20px',
              verticalAlign: 'center',
            },
          }}
        />
      </div>
    </Paper>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
