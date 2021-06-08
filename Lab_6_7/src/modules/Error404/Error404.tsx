import { Typography, Link, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Error404 = () => {
  return (
    <Container style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <Typography variant="h1">404</Typography>
      <Link component={RouterLink} to="/" variant="h5">
        ❮ Powrót
      </Link>
    </Container>
  );
};

export default Error404;
