import { type FC, useRef, useState, ChangeEvent } from 'react'
import { Input, Form, SubmitBtn } from '../utils'
import { FormHandle } from '../utils/Form'
import { useAppDispatch } from '../store/hooks'
import { createProduct } from '../store/Products/Product.service'


const CreateProduct: FC = () => {
  const dispatch = useAppDispatch()
  const [photoImage, setPhotoImage] = useState<File | undefined>()
  const customForm = useRef<FormHandle>(null)
  // const [actionResult, setActionResult] = useState<string>('')

  const handleSave = async (data: unknown) => {
    console.log(data)
    const extractedData = data as {
      name: string
      description: string
      price: number
      photo: string
    }

    const product = {
      name: extractedData.name,
      description: extractedData.description,
      price: extractedData.price,
      photo: extractedData.photo,
    }
    
    dispatch(createProduct(product))
  }
  
  function setPhotoUrl(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setPhotoImage(event.target.files[0])
    }
  }

  function renderPhoto() {
    if (photoImage) {
      const localPhotoURL = URL.createObjectURL(photoImage)
      return <img alt='' src={localPhotoURL} style={{ maxWidth: '200px' }} />
    }
  }

  function renderForm() {
    // if (!dataService.isAuthorized()) {
    //   return <NavLink to={'/login'}>Please login</NavLink>
    // }
    return (
      <Form onSave={handleSave} ref={customForm}>
        <Input id='name' label='Product name' type='text' name='name' />
        <Input
          id='description'
          label='Product description'
          type='text'
          name='description'
        />
        <Input
          id='price'
          label='Price'
          type='number'
          step='0.01'
          name='price'
        />
        <Input
          id='photo'
          label='Photo'
          type='file'
          name='photo'
          onChange={(e) => setPhotoUrl(e)}
        />
        {photoImage && renderPhoto()}
        <p>
          <SubmitBtn text='Create product' />
        </p>
      </Form>
    )
  }

  return (
    <div>
      {renderForm()}
      {/* {actionResult ? <h3>{actionResult}</h3> : undefined} */}
    </div>
  )
}


export default CreateProduct;