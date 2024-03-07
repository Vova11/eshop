import {type FC} from 'react'
import { NavLink } from 'react-router-dom'


import { nanoid } from 'nanoid'

interface Link {
  id: string
  url: string
  text: string
}

const links: Link[] = [
  { id: nanoid(), url: '/', text: 'home' },
  { id: nanoid(), url: 'products', text: 'products' },
  { id: nanoid(), url: 'create-product', text: 'Create' },
  { id: nanoid(), url: 'about', text: 'about' },
  { id: nanoid(), url: 'checkout', text: 'checkout' },
  { id: nanoid(), url: 'orders', text: 'orders' },
  { id: nanoid(), url: 'contact', text: 'contact' },
]


const NavLinks: FC = () => {
  
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link
        
        return (
          <li key={id}>
            <NavLink className='capitalize' to={url}>
              {text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}
export default NavLinks
