import { Outlet } from 'react-router-dom'
import {Header, Navbar} from '../components'
import { useAppSelector } from '../store/hooks'
const HomeLayout = () => {
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  
  return (
    <>
      {/* <AppNavbar image={{ src: AppImage, alt: AltOfLogo }}>
        {AppTitle}
      </AppNavbar> */}
      <Header user={user} isAuthenticated={isAuthenticated} />
      <Navbar />
      <section className='align-element py-20'>
        <Outlet />
      </section>
    </>
  )
}
export default HomeLayout
