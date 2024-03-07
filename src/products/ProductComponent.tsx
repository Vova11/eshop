import genericImage from '../assets/hero1.webp'
import { ProductEntry } from '../model/model'


interface ProductsComponentProps extends ProductEntry {
  reserveSpace: (productId: string, productName: string) => void
  deleteItem: (productId: string) => void
}

export default function ProductComponent(props: ProductsComponentProps) {
  function renderImage() {
    if (props.photo) {
      return <img src={props.photo} />
    } else {
      return <img src={genericImage} />
    }
  }

  return (
    <div className='spaceComponent'>
      {renderImage()}
      <label className='name'>{props.name}</label>
      <br />
      <label className='location'>{props.description}</label>
      <br />
      <button onClick={() => props.reserveSpace(props.id, props.name)}>
        Reserve
      </button>
      <button onClick={() => props.deleteItem(props.id)}>
        Delete
      </button>
    </div>
  )
}
