import './App.css'
import AppNavbar from './components/AppNavbar'
import { Products, CreateProduct } from './components/products'
import { type Product } from './components/products/Products'
import { AppTitle, AltOfLogo } from './shared'
import AppImage from './assets/react.svg'
import { useRef, useState } from 'react'
import { Button, Input, Form, FormHandle } from './components/utils'


function App() {
  const [products, setProducts] = useState<Product[]>([])
  const customForm = useRef<FormHandle>(null)
  
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
    console.log(`delete product ${id}`)
  
  }

  const handleSave = (data: unknown) => {
    const extractedData = data as {
      name: string,
      age: string
    }
    console.log(extractedData);
    customForm.current?.clear()
    
  }

  return (
    <>
      <AppNavbar image={{ src: AppImage, alt: AltOfLogo }}>
        {AppTitle}
      </AppNavbar>
      {/* <button onClick={handleAddProduct}>Add Product</button> */}
      <p>Testing</p>
      <Form onSave={handleSave} ref={customForm}>
        <Input id='name' label='Your name' type='text' />
        <Input id='age' label='Your age' type='number' />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
      <p>
        <Button href='www.cas.sk'>Link</Button>
      </p>
      {/* <CreateProduct onAddProduct={handleAddProduct} /> */}
      {/* <Products products={products} onDeleteProduct={handleDeleteProduct} /> */}
    </>
  )
}

export default App
