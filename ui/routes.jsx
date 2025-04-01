import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { Layout } from './common/components/layout';

export const routes = {
  root: '/',
  notFound: '*',
  tasks: '/tasks',
  home: '/home',
  userPage: '/user-page',
  dashboard: '/dashboard',
  createAccount: '/dashboard/create-account',
  creditoPage: '/finanzas/creditos',
  creacionPerfiles: '/creacion-perfil',
  asiganrModulos: '/asignar-modulos',
  modulocrud: '/modulo-crud',
  empleadoCRUD: '/empleado-crud',
  clienteCRUD: '/cliente-crud',
  creditoCRUD: '/credito-crud',
  facturaCRUD: '/factura-crud',
  nominaCRUD: '/nomina-crud',
  pedidoCRUD: '/pedido-crud',
  productosCRUD: '/producto-crud',
  proveedoresCRUD: '/proveedor-crud',
};

const SignInPage = React.lazy(() => import('./pages/auth/sign-in-page'));
const NotFoundPage = React.lazy(
  () => import('./pages/not-found/not-found-page')
);
const TasksPage = React.lazy(() => import('./pages/tasks/tasks-page'));
const HomePage = React.lazy(() => import('./pages/home/home-page'));
const UserPage = React.lazy(() => import('./pages/user-page/user-page'));
const DashboardPage = React.lazy(() => import('./pages/dashboard/dashboard-page'));
const CreateAccPage = React.lazy(() => import('./pages/register/register-page'));
const CreditoPage = React.lazy(() => import('./pages/modulos/modulo-finanzas/credito-page'));
const CreatePerfil = React.lazy(() => import('./pages/creacion-perfil/creacion-perfil-page'));
const AsignarModulo = React.lazy(() => import('./pages/asignar-modulo/asignar-modulo'));
const ModuloCrud = React.lazy(() => import('./common/components/modulos/modulo-crud'));
const EmpleadosCRUD = React.lazy(() => import('./pages/modulos/empleados-crud'));
const ClientesCRUD = React.lazy(() => import('./pages/modulos/clientes-crud'));
const CreditosCRUD = React.lazy(() => import('./pages/modulos/creditos-crud'));
const FacturasCRUD = React.lazy(() => import('./pages/modulos/facturas-crud'));
const NominasCRUD = React.lazy(() => import('./pages/modulos/nomina-crud'));
const PedidosCRUD = React.lazy(() => import('./pages/modulos/pedidos-crud'));
const ProductosCRUD = React.lazy(() => import('./pages/modulos/productos-crud'));
const ProveedoresCRUD = React.lazy(() => import('./pages/modulos/proveedores-crud'));


export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          element={
            <Layout loggedOnly={false}>
              <SignInPage />
            </Layout>
          }
          index
        />
        <Route
          element={
            <Layout>
              <TasksPage />
            </Layout>
          }
          path={routes.tasks}
        />
        <Route
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
          path={routes.home}
          >
        </Route>
        <Route
          element={
            <Layout>
              <UserPage />
            </Layout>
          }
          path={routes.userPage}
          >
        </Route>
        <Route
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
          path={routes.dashboard}
          >
        </Route>
        <Route
          element={
            <Layout>
              <CreateAccPage />
            </Layout>
          }
          path={routes.createAccount}
          >
        </Route>
        <Route
          element={
            <Layout loggedOnly={false}>
              <NotFoundPage />
            </Layout>
          }
          path={routes.notFound}
        />
        <Route
          element={
            <Layout>
              <CreditoPage />
            </Layout>
          }
          path={routes.creditoPage}
          >
        </Route>
        <Route
          element={
            <Layout>
              <CreatePerfil />
            </Layout>
          }
          path={routes.creacionPerfiles}
          >
        </Route>
        <Route
          element={
            <Layout>
              <AsignarModulo />
            </Layout>
          }
          path={routes.asiganrModulos}
          >
        </Route>
        <Route
          element={
            <Layout>
              <ModuloCrud />
            </Layout>
          }
          path={routes.modulocrud}
          >
        </Route>
        <Route
          element={
            <Layout>
              <EmpleadosCRUD />
            </Layout>
          }
          path={routes.empleadoCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <ClientesCRUD />
            </Layout>
          }
          path={routes.clienteCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <CreditosCRUD />
            </Layout>
          }
          path={routes.creditoCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <FacturasCRUD />
            </Layout>
          }
          path={routes.facturaCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <NominasCRUD />
            </Layout>
          }
          path={routes.nominaCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <PedidosCRUD />
            </Layout>
          }
          path={routes.pedidoCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <ProductosCRUD />
            </Layout>
          }
          path={routes.productosCRUD}
          >
        </Route>
        <Route
          element={
            <Layout>
              <ProveedoresCRUD />
            </Layout>
          }
          path={routes.proveedoresCRUD}
          >
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
