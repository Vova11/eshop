export interface Product {
  name: string
  description: string
  price: number
  photo?: string
}

export interface ProductProps {
  message: string
  isLoading: boolean
}

export interface ProductList extends ProductProps {
  products: Product[]
}
