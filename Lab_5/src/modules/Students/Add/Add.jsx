import { useState } from 'react';
import {
  Card,
  CardContent,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddForm } from 'components/Forms';
import useStorage from 'utils/useStorage';
import randomHash from 'utils/randomHash';
import { Link } from 'react-router-dom';

const Add = () => {
  const { add } = useStorage('students');
  const [editKey, setEditKey] = useState(false);
  const [error, setError] = useState(false);

  const addGroup = data => {
    const editKey = randomHash();
    add({ ...data, editKey })
      .then(id => {
        setEditKey(`/students/edit/${id}/${editKey}`);
      })
      .catch(err => {
        setError(err);
      });
  };
  return (
    <Card>
      <CardContent>
        <AddForm
          addAccount={addGroup}
          title="Dodaj Studenta"
          label={{ name: 'Imię', image: 'Dodaj zdjęcie' }}
          submitTitle="Dodaj"
        />
      </CardContent>
      <Dialog
        open={editKey ? true : false}
        onClose={() => setEditKey(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Student został dodany</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              Dodano nowego studenta. Pamiętaj aby zachować klucz do jej edycji,
              bo zostanie wyświetlony tylko raz:
            </Typography>
            <TextField
              disabled
              style={{ marginTop: '1rem' }}
              label="Link do edycji"
              defaultValue={`${window.location.host}${process.env.PUBLIC_URL}${editKey}`}
              fullWidth
            />
            <Button color="inherit" component={Link} to={{ pathname: editKey }}>
              Otwórz link edycji (gh pages nie łapie linków z paska)
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditKey(false)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={error ? true : false}
        onClose={() => setError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Błąd</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ${error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Add;
