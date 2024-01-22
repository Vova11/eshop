import './App.css'
import AppNavbar from './components/AppNavbar'
import { Products, CreateProduct } from './components/products'
import { type Product } from './components/products/Products'
import { AppTitle, AltOfLogo } from './shared'
import AppImage from './assets/react.svg'
import { useState } from 'react'

function App() {
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

  return (
    <>
      <AppNavbar image={{ src: AppImage, alt: AltOfLogo }}>
        {AppTitle}
      </AppNavbar>
      <CreateProduct onAddProduct={handleAddProduct} />
      <Products products={products} onDeleteProduct={handleDeleteProduct} />
    </>
  )
}

export default App
