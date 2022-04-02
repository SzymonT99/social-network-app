import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import defaultImgLandscape from '../../assets/default-image-landscape.png';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import {
  createGroup,
  editGroup,
  getGroups,
} from '../../redux/actions/groupActions';
import { useHistory } from 'react-router-dom';

function getStyles(interestId, groupInterests, theme) {
  return {
    fontWeight:
      groupInterests.filter(
        (groupInterest) => groupInterest.interestId === interestId
      ).length !== 0
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightRegular,
  };
}

const GroupForm = (props) => {
  const {
    classes,
    closePopup,
    updateGroups,
    edition,
    groupId,
    groupName,
    groupDescription,
    groupAccess,
    groupImage,
    groupInterests,
  } = props;

  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();

  const possibleInterests = useSelector(
    (state) => state.groups.possibleInterests
  );

  const [displayedImage, setDisplayedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageInputRef = useRef(null);

  useEffect(() => {
    if (edition && groupImage !== null) {
      convertUrlToFile(groupImage.filename, groupImage.url, groupImage.type);
      setDisplayedImage(groupImage.url);
    }
  }, []);

  const convertUrlToFile = (filename, url, type) => {
    fetch(url).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], filename, {
        type: type,
      });
      setUploadedImage(file);
    });
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Nazwa jest wymagana')
      .max(100, 'Nazwa grupy może być długa maksymalnie na 100 znaków'),
    description: yup.string().required('Opis jest wymagany'),
    access: yup.bool().required('Należy określić dostęp do grupy'),
  });

  const formik = useFormik({
    initialValues: {
      name: edition ? groupName : '',
      groupInterests: edition ? groupInterests : [],
      description: edition ? groupDescription : '',
      access: edition ? groupAccess : true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (uploadedImage !== null) {
        formData.append('image', uploadedImage);
      } else {
        formData.append('image', null);
      }

      const group = {
        name: values.name,
        description: values.description,
        isPublic: values.access,
        interests: values.groupInterests,
      };

      formData.append(
        'group',
        new Blob([JSON.stringify(group)], {
          type: 'application/json',
        })
      );

      if (!edition) {
        dispatch(createGroup(formData)).then((group) =>
          dispatch(getGroups()).then((data) => {
            updateGroups(data);
            history.push('/app/group/' + group.groupId);
          })
        );
      } else {
        dispatch(editGroup(groupId, formData));
      }

      closePopup();
    },
  });

  const selectImage = (event) => {
    setDisplayedImage(URL.createObjectURL(event.target.files[0]));
    setUploadedImage(event.target.files[0]);
  };

  const deleteGroupImage = () => {
    setDisplayedImage(null);
    setUploadedImage(null);
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
              src={displayedImage ? displayedImage : defaultImgLandscape}
              alt="Zdjęcie grupy"
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
                onClick={deleteGroupImage}
              >
                Usuń zdjęcie
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ marginBottom: '5px' }}
            fullWidth
            id="name"
            name="name"
            label="Nazwa grupy"
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
          <FormControl fullWidth sx={{ marginBottom: '26px' }}>
            <InputLabel id="group-interests-label">Tematyka grupy</InputLabel>
            <Select
              labelId="group-interests-label"
              id="groupInterests"
              name="groupInterests"
              multiple
              value={formik.values.groupInterests}
              onChange={formik.handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Tematyka grupy"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((interest) => (
                    <Chip key={interest.interestId} label={interest.name} />
                  ))}
                </Box>
              )}
            >
              {possibleInterests &&
                possibleInterests.map((interest) => (
                  <MenuItem
                    key={interest.interestId}
                    value={interest}
                    style={getStyles(
                      interest.interestId,
                      formik.values.groupInterests,
                      theme
                    )}
                  >
                    {interest.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ margin: 0 }}
            fullWidth
            id="description"
            name="description"
            label="Opis grupy"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            required
            sx={{ marginBottom: '20px' }}
          >
            <FormLabel component="legend">Dostęp do zawartości grupy</FormLabel>
            <RadioGroup
              id="access"
              name="access"
              value={formik.values.access}
              onChange={formik.handleChange}
              row
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Publiczny"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Prywatny"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.formConfirmBtn}
      >
        {edition ? 'Zapisz zmiany' : 'Utwórz grupę'}
      </Button>
    </form>
  );
};

GroupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  updateGroups: PropTypes.func,
  edition: PropTypes.bool,
  groupId: PropTypes.number,
  groupName: PropTypes.string,
  groupDescription: PropTypes.string,
  groupImage: PropTypes.object,
  groupAccess: PropTypes.bool,
  groupInterests: PropTypes.array,
};

GroupForm.defaultProps = {
  edition: false,
  groupName: '',
  groupDescription: '',
  groupAccess: false,
  groupInterests: [],
};

export default withStyles(styles)(GroupForm);
