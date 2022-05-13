import styles from './chatInput-jss';
import React, { useRef, useState } from 'react';
import {
  Badge,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { PropTypes } from 'prop-types';
import SendIcon from '@mui/icons-material/Send';
import Popup from '../Popup/Popup';
import Picker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

const ChatInput = (props) => {
  const { classes, sendTypingMessage, sendMessage } = props;

  const [text, setText] = useState('');
  const [openEmojiPickerPopup, setOpenEmojiPickerPopup] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [openImagesPopup, setOpenImagesPopup] = useState(false);

  const imagesInputRef = useRef(null);

  const handleChangeMessageText = (event) => {
    const currentText = event.target.value;
    setText(currentText);
    sendTypingMessage(currentText);
  };

  const onEmojiClick = (event, emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const selectImages = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setDisplayedImages(images);
    setUploadedImages(event.target.files);
  };

  const deleteImage = (deletedImg) => {
    if (displayedImages.length > 1) {
      let index = displayedImages.indexOf(deletedImg);
      setDisplayedImages((prevState) =>
        prevState.filter((image) => image !== deletedImg)
      );
      const fileListArray = Array.from(uploadedImages);
      fileListArray.splice(index, 1);
      setUploadedImages(fileListArray);
      setUploadedImages((prevState) =>
        prevState.filter((image) => image !== deletedImg)
      );
    } else {
      setDisplayedImages([]);
      setUploadedImages([]);
    }
  };

  const handleCloseImagesPopup = () => {
    setOpenImagesPopup(false);
  };

  const handleClickSendMessage = () => {
    sendMessage(text, uploadedImages);
    setUploadedImages([]);
    setDisplayedImages([]);
    setText('');
  };

  return (
    <div>
      <div className={classes.messageCreationContainer}>
        <Popup
          open={openEmojiPickerPopup}
          type="emojiPicker"
          title="Wybierz emotikon"
          onClose={() => setOpenEmojiPickerPopup(false)}
        >
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            groupNames={{ smileys_people: 'PEOPLE' }}
            pickerStyle={{ width: '100%', height: '400px' }}
          />
        </Popup>
        <IconButton onClick={() => setOpenEmojiPickerPopup(true)}>
          <SentimentSatisfiedAltIcon
            fontSize="medium"
            color="primary"
            data-testid="emoji-picker"
          />
        </IconButton>
        <IconButton onClick={() => imagesInputRef.current.click()}>
          <ImageIcon fontSize="medium" color="primary" />
        </IconButton>
        <input
          style={{ display: 'none' }}
          type="file"
          id="multi"
          ref={imagesInputRef}
          multiple
          accept="image/*"
          onChange={selectImages}
        />
        <TextField
          fullWidth
          placeholder="Napisz widomość"
          variant="outlined"
          onChange={(e) => handleChangeMessageText(e)}
          value={text}
          className={classes.messageInput}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClickSendMessage();
              e.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton edge="end" onClick={() => setOpenImagesPopup(true)}>
                <Badge
                  className={classes.messageImageBade}
                  overlap="circular"
                  badgeContent={uploadedImages.length}
                >
                  <PhotoLibraryIcon fontSize="large" />
                </Badge>
              </IconButton>
            ),
          }}
        />
        <Popup
          open={openImagesPopup}
          type="images"
          title="Zdjęcia"
          onClose={handleCloseImagesPopup}
        >
          {displayedImages.length > 0 ? (
            <ImageList
              cols={{ xl: 3, md: 2, sm: 1 }}
              rowHeight={220}
              className={classes.messageImageList}
              gap={5}
              variant="quilted"
            >
              {displayedImages.map((img, index) => (
                <ImageListItem key={index} className={classes.uploadImageItem}>
                  <img
                    key={index}
                    src={img}
                    srcSet={img}
                    alt="Dodane zdjęcie"
                    loading="lazy"
                  />
                  <Button
                    className={classes.uploadImageDeleteBtn}
                    onClick={() => deleteImage(img)}
                  >
                    <CloseIcon />
                  </Button>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography variant="subtitle2" marginTop="5px">
              Nie dodano zdjęć
            </Typography>
          )}
        </Popup>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickSendMessage}
          className={classes.sendMessageBtn}
        >
          Wyślij
          <SendIcon fontSize="medium" />
        </Button>
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  classes: PropTypes.object.isRequired,
  sendTypingMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChatInput);
