import { ProductItem } from './'

export type Product = {
  id: string
  title: string
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
