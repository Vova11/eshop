import { useState, useEffect } from 'react'
import ProductComponent from './ProductComponent'
import { DataService } from '../services/DataService'
import { NavLink } from 'react-router-dom'
import { ProductEntry } from '../model/model'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getProducts, deleteProduct } from '../store/Products/Product.service'

interface ProductProps {
  dataService: DataService
}

export default function Products(props: ProductProps) {
  const { products } = useAppSelector((store) => store.products)
  const dispatch = useAppDispatch()
  // const [spaces, setSpaces] = useState<ProductEntry[]>()
  const [reservationText, setReservationText] = useState<string>()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  async function reserveSpace(productId: string, productName: string) {
    const reservationResult = await props.dataService.reserveProduct(productId)
    setReservationText(
      `You reserved ${productName}, reservation id: ${reservationResult}`
    )
  }

  async function deleteItem(productId: string) {
    console.log(productId)
    dispatch(deleteProduct(productId))
    // const reservationResult = await props.dataService.reserveProduct(productId)
    // setReservationText(
    //   `You reserved ${productName}, reservation id: ${reservationResult}`
    // )
  }

  function renderProducts() {
    // if (!props.dataService?.isAuthorized()) {
    //   return <NavLink to={'/login'}>Please login</NavLink>
    // }
    const rows: any[] = []
    if (products) {
      for (const productEntry of products) {
        rows.push(
          <ProductComponent
            key={productEntry.id}
            id={productEntry.id}
            name={productEntry.name}
            description={productEntry.description}
            price={productEntry.price}
            photo={productEntry.photo}
            reserveSpace={reserveSpace}
            deleteItem={deleteItem}
          />
        )
      }
    }

    return rows
  }

  return (
    <div>
      <h2>Welcome to the Spaces page!</h2>
      {reservationText ? <h2>{reservationText}</h2> : undefined}
      {renderProducts()}
    </div>
  )
}
