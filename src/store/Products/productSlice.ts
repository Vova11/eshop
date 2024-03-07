import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Product, ProductList } from './ProductTypes'
import { createProduct, getProducts, deleteProduct } from './Product.service'

const initialState: ProductList = {
  message: '',
  isLoading: false,
  products: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // any methods to manipulate the state
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      console.log(action)
      state.products.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          console.log('hi in productSlice - Create product')
          // Update the state by creating a new array with the existing products and the new one
          state.products = [...state.products, action.payload]
        }
      )
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload
        }
      )
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          console.log('Products are:')
          console.log(action.payload)

          state.products = state.products.filter(
            (product) => product.id !== action.payload
          )
        }
      )
      // Handle pending & rejected requests
      .addMatcher(isAnyOf(getProducts.pending), () => ({
        ...initialState,
        loading: true,
      }))
      .addMatcher(isAnyOf(getProducts.rejected), (state, { error }) => {
        return {
          ...state,
          message: error.message || '',
        }
      })
  },
})

// Export the updateName action creator for use in the component
export const { addProduct } = productsSlice.actions

// Export the reducer for use in the store
export const productsReducer = productsSlice.reducer
