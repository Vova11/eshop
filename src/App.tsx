import { RouterProvider } from 'react-router-dom'
import {router} from './routes/Routes'
import { useAppDispatch } from './store/hooks'
import { refreshUserAsync } from './store/Auth/Auth.service'
import { useEffect } from 'react'

const App = () => {
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log('App.tsx component rendered')
    dispatch(refreshUserAsync())
  }, [dispatch])

  return <RouterProvider router={router} />
}

export default App
