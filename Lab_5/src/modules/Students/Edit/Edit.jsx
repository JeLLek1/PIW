import useStorage from 'utils/useStorage';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import { AddForm } from 'components/Forms';
const Edit = () => {
  const history = useHistory();
  const { update, loadSingle } = useStorage('students');
  const { key, id } = useParams();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  useEffect(() => {
    loadSingle(parseInt(id))
      .then(data => {
        if (!data || data.editKey !== key) {
          history.replace(`/404`);
          console.log(data.editKey);
        }
        setInitialValues({
          name: data.name,
          description: data.description,
          email: data.email,
          tags: data.tags,
          image: data.image,
        });
      })
      .catch(e => {
        history.replace(`/404`);
      });
  }, []);

  const updateData = data => {
    setInitialValues(data);
    update({ ...data, editKey: key }, parseInt(id))
      .then(() => {
        setUpdateSuccess(true);
      })
      .catch(error => {
        console.log(error);
        setUpdateError(true);
      });
  };
  return (
    <Card>
      <CardContent>
        {initialValues && (
          <AddForm
            addAccount={updateData}
            title="Edytuj Studenta"
            label={{ name: 'Imię', image: 'Zmień zdjęcie' }}
            defaultValues={initialValues}
            submitTitle="Edytuj"
          />
        )}
        <Fade in={initialValues ? false : true} unmountOnExit>
          <CircularProgress />
        </Fade>
      </CardContent>
      <Dialog
        open={updateSuccess}
        onClose={() => setUpdateSuccess(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Student został edytowany
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Poprawnie edytowano studenta
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setUpdateSuccess(false)}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={updateError ? true : false}
        onClose={() => setUpdateError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Błąd</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {updateError}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setUpdateError(false)}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Edit;
