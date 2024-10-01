import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/home/views/HomePage.vue';
import UserListPage from '@/user/views/UserListPage.vue';
import UserDetailsPage from '@/user/views/UserDetailsPage.vue';
import GameDetailsPage from '@/game/views/GameDetailsPage.vue';
import SignInPage from '@/auth/views/SignInPage.vue';
import { useAuthStore } from '@/auth/stores/AuthStore';

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
   //meta: { requiresAuth: true },
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsPage,
    //meta: { requiresAuth: true },
  },
  {
    path: '/games/:id',
    name: 'GameDetails',
    component: GameDetailsPage,
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === 'SignIn') {
    if (from.name) {
      authStore.setLastRoute(from.fullPath);
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'SignIn',
      query: { redirect: to.fullPath },
    });
  } else if (to.name === 'SignIn' && authStore.isAuthenticated) {
    next(from.fullPath);
  } else {
    next();
  }
});

export default router;
