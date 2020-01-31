import Button from '@material-ui/core/Button';
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 300
  }
});



export default () => {
  const classes = useStyles();  
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Skeleton variant="rect" width={210} height={118} />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );
}
