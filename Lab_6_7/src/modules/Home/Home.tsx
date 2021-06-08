import Layout from 'components/Layouts/Main';
import { Container, Grid } from '@material-ui/core';
import { useHome } from './utils';
import Pizza from 'components/Pizza';

const Home = () => {
  const { pizzas } = useHome();
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
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
