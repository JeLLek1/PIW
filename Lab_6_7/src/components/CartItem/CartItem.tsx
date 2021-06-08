import { Typography, IconButton } from '@material-ui/core';
import { useStyles } from './style';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCartItem } from './utils';
const CartItem = ({ itemData }: { itemData: IPizzaSingleState }) => {
  const classes = useStyles();
  const { handleItemDelete } = useCartItem();
  return (
    <div className={classes.item}>
      <Typography variant="h6">{itemData.name}</Typography>
      <Typography>
        {itemData.size === 0
          ? 'Mała'
          : itemData.size === 1
          ? 'Średnia'
          : 'Duża'}{' '}
        {itemData.price.toFixed(2)}zł
      </Typography>
      <IconButton
        aria-label="delete"
        className={classes.deleteButton}
        onClick={() => handleItemDelete(itemData.key)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
export default CartItem;
