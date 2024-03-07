import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthService } from '../../services/AuthService'
import { setUser } from "./authSlice"


//input
type SignInFormType = {
  userName: string
  password: string
}

const authService = new AuthService()


export const signIn = createAsyncThunk(
  'auth/signInUser',
  async ({ userName, password }: SignInFormType) => {
    console.log('Auth service');
    
    const result = await authService.login(userName, password)
    console.log(result)
    const username = authService.getUserName()
    // await authService.getTemporaryCredentials()
    return username
  }
)

export const refreshUserAsync = createAsyncThunk(
  'auth/refreshUser',
  async (_, { dispatch }) => {
    try {
      console.log('refreshUser in Auth.service.ts')
      const refreshedUser = await authService.refreshUser()
      const user = refreshedUser?.getUsername()
      console.log(user)
      dispatch(setUser(user))
      return user
    } catch (error) {
      // Handle error if user refresh fails
      console.error('Error refreshing user:', error)
      throw error
    }
  }
)

export const logoutUserAsync = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    console.log('logging out user in store Auth service')
    try {
      await authService.signOut()
      localStorage.removeItem('jwtToken')
      dispatch(setUser(null)) // Assuming setUser is an action creator that sets user state to null
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }
)


// export const signIn = createAsyncThunk<>(
//   'auth/logIn',
//   async (data, { rejectWithValue }) => {
//     try {
//       await authService.login(
//         data.userName,
//         data.password
//       )
      
//       const result = authService.getUserName()
//       return result
//     } catch (error) {
//       // Explicitly specify the type for rejectWithValue to avoid the error
//       const serializedError = JSON.stringify(error)
//       return rejectWithValue(serializedError)
//     }
//   }
// )




// export const signIn = createAsyncThunk(
//   'auth/signIn',
//   async ({ userName, password }: SignInForm) => {
//     const returnUser = await authService.login(userName, password)
//     console.log(returnUser);
//     const userName2 = authService.getUserName()
//     return userName2
//   }
// )



// import { createAsyncThunk } from "@reduxjs/toolkit"
// import { AuthService } from '../services/AuthService'
// import { type CognitoUser } from '@aws-amplify/auth'
// const authService = new AuthService()

// type SignInForm = {
//   userName: string
//   password: string
// }

// type LoginProps = {
//   authService: AuthService
//   // setUserNameCb: (userName: string) => void
// }

// //result
// type PayloadType = bject | undefined
// //input
// type ArgType = {
//   userName: string
//   password: string
// }

// const authAsync = createAsyncThunk<PayloadType, ArgType>(
//   'auth/logIn',
//   async (data, { rejectWithValue }) => {
//     console.log('hi from Thunk')
//     try {
//       // Assuming authService.login returns CognitoUser
//       const loginResponse = await authService.login(
//         data.userName,
//         data.password
//       )

//       // Ensure loginResponse is of type CognitoUser
//       if (
//         'getUsername' in loginResponse &&
//         typeof loginResponse.getUsername === 'function'
//       ) {
//         const userName = loginResponse.getUsername()
//         return userName as string | undefined
//       } else {
//         throw new Error('Invalid response type')
//       }
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )

// export default authAsync

// import { AuthService } from './../services/AuthService';
// import {
//   createAsyncThunk,
//   AsyncThunkPayloadCreatorReturnValue,
// } from '@reduxjs/toolkit'
// import { AuthService } from '../services/AuthService'
// import { CognitoUser } from '@aws-amplify/auth'

// //result
// type PayloadType = Object | undefined
// //input
// type ArgType = {
//   userName: string
//   password: string
// }

// type LoginProps = {
//   authService: AuthService
//   // setUserNameCb: (userName: string) => void
// }

// const authService = new AuthService()

// const authAsync = createAsyncThunk<PayloadType, ArgType>(
//   'auth/logIn',
//   async (data, { rejectWithValue }) => {
//     console.log('hi from Thunk')
//     try {
//       const loginResponse = await authService.login(
//         data.userName,
//         data.password
//       )
//       // Cast loginResponse to the expected type
//       const user = loginResponse as LoginProps
//       const result = user.authService.getUserName()
//       console.log(result);

//       return result
//     } catch (error) {
//       // Explicitly specify the type for rejectWithValue to avoid the error
//       return rejectWithValue(error)
//     }
//   }
// )

// export default authAsync
