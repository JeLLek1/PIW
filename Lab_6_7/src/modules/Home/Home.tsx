import Layout from 'components/Layouts/Main';
import { Container, Grid } from '@material-ui/core';
import { useHome } from './utils';
import Pizza, { PizzaLoader } from 'components/Pizza';

const Home = () => {
  const { pizzas, isLoading } = useHome();
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {isLoading && (
            <Grid item xs={3}>
              <PizzaLoader />
            </Grid>
          )}
          {pizzas.map(pizza => (
            <Grid key={pizza.id} item xs={3}>
              <Pizza {...pizza} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};
export default Home;
