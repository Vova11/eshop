import './App.css'
import AppNavbar from './AppNavbar'
import { Products, CreateProduct } from '../src/products'
import { type Product } from './Products_BCKP'
import { AppTitle, AltOfLogo } from '../src/shared'
import AppImage from './assets/react.svg'
import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home, HomeLayout, Contact, About, Error} from '../src/pages'


const router = createBrowserRouter([
  {
    path: '/',
    element: <h2>Home Page</h2>,
    errorElement: <Error />,
  },
  {
    path: '/about',
    element: <h2>About Page</h2>,
    errorElement: <Error />,
  },
])

const App = () => {
  
  return <RouterProvider router={router} />
  
  const [products, setProducts] = useState<Product[]>([])

  function handleAddProduct(product: Product) {
    setProducts((prevProducts) => {
      const newProduct: Product = {
        ...product,
      }
      return [...prevProducts, newProduct]
    })
  }

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    )
    console.log(`deleted product ID is: ${id}`)
  }

  
  // return (
  //   <>
      
      
  //     {/* <AppNavbar image={{ src: AppImage, alt: AltOfLogo }}>
  //       {AppTitle}
  //     </AppNavbar>
  //     <CreateProduct onAddProduct={handleAddProduct} />
  //     <Products products={products} onDeleteProduct={handleDeleteProduct} /> */}
      

  //   </>
  // )
}

export default App

// import './App.css'
// import AppNavbar from './components/AppNavbar'
// import { Products, CreateProduct } from './components/products'
// import { type Product } from './components/products/Products'
// import { AppTitle, AltOfLogo } from './shared'
// import AppImage from './assets/react.svg'
// import { useState } from 'react'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Home from './components/Home'
// import About from './components/About'
// import Contact from './components/Contact'

// const rotuer = createBrowserRouter([

// ])

// function App() {
//   const [products, setProducts] = useState<Product[]>([])

//   function handleAddProduct(product: Product) {
//     setProducts((prevProducts) => {
//       const newProduct: Product = {
//         ...product,
//       }
//       return [...prevProducts, newProduct]
//     })
//   }

//   const handleDeleteProduct = (id: string) => {
//     setProducts((prevProducts) =>
//       prevProducts.filter((product) => product.id !== id)
//     )
//     console.log(`deleted product ID is: ${id}`)
//   }

//   return (
//     <>
//       <AppNavbar image={{ src: AppImage, alt: AltOfLogo }}>
//         {AppTitle}
//       </AppNavbar>
//       <CreateProduct onAddProduct={handleAddProduct} />
//       <Products products={products} onDeleteProduct={handleDeleteProduct} />
//       <div className='App'>
//         <div style={{ textAlign: 'center', marginBottom: 10 }}>
//           <div>
//             <Link to='/'>Page 1</Link>
//           </div>
//           <div>
//             <Link to='/about'>Page 2</Link>
//           </div>
//           <div>
//             <Link to='/contact'>Page 3</Link>
//           </div>
//         </div>

//     </>
//   )
// }

// export default App
