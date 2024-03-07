import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { logoutUserAsync, refreshUserAsync, signIn } from './Auth.service'
import { AuthState } from './AuthTypes'
import { StoreStatus } from '../Common/types'
import { CognitoUser } from '@aws-amplify/auth'

const initialState: AuthState = {
  isAuthenticated: false,
  message: '',
  status: StoreStatus.Idle,
  user: null,
  loading: true,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // any methods to manipulate the state
  reducers: {
    setUser: (state, { payload }: PayloadAction<CognitoUser | undefined>) => ({
      ...state,
      isAuthenticated: true,
      user: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      signIn.fulfilled,
      (state, action: PayloadAction<string | undefined>) => ({
        ...state,
        status: StoreStatus.Succeeded,
        isAuthenticated: true,
        user: action.payload || '',
      })
    )
    // Add the new asynchronous action to handle user refresh
    builder.addCase(refreshUserAsync.fulfilled, (state, action) => {
      const isAuthenticated = action.payload !== undefined ? true : false

      return {
        ...state,
        status: StoreStatus.Succeeded,
        isAuthenticated: isAuthenticated,
        user: action.payload,
      }
    })
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      return { ...initialState, isAuthenticated: false }
    })

    // Handle pending & rejected requests
    builder.addMatcher(
      isAnyOf(signIn.pending, refreshUserAsync.pending, logoutUserAsync.pending),
      () => ({
        ...initialState,
        loading: true,
      })
    )
    builder.addMatcher(
      isAnyOf(signIn.rejected, refreshUserAsync.rejected, logoutUserAsync.rejected),
      (state, { error }) => {
        return {
          ...state,
          message: error.message || '',
        }
      }
    )
  },
})

// Export the updateName action creator for use in the component
export const { setUser } = authSlice.actions

// Export the reducer for use in the store
export const authReducer = authSlice.reducer
