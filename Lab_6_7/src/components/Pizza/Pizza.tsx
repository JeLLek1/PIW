import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { useStyles } from './style';
import { usePizza } from './utils';

const Pizza = (pizza: IPizza) => {
  const classes = useStyles();
  const { size, handeSizeChange, handleAddToCart } = usePizza(pizza);
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
        <FormControl>
          <InputLabel id={`pizza-size-label-${pizza.id}`}>Wielkość</InputLabel>
          <Select
            labelId={`pizza-size-label-${pizza.id}`}
            id={`pizza-size-select-${pizza.id}`}
            value={size}
            onChange={handeSizeChange}
          >
            <MenuItem value={0}>Mała</MenuItem>
            <MenuItem value={1}>Średnia</MenuItem>
            <MenuItem value={2}>Duża</MenuItem>
          </Select>
        </FormControl>
        <Button
          size="small"
          color="primary"
          className={classes.addToCart}
          onClick={handleAddToCart}
        >
          Dodaj do koszyka
        </Button>
      </CardActions>
    </Card>
  );
};
export default Pizza;
