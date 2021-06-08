import { Card, CardActionArea, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from '../style';

const Pizza = () => {
  const classes = useStyles();
  return (
    <Card className={classes.main}>
      <CardActionArea>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
          <Skeleton
            animation="wave"
            height={40}
            style={{ marginBottom: 12 }}
            width="40%"
          />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default Pizza;
