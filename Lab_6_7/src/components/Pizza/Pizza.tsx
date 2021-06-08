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
  Dialog,
} from '@material-ui/core';
import OwnPizzaDialog from 'components/OwnPizzaDialog';
import { useStyles } from './style';
import { usePizza } from './utils';

const Pizza = ({ pizza, isOwn }: { pizza: IPizza; isOwn: boolean }) => {
  const classes = useStyles();
  const {
    size,
    isDialogOpen,
    handeSizeChange,
    handleAddToCart,
    handleDialogOpen,
    handleDialogClose,
  } = usePizza(pizza);
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
        {isOwn ? (
          <Button
            size="small"
            color="primary"
            className={classes.addToCart}
            onClick={handleDialogOpen}
          >
            Skomponuj
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            className={classes.addToCart}
            onClick={handleAddToCart}
          >
            Dodaj do koszyka
          </Button>
        )}
        <Dialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <OwnPizzaDialog size={size} handleClose={handleDialogClose} />
        </Dialog>
      </CardActions>
    </Card>
  );
};
export default Pizza;
