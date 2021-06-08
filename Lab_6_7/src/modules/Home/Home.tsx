import Layout from 'components/Layouts/Main';
import { Container, Grid } from '@material-ui/core';
import { useHome } from './utils';
import Pizza, { PizzaLoader } from 'components/Pizza';
import ownPizzaImg from 'assets/img/own_pizza.jpg';

const Home = () => {
  const { pizzas, isLoading } = useHome();
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Pizza
              pizza={{
                id: '',
                name: 'Skomponuj pizzę',
                description:
                  'Wybierz z pośród wielu składników taką pizzę, jaka ci tylko odpowiada',
                image: ownPizzaImg,
                price: [0, 0, 0],
              }}
              isOwn={true}
            />
          </Grid>
          {isLoading && (
            <Grid item xs={3}>
              <PizzaLoader />
            </Grid>
          )}
          {pizzas.map(pizza => (
            <Grid key={pizza.id} item xs={3}>
              <Pizza pizza={pizza} isOwn={false} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};
export default Home;
