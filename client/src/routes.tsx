import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import GuestList from './components/GuestList';
import AddGuestForm from './components/AddGuestForm';
import GuestDetail from './components/GuestDetail';

const rootRoute = createRootRoute({
  component: () => (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Guest Management System</h1>
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GuestList,
});

const guestListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guests',
  component: GuestList,
});

const addGuestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guests/new',
  component: AddGuestForm,
});

const guestDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guests/$id',
  component: GuestDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, guestListRoute, addGuestRoute, guestDetailRoute]);

const router = createRouter({ routeTree });

export default router;