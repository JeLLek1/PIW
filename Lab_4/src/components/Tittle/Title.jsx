import { Typography } from '@material-ui/core';
import { useStyles } from './style';

const Title = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Typography {...props} className={classes.title}>
      {children}
    </Typography>
  );
};

export default Title;
