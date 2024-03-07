import { type FC, useRef } from 'react'
import { Form, Input, SubmitBtn } from '../utils'
import { FormHandle } from '../utils/Form'
import { Link } from 'react-router-dom'

const Register: FC = () => {
  const customForm = useRef<FormHandle>(null)

  const handleSave = (data: unknown) => {
    const extractedData = data as {
      id: string
      title: string
      description: string
      quantity: number
    }

    console.log(extractedData)

    // customForm.current?.clear()
  }

  return (
    <section className='h-screen grid place-items-center'>
      <Form
        onSave={handleSave}
        ref={customForm}
        className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <Input id='username' label='username' type='text' name='username' />
        <Input id='email' label='email' type='email' name='email' />
        <Input id='password' label='password' type='password' name='password' />
        <div className='mt-4'>
          <SubmitBtn text='register' />
        </div>
        
        <p className='text-center'>
          Already a member?{' '}
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Register
