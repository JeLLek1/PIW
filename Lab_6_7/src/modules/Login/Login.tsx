import Layout from 'components/Layouts/Login';
import { useLogin, validationSchema } from './utils';
import { Formik } from 'formik';
import { Typography, TextField, Button, Link } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const { isLoading, error, initialLoginData, logIn } = useLogin();
  return (
    <Layout>
      <Formik
        initialValues={initialLoginData}
        validationSchema={validationSchema}
        onSubmit={logIn}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Zaloguj się</Typography>
            {error && (
              <Alert severity="error" style={{ margin: '1rem 0' }}>
                {error}
              </Alert>
            )}
            <TextField
              label="Email"
              type="text"
              fullWidth
              onChange={handleChange}
              name="email"
              value={values.email}
              style={{ marginBottom: '1rem' }}
              error={errors.email && touched.email ? true : false}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Hasło"
              type="password"
              fullWidth
              onChange={handleChange}
              name="password"
              value={values.password}
              style={{ marginBottom: '1rem' }}
              error={errors.password && touched.password ? true : false}
              helperText={touched.password && errors.password}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ margin: '1rem 0' }}
              startIcon={isLoading && <CircularProgress size={20} />}
              type="submit"
            >
              Zaloguj się
            </Button>
            <Link component={RouterLink} to="/register">
              Zarejestruj się
            </Link>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
