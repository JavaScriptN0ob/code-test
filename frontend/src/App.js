import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CategoryPage, HomePage, PostSalePage, ProductPage, SearchPage } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/category',
    element: <CategoryPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/product',
    element: <ProductPage />,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
  {
    path: '/post-sale',
    element: <PostSalePage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
