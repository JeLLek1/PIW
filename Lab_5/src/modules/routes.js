import Main from './Main';
import AddStudent from './Students/Add';
import AddGroup from './Groups/Add';
import EditStudent from './Students/Edit';
import EditGroup from './Groups/Edit';

const routes = [
  {
    path: '/',
    module: Main,
  },
  {
    path: '/students/add',
    module: AddStudent,
  },
  {
    path: '/groups/add',
    module: AddGroup,
  },
  {
    path: '/students/edit/:id/:key',
    module: EditStudent,
  },
  {
    path: '/groups/edit/:id/:key',
    module: EditGroup,
  },
];

export default routes;
