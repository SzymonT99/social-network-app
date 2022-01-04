import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '50px',
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
  },
  text: {
    color: 'white',
  },
}));

const Copyright = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="subtitle1" className={classes.text}>
        © 2022 Szymon Tyrka - Wszelkie prawa zastrzeżone
      </Typography>
    </div>
  );
};

export default Copyright;
