import { type FC, useRef, useState } from 'react'
import {Form, Input, SubmitBtn } from '../utils'
import {FormHandle} from '../utils/Form';
import { Link, Navigate } from 'react-router-dom'
import { AuthService } from '../services/AuthService';
import { updateName } from '../store/user-slice'
import { useAppDispatch, useAppSelector } from '../store/hooks';

type LoginProps = {
  authService: AuthService
  // setUserNameCb: (userName: string) => void
}

const Login: FC<LoginProps> = ({authService }) => {
  const dispatch = useAppDispatch()
  const { name } = useAppSelector((store) => store.user)
  const customForm = useRef<FormHandle>(null)
   const [errorMessage, setErrorMessage] = useState<string>(name)
   const [loginSuccess, setLoginSuccess] = useState<boolean>(false)
   const [userName, setUserNameCb] = useState<string>('')
 
  const handleSave = async (data: unknown) => {
    const extractedData = data as {
      userName: string,
      password: string
    }

    if (extractedData.userName && extractedData.password) {
    
      const loginResponse = await authService.login(
        extractedData.userName,
        extractedData.password
      )
      const userName2 = authService.getUserName()
      console.log(userName2);
      console.log(typeof userName2)
      
      if (userName2) {
        dispatch(updateName(userName2))
        setUserNameCb(userName2)
      }

      if (loginResponse) {
        setLoginSuccess(true)
      } else {
        setErrorMessage('invalid credentials')
      }
      console.log(extractedData);
      // customForm.current?.clear()
    }
    setErrorMessage('invalid credentials')
  }

  function renderLoginResult() {
    if (errorMessage) {
      return <h1>{errorMessage}</h1>
    }
  }


  return (
    <section className='h-screen grid place-items-center'>
      {loginSuccess && <Navigate to='/' replace={true} />}
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
