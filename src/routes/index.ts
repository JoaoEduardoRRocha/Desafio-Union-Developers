import Profile from "../pages/Profile";
import Home from "../pages/Home";

const coreRoutes = [  
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '/profile/',
    title: 'Profile',
    component: Profile,
  }
];

const routes = [...coreRoutes];
export default routes;