import {FeaturedProducts, Hero, } from '../components'
import { DataService } from '../services/DataService'
import { AuthService } from '../services/AuthService'

const authService = new AuthService()
const dataService = new DataService(authService)

async function fetchData() {
  try {
    const result = await dataService.getProducts()
    console.log(result) // You can access the data here
    return result // You can return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // Handle or rethrow the error as needed
  }
}


export const loader = async () => {
  try {
    console.log('Landing.tsx ......')
    const products = await fetchData()
    return { products }
  } catch (error) {
    console.error('Error loading data:', error)
    throw error // Handle or rethrow the error as needed
  }
}

const Landing = () => {
  
    return (
      <>
        <Hero />
        <FeaturedProducts />
      </>
    )
  
}
export default Landing