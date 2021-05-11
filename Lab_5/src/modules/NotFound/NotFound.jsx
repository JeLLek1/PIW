import { Card, CardContent, Typography } from '@material-ui/core';
import { useStyles } from './style';

const NotFound = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4">404</Typography>
        <Typography variant="h6">
          Nie udało się nam odnaleźć tej strony :c
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotFound;
