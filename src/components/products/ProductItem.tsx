import { type FC } from 'react'
import { Product } from './Products'

type ProductItemProps = {
  product: Product
  onDelete: (id: string) => void
}

const ProductItem: FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <article>
      <div>
        <h2>{product.title}</h2>
        <p>{product.id}</p>
        <p>{product.description}</p>
        <p>{product.quantity}</p>
      </div>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </article>
  )
}

export default ProductItem
