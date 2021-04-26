import { useMain } from './utils';
import { Container, Grid, Typography } from '@material-ui/core';
import { AddForm, FilterForm } from 'components/Forms';
import Account from 'components/Account';
import Title from 'components/Tittle';
import Counter from 'components/Counter';
import { useStyles } from './style';

const Main = () => {
  const {
    accountsFiltered,
    addAccount,
    filterOptions,
    changeFilterOptions,
  } = useMain();
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5} className={classes.containerSpaced}>
        <Grid item md={9} xs={12}>
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item sm={9} xs={12}>
              <FilterForm
                options={filterOptions}
                changeOptions={changeFilterOptions}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <Counter count={Object.keys(accountsFiltered).length} />
            </Grid>
          </Grid>
          <Grid container className={classes.containerSpaced}>
            <Grid item xs={12}>
              <Title variant="h3" component="h2">
                Studenci
              </Title>
              {Object.keys(accountsFiltered).map(key => (
                <Account key={key} {...accountsFiltered[key]}></Account>
              ))}
              {Object.keys(accountsFiltered).length === 0 && (
                <Typography>Nie znaleziono wyników</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <AddForm addAccount={addAccount} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
