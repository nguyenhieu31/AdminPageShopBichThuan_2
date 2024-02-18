import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const EditOrderPage = lazy(() => import('src/sections/order/edit-order'))
export const EditProductPage = lazy(() => import('src/sections/products/edit-product'))
// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                { element: <IndexPage />, index: true },
                { path: 'user', element: <UserPage /> },
                { path: 'products', element: <ProductsPage /> },
                { path: 'blog', element: <BlogPage /> },
                { path: 'order', element: <OrderPage /> },
                { path: 'edit-order/:id', element: <EditOrderPage /> },
                { path: 'edit-product/:id', element: <EditProductPage /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
          path: 'logout',
          element: <LoginPage />,
        },
        {
            path: '404',
            element: <Page404 />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
