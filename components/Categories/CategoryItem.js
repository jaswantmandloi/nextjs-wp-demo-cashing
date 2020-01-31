import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
//import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({  
  inline: {
    display: "inline"
  }
}));

export default ({ category = {} }) => {
  const classes = useStyles();
  return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={category.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={category.name}
          secondary={
            <React.Fragment>
              {/* <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography> */}
              {category.description}
            </React.Fragment>
          }
        />
      </ListItem>      

  );
};
