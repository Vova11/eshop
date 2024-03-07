import { type FC, useRef } from 'react'
import { type Product } from '../../../DELETE/Products_BCKP'
import { Button, Input, Form } from '../../utils'
import { FormHandle } from '../../utils/Form'


export type createProductProps = {
  onAddProduct: (product: Product) => void
}

export const CreateProduct: FC<createProductProps> = ({ onAddProduct }) => {
  const customForm = useRef<FormHandle>(null)

  const handleSave = (data: unknown) => {
    const extractedData = data as {
      id: string
      name: string
      description: string
      quantity: number
    }

    const product: Product = {
      id: String(Math.floor(Math.random() * 100) + 1), // Convert the number to a string
      name: extractedData.name,
      description: extractedData.description,
      quantity: extractedData.quantity,
    }

    customForm.current?.clear()
    // Call onAddProduct with the product object
    onAddProduct(product)
  }

  return (
    <Form onSave={handleSave} ref={customForm}>
      <Input id='title' label='Product title' type='text' name='title' />
      <Input id='description' label='Product description' type='text' name='description' />
      <Input id='quantity' label='Product quantity' type='number' name='quantity' />
      <p>
        <Button>Create Product</Button>
      </p>
    </Form>
  )
}

export default CreateProduct
