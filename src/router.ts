import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/home/views/HomePage.vue';
import UserListPage from '@/user/views/UserListPage.vue';
import UserDetailsPage from '@/user/views/UserDetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserListPage,
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
