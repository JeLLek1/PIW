import Layout from 'components/Layouts/Login';
import { useRegister, validationSchema } from './utils';
import { Formik } from 'formik';
import { Typography, TextField, Button, Link } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const { isLoading, error, initialRegisterData, register } = useRegister();
  return (
    <Layout>
      <Formik
        initialValues={initialRegisterData}
        validationSchema={validationSchema}
        onSubmit={register}
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
            <TextField
              label="Hasło"
              type="password"
              fullWidth
              onChange={handleChange}
              name="passwordConfirm"
              value={values.passwordConfirm}
              style={{ marginBottom: '1rem' }}
              error={
                errors.passwordConfirm && touched.passwordConfirm ? true : false
              }
              helperText={touched.passwordConfirm && errors.passwordConfirm}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ margin: '1rem 0' }}
              startIcon={isLoading && <CircularProgress size={20} />}
              type="submit"
            >
              Zarejestruj się
            </Button>
            <Link component={RouterLink} to="/login">
              Zaloguj się
            </Link>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
