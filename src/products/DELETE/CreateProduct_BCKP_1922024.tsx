import { SyntheticEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DataService } from '../../services/DataService'

type CreateProductProps = {
  dataService: DataService
}

type CustomEvent = {
  target: HTMLInputElement
}

export default function CreateProduct({ dataService }: CreateProductProps) {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [photo, setPhoto] = useState<File | undefined>()
  const [actionResult, setActionResult] = useState<string>('')

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (name) {
      const id = await dataService.createProduct(name, description, price, photo!)
      setActionResult(`Created space with id ${id}`)
      setName('')
      setDescription('')
    } else {
      setActionResult('Please provide a name and a location!')
    }
  }

  function setPhotoUrl(event: CustomEvent) {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0])
    }
  }

  function renderPhoto() {
    if (photo) {
      const localPhotoURL = URL.createObjectURL(photo)
      return <img alt='' src={localPhotoURL} style={{ maxWidth: '200px' }} />
    }
  }

  function renderForm() {
    if (!dataService.isAuthorized()) {
      return <NavLink to={'/login'}>Please login</NavLink>
    }
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Description:</label>
        <br />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price:</label>
        <br />
        <input
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <br />
        <label>Photo:</label>
        <br />
        <input type='file' onChange={(e) => setPhotoUrl(e)} />
        <br />
        {renderPhoto()}
        <br />
        <input type='submit' value='Create space' />
      </form>
    )
  }

  return (
    <div>
      {renderForm()}
      {actionResult ? <h3>{actionResult}</h3> : undefined}
    </div>
  )
}
