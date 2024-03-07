// import { DataService } from './../../services/DataService-BCKP';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from './ProductTypes'
import { DataService } from '../../services/DataService'
import { AuthService } from '../../services/AuthService';

const authService = new AuthService()
const dataService = new DataService(authService)


export const createProduct = createAsyncThunk(
  'product/create',
  async ({name, description, price, photo}: Product) => {
    console.log('In Product service')

    const result = await dataService.createProduct(
      name,
      description,
      price,
      photo
    )
    console.log('Result in Product service');
    return result
  }
)

export const getProducts = createAsyncThunk(
  'product/geProducts',
  async () => {
    const result = await dataService.getProducts()!
    console.log('Loading products')
    console.log(result);
    return result
  }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId: string) => {
  const result = await dataService.deleteProduct(productId)
  console.log('Deleting product')
  console.log(result)
  return productId
})
