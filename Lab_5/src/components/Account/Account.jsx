import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import { DoubleArrow, Send } from '@material-ui/icons';
import { useStyles } from './style';
import { messageTitle } from 'config/data/app';

const Account = ({ name, description, tags, image, email }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    window.location.href = `mailto:${encodeURIComponent(
      email,
    )}?subject=${encodeURIComponent(messageTitle)}&body=${encodeURIComponent(
      message,
    )}`;
    setMessage('');
  };
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar alt={name} src={image} className={classes.avatar} />
        <Typography variant="h6">
          <DoubleArrow className={classes.arrow} />
          {name}
        </Typography>
        {description.split('\n').map((text, i) => (
          <React.Fragment key={i}>
            {/** Wartość nie będzie później zmieniana
             *   dlatego użyty jest indeks tablicy
             */}
            <Typography paragraph>{text}</Typography>
          </React.Fragment>
        ))}
      </CardContent>
      <CardActions className={classes.actions}>
        <Box className={classes.box}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSend}
            endIcon={<Send />}
            onClick={handleOpen}
          >
            Wyślij wiadomość
          </Button>
          {tags.map(tag => (
            <Button
              key={tag.key}
              variant="outlined"
              size="small"
              color="secondary"
              className={classes.button}
            >
              {tag.title}
            </Button>
          ))}
        </Box>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle i>Wyślij wiadomość</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Wyślij wiadomość email do <b>{name}</b>.
            </Typography>
            <Typography>
              Uzupełnij treść i wciśnij przycisk "Wyślij". Następnie zostaniesz
              przkierowany do klienta twojej poczty, gdzie będziesz mógł
              dokończyć wprowadzanie wiadomości.
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Wiadomość"
            fullWidth
            value={message}
            onChange={ev => {
              setMessage(ev.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button
            onClick={handleSend}
            disabled={message === '' ? true : undefined}
            color="primary"
          >
            Wyślij
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Account;
