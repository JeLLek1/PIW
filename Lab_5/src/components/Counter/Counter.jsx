import { Card, CardContent, Typography } from '@material-ui/core';
import { useStyles } from './style';

const Counter = ({ count, singularText, pluralText }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.cardContent}>
        {count === 1 ? (
          <Typography className={classes.typography}>
            Znalazłem <b>{count}</b> kandydata
          </Typography>
        ) : (
          <Typography className={classes.typography}>
            Znalazłem <b>{count}</b> kandydatów
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Counter;
