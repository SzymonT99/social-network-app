import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '50px',
    position: 'relative',
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    color: 'white',
  },
}));

const Copyright = () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <Typography variant="subtitle1" className={classes.content}>
        © 2022 Szymon Tyrka - Wszelkie prawa zastrzeżone
      </Typography>
    </footer>
  );
};

export default Copyright;
