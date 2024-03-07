import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type User = {
  username:string
}

const initialState: User = {
  username: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // any methods to manipulate the state
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
  },
  extraReducers: {},
})


// Export the updateName action creator for use in the component
export const { updateName } = userSlice.actions

// Export the reducer for use in the store
export const userReducer = userSlice.reducer;