import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { useStyles } from './style';

const Pizza = (pizza: IPizza) => {
  const classes = useStyles();
  return (
    <Card className={classes.main}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pizza.image}
          title={pizza.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {pizza.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {pizza.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          Dodaj do koszyka
        </Button>
      </CardActions>
    </Card>
  );
};
export default Pizza;
