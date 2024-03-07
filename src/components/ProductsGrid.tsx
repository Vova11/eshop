import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'

type Product = {
  id: string // Assuming the id is a string, adjust the type accordingly
  name: string
  price: number // Assuming the price is a number, adjust the type accordingly
  photo: string
  // Add more properties if needed
}

const ProductsGrid = () => {
   const { products } = useLoaderData() as { products: Product[] }

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product: Product) => {
        const { name, price, photo } = product
        // const dollarsAmount = formatPrice(price)
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={photo}
                alt={name}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{name}</h2>
              {/* <span className='text-secondary'>{dollarsAmount}</span> */}
              <span className='text-secondary'>{price}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default ProductsGrid
