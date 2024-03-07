import { CognitoAttributes, StoreStatus } from "../Common/types"

export interface AuthState {
  isAuthenticated: boolean
  message: string
  status: StoreStatus
  user: CognitoAttributes | null
  username: string
  loading: true
  error: string
}
