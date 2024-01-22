import { type FC } from 'react'
import { useRef, type FormEvent } from 'react'
import { type Product } from './Products'
type createProductProps = {
  onAddProduct: (product: Product) => void
}

export const CreateProduct: FC<createProductProps> = ({ onAddProduct }) => {
  const formRefs = {
    title: useRef<HTMLInputElement>(null),
    description: useRef<HTMLInputElement>(null),
    quantity: useRef<HTMLInputElement>(null),
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const product = {
      id: Math.floor(Math.random() * 100) + 1,
      title: formRefs.title.current!.value,
      description: formRefs.description.current!.value,
      quantity: parseInt(formRefs.quantity.current!.value, 10),
    }

    event.currentTarget.reset()
    // Call onAddProduct with the product object
    onAddProduct(product)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor='product'>Product title</label>
        <input type='text' id='product' ref={formRefs.title} />
      </p>
      <p>
        <label htmlFor='product'>Product description</label>
        <input
          type='text'
          name=''
          id='description'
          ref={formRefs.description}
        />
      </p>
      <p>
        <label htmlFor='product'>Product quantity</label>
        <input type='number' id='quantity' ref={formRefs.quantity} />
      </p>
      <p>
        <button type='submit'>Add product</button>
      </p>
    </form>
  )
}

export default CreateProduct
