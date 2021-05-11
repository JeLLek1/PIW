import React, { useState } from 'react';
import { useTab } from './utils';
import {
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import { FilterForm } from 'components/Forms';
import Account from 'components/Account';
import Title from 'components/Tittle';
import Counter from 'components/Counter';
import { useStyles } from './style';

const Main = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabStudents = useTab('students');
  const tabGroups = useTab('groups');
  const classes = useStyles();

  const tabs = [
    {
      name: 'Studenci',
      props: tabStudents,
      nameLabel: 'Imię',
    },
    {
      name: 'Grupy',
      props: tabGroups,
      nameLabel: 'Nazwa',
    },
  ];

  return (
    <div className={classes.tabs}>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)}>
          {tabs.map(tab => (
            <Tab label={tab.name} key={tab.name} />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.name}>
          {currentTab === index && (
            <Box p={3}>
              <Grid container spacing={5} alignItems="flex-end">
                <Grid item sm={9} xs={12}>
                  <FilterForm
                    options={tab.props.filterOptions}
                    changeOptions={tab.props.changeFilterOptions}
                    label={{ name: 'Imię' }}
                  />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Counter count={Object.keys(tab.props.dataFiltered).length} />
                </Grid>
              </Grid>
              <Grid container className={classes.containerSpaced}>
                <Grid item xs={12}>
                  <Title variant="h3" component="h2">
                    Studenci
                  </Title>
                  {Object.keys(tab.props.dataFiltered).map(key => (
                    <Account
                      key={key}
                      {...tab.props.dataFiltered[key]}
                    ></Account>
                  ))}
                  <Fade in={tab.props.isLoading} unmountOnExit>
                    <CircularProgress />
                  </Fade>
                  {Object.keys(tab.props.dataFiltered).length === 0 &&
                    !tab.props.isLoading && (
                      <Typography>Nie znaleziono wyników</Typography>
                    )}
                </Grid>
              </Grid>
            </Box>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Main;
