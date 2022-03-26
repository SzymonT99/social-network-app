import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import defaultEventImgLandscape from '../../assets/default-event-photo-landscape.png';
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { createChat, editChat } from '../../redux/actions/chatAction';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import SentInvitation from '../SentInvitation/SentInvitation';
import Avatar from '@mui/material/Avatar';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { useHistory } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ChatForm = (props) => {
  const { classes, closePopup, edition, chatId, editedName, editedImage } =
    props;

  const dispatch = useDispatch();
  const history = useHistory();

  const loggedUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.activity.users);

  const [searchedUserName, setSearchedUserName] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageInputRef = useRef(null);

  const convertUrlToFile = (filename, url, type) => {
    fetch(url).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], filename, {
        type: type,
      });
      setUploadedImage(file);
    });
  };

  useEffect(() => {
    if (edition && editedImage !== null) {
      convertUrlToFile(editedImage.filename, editedImage.url, editedImage.type);
      setDisplayedImage(editedImage.url);
    }
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Nazwa jest wymagana')
      .max(30, 'Nazwa powinna mieć długość maksymalnie 30 znaków'),
  });

  const formik = useFormik({
    initialValues: {
      name: !edition ? '' : editedName,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (uploadedImage !== null) {
        formData.append('image', uploadedImage);
      } else {
        formData.append('image', null);
      }

      const chat = {
        name: values.name,
        isPrivate: false,
        addedUsersId: addedUsers.map((addedUser) => addedUser.userId),
      };

      formData.append(
        'chat',
        new Blob([JSON.stringify(chat)], {
          type: 'application/json',
        })
      );

      if (!edition) {
        dispatch(createChat(formData));
      } else {
        dispatch(editChat(chatId, formData));
      }

      closePopup();
    },
  });

  const selectImage = (event) => {
    setDisplayedImage(URL.createObjectURL(event.target.files[0]));
    setUploadedImage(event.target.files[0]);
  };

  const deleteEventImage = () => {
    setDisplayedImage(null);
    setUploadedImage(null);
  };

  const handleChangeSearchedUserName = (event) => {
    const typedText = event.target.value;
    setSearchedUserName(typedText);

    if (typedText !== '') {
      setSearchedUsers(
        users.filter((user) => {
          let userName = user.firstName + ' ' + user.lastName;
          return (
            userName.toUpperCase().includes(typedText.toUpperCase()) &&
            addedUsers.filter((userMember) => userMember.userId === user.userId)
              .length === 0 &&
            user.userId !== loggedUser.userId
          );
        })
      );
    } else {
      setSearchedUsers([]);
    }
  };

  const handleClickAddChatMember = (addedUser) => {
    setAddedUsers((prevState) => [...prevState, addedUser]);
    setSearchedUsers((prevState) =>
      prevState.filter((user) => user.userId !== addedUser.userId)
    );
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Grid container columnSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          <div className={classes.formImageContainer}>
            <img
              src={displayedImage ? displayedImage : defaultEventImgLandscape}
              alt="Zdjęcie czatu"
              className={classes.formImage}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.formImageUploadBtn}
              onClick={() => imageInputRef.current.click()}
            >
              Ustaw zdjęcie
            </Button>
            <input
              style={{ display: 'none' }}
              type="file"
              id="input-file"
              ref={imageInputRef}
              accept="image/*"
              onChange={selectImage}
            />
            {displayedImage && (
              <Button
                variant="contained"
                color="secondary"
                className={classes.formImageDeleteBtn}
                onClick={deleteEventImage}
              >
                Usuń zdjęcie
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nazwa czatu"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.addChatMembersContainer}>
            <div className={classes.membersSearchContainer}>
              <Typography variant="h6" marginBottom="10px">
                Dodaj członków czatu
              </Typography>
              <TextField
                id="user-searchbar"
                fullWidth
                placeholder="Szukaj osób"
                value={searchedUserName}
                onChange={handleChangeSearchedUserName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {searchedUsers.map((searchedUser) => (
                <div
                  className={classes.invitationContainer}
                  key={searchedUser.userId}
                >
                  <Avatar
                    src={
                      searchedUser.profilePhoto
                        ? searchedUser.profilePhoto.url
                        : defaultUserPhoto
                    }
                    alt={searchedUser.firstName + ' ' + searchedUser.lastName}
                    onClick={() =>
                      history.push('/app/profile/' + searchedUser.userId)
                    }
                    className={classes.chatMemberPhoto}
                  />
                  <Typography
                    variant="subtitle1"
                    noWrap
                    className={classes.searchedUserName}
                    onClick={() =>
                      history.push('/app/profile/' + searchedUser.userId)
                    }
                  >
                    {searchedUser.firstName + ' ' + searchedUser.lastName}
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.addChatMemberBtn}
                    onClick={() => handleClickAddChatMember(searchedUser)}
                  >
                    Dodaj
                  </Button>
                </div>
              ))}
            </div>
            <div className={classes.addedMemberContainer}>
              <Typography variant="h6" marginBottom="10px">
                Dodani użytkownicy
              </Typography>
              {addedUsers.map((addedUser) => (
                <Typography
                  variant="subtitle2"
                  className={classes.addedChatMember}
                  onClick={() =>
                    history.push('/app/profile/' + addedUser.userId)
                  }
                >
                  <FiberManualRecordIcon fontSize="10px" />
                  {addedUser.firstName + ' ' + addedUser.lastName}
                </Typography>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.formConfirmBtn}
      >
        {!edition ? 'Utwórz czat' : 'Zapisz zmiany'}
      </Button>
    </form>
  );
};

ChatForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  edition: PropTypes.bool,
  chatId: PropTypes.number,
  editedName: PropTypes.string,
  editedImage: PropTypes.object,
};

ChatForm.defaultProps = {
  edition: false,
};

export default withStyles(styles)(ChatForm);
