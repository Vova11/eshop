import { ProductItem } from '../src/products'

export type Product = {
  id: string
  name: string
  description: string
  quantity: number
}

type ProductsProps = {
  products: Product[]
  onDeleteProduct: (id: string) => void
}

const Products: React.FC<ProductsProps> = ({ products, onDeleteProduct }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} onDelete={onDeleteProduct} />
        </li>
      ))}
    </ul>
  )
}

export default Products
