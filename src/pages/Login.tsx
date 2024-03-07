import { type FC, useRef} from 'react'
import { Form, Input, SubmitBtn } from '../utils'
import { FormHandle } from '../utils/Form'
import { Link, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { signIn } from '../store/Auth/Auth.service'

const Login: FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, status, message } = useAppSelector(
    (store) => store.auth
  )
  const customForm = useRef<FormHandle>(null)

  const handleSave = async (data: unknown) => {
    const extractedData = data as {
      userName: string
      password: string
    }

    if (extractedData.userName && extractedData.password) {
      await dispatch(signIn(extractedData))
    }
  }

  if (status === 'Loading') {
    return <span className='loading loading-spinner loading-lg'></span>
  }

  function renderLoginResult() {
    if (status === 'Failed') {
      return <h1>{message}</h1>
    }
  }

  return (
    <section className='h-screen grid place-items-center'>
      {isAuthenticated && <Navigate to='/' replace={true} />}
      <Form
        onSave={handleSave}
        ref={customForm}
        className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <Input id='userName' label='userName' name='userName' type='text' />
        <Input id='password' label='password' name='password' type='password' />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button type='button' className='btn btn-secondary btn-block'>
          guest user
        </button>
        <p className='text-center'>
          Not a member yet?{' '}
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
      {renderLoginResult()}
    </section>
  )
}
export default Login
