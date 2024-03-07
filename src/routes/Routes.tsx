import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import {
  HomeLayout,
  About,
  Landing,
  Contact,
  Error,
  Login,
  Register,
  Cart,
  Checkout,
  Orders,
  Products,
  SingleProduct
} from '../pages'
import {ErrorElement} from '../components'
//loaders 
import {loader as landingLoader} from '../pages/Landing'
//actions
import { ProductsX, CreateProduct, ProductItem } from '../products'
import { DataService } from '../services/DataService'
import { AuthService } from '../services/AuthService'

const authService = new AuthService()
const dataService = new DataService(authService)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader,
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
      },
      // {
      //   path: 'products',
      //   element: <Products dataService={dataService} />,
      // },
      // {
      //   path: 'products/:id',
      //   // @ts-ignore
      //   element: <ProductItem />,
      // },
      {
        path: 'create-product',
        element: <CreateProduct />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
])

