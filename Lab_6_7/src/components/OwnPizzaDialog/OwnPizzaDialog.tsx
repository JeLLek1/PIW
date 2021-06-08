import { useOwnPizza } from './utils';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from './styles';
const OwnPizzaDialog = ({
  size,
  handleClose,
}: {
  size: number;
  handleClose: () => void;
}) => {
  const classes = useStyles();
  const {
    ingredients,
    isLoading,
    currentIngredients,
    currentPirce,
    handleIngredientsChange,
    handleAdd,
  } = useOwnPizza(size);
  if (isLoading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <DialogTitle>Skomponuj własną pizzę</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>
          Wybierz składniki które ci odpowiadają. Jeżeli nie wybierzesz
          dostaniesz pusty pieczony placek :c
        </DialogContentText>
        <Autocomplete
          multiple
          options={ingredients}
          getOptionLabel={option => option.name}
          value={currentIngredients}
          onChange={(_, newValue) => {
            handleIngredientsChange(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Wybierz składniki"
              margin="normal"
              fullWidth
            />
          )}
        />
        <Typography style={{ margin: '1rem 0' }}>
          Cena pizzy: {currentPirce.toFixed(2)}zł
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} autoFocus>
          Anuluj
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => {
            handleAdd();
            handleClose();
          }}
        >
          Dodaj
        </Button>
      </DialogActions>
    </>
  );
};
export default OwnPizzaDialog;
