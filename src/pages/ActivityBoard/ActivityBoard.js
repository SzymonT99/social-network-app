import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './activityBoard-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Button, Divider, InputAdornment, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import FriendInvitation from '../../components/FriendInvitation/FriendInvitation';
import Post from '../../components/Post/Post';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import authorization from '../../services/authorization';

const ActivityBoard = (props) => {
  const { classes } = props;

  const [openPostCreation, setOpenPostCreation] = useState(false);
  const [data, setData] = useState({});

  const handleClosePostCreation = () => {
    setOpenPostCreation(false);
  };

  const getPost = () => {
    fetch('localhost:8080/api/posts/4', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    })
      .then((response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            setData(data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPost();
  }, [data]);

  return (
    <div className={classes.boardContainer}>
      <div className={classes.activityContent}>
        <div className={classes.activityWrapper}>
          <Paper
            elevation={7}
            sx={{ borderRadius: '10px' }}
            className={classes.postCreateBox}
          >
            <Typography variant="h6"> Utwórz post</Typography>
            <Divider className={classes.divider} />
            <div className={classes.postCreateContent}>
              <img
                src={defaultUserPhoto}
                alt="Zdjęcie użytkownika"
                className={classes.userPhoto}
              />
              <TextField
                fullWidth
                placeholder="Napisz coś tutaj..."
                multiline
                rows={2}
                className={classes.postInput}
                onClick={() => setOpenPostCreation(true)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhotoIcon className={classes.photoIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Paper>
          <Popup
            open={openPostCreation}
            type="createPost"
            title="Utwórz post"
            handleClose={handleClosePostCreation}
          >
            <PostForm closePopup={handleClosePostCreation} />
          </Popup>
          {data !== undefined && (
            <Post
              authorName="Jan Kowalski"
              createdDate={new Date()}
              images={[
                {
                  filename: 'postman4.png',
                  url: 'http://localhost:8080/api/images/6f24633f-a127-4361-be83-c8cccaa669cb',
                  type: 'image/png',
                },
              ]}
              likesNumber={1}
              sharesNumber={1}
              commentsNumber={1}
              comments={[]}
              content="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
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
          varius tincidunt urna a lacinia."
            />
          )}
        </div>
      </div>
      <div className={classes.infoContent}>
        <div className={classes.infoWrapper}>
          <Paper
            elevation={7}
            sx={{ borderRadius: '10px' }}
            style={{ padding: '15px' }}
          >
            <Typography variant="h6">Zaproszenia do znajomych</Typography>
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
          </Paper>
        </div>
      </div>
    </div>
  );
};

ActivityBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityBoard);
