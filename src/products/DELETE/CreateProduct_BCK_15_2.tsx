import { FC, useRef, useState } from "react"
import { Button, Form, Input } from "../../utils"
import { FormHandle } from '../../utils/Form'


export type Product = {
  id: string
  name: string
  description: string
  quantity: number
}


const CreateProduct: FC = () => {
  const customForm = useRef<FormHandle>(null)
  const [products, setProducts] = useState<Product[]>([])

  function handleAddProduct(product: Product) {
    setProducts((prevProducts) => {
      const newProduct: Product = {
        ...product,
      }
      return [...prevProducts, newProduct]
    })
  }

  console.log(products);
  

  const handleSave = (data: unknown) => {
    const extractedData = data as {
      id: string
      name: string
      description: string
      quantity: number
    }
    handleAddProduct(extractedData)
  }

  return (
    <Form onSave={handleSave} ref={customForm}>
      <Input id='title' label='Product title' type='text' name='title' />
      <Input
        id='description'
        label='Product description'
        type='text'
        name='description'
      />
      <Input
        id='quantity'
        label='Product quantity'
        type='number'
        name='quantity'
      />
      <p>
        <Button>Create Product</Button>
      </p>
    </Form>
  )
}
export default CreateProduct


