import { Dashboard, PersonAdd, GroupAdd } from '@material-ui/icons';

const navLinks = [
  {
    path: '/',
    icon: Dashboard,
    title: 'Tablica',
  },
  {
    path: '/students/add',
    icon: PersonAdd,
    title: 'Dodaj studenta',
  },
  {
    path: '/groups/add',
    icon: GroupAdd,
    title: 'Dodaj grupę',
  },
];

export default navLinks;
