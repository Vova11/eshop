
import {type CognitoUser} from '@aws-amplify/auth';
import {Amplify, Auth} from 'aws-amplify'
import {AuthStack} from '../../../backendEshop/outputs.json'
import {
  CognitoIdentityClient,
} from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'


const awsRegion = 'eu-central-1' //TODO set as env variable

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: awsRegion,
    userPoolId: AuthStack.EshopUserPoolId,
    userPoolWebClientId: AuthStack.EshopUserPoolClientId,
    identityPoolId: AuthStack.EshopIdentityPoolId,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
})

export class AuthService {
  private user: CognitoUser | undefined
  public jwtToken: string | undefined
  private temporaryCredentials: object | undefined
  private storedToken: string | null

  constructor() {
    this.storedToken = localStorage.getItem('jwtToken')
    this.refreshUser()
  }

  // If you need to access the token outside the class, you can create a getter method
  public getStoredToken(): string | null {
    return this.storedToken
  }

  // public isAuthorized() {
  //   // if (this.user) {
  //   //   return true
  //   // }
  //   // return false
  //   return true
  // }

  public async login(
    userName: string,
    password: string
  ): Promise<object | undefined> {
    try {
      this.user = (await Auth.signIn(userName, password)) as CognitoUser
      this.jwtToken = this.user
        ?.getSignInUserSession()
        ?.getIdToken()
        .getJwtToken()

      // Save the JWT token to local storage
      if (this.jwtToken) {
        localStorage.setItem('jwtToken', this.jwtToken)
      }
      return this.user
    } catch (error) {
      console.log(error)
      // return undefined
      throw Error('Please try again')
      return
    }
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials()
    return this.temporaryCredentials
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.EshopUserPoolId}`

    if (!this.storedToken) {
      throw new Error('JWT token not found in local storage')
    }

    const cognitoIdentity = new CognitoIdentityClient({
      region: awsRegion,
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: awsRegion,
        },
        identityPoolId: AuthStack.EshopIdentityPoolId,
        logins: {
          [cognitoIdentityPool]: this.storedToken,
        },
      }),
    })

    try {
      const credentials = await cognitoIdentity.config.credentials()
      console.log('Temporary Credentials:', credentials)
      return credentials
    } catch (error) {
      console.error('Error obtaining temporary credentials:', error)
      alert(error)
      throw error
    }
  }

  public getUserName = () => {
    return this.user?.getUsername()
  }

  public async refreshUser(): Promise<CognitoUser | undefined> {
    try {
      this.user = await Auth.currentAuthenticatedUser({ bypassCache: true })
      console.log(this.user)

      this.jwtToken = this.user
        ?.getSignInUserSession()
        ?.getIdToken()
        .getJwtToken()

      // Save the refreshed JWT token to local storage
      if (this.jwtToken) {
        localStorage.setItem('jwtToken', this.jwtToken)
      }
      return this.user
    } catch (error) {
      console.log(error)
      // Handle the error, maybe the user needs to sign in again
      return undefined
    }
  }

  public async signOut(): Promise<void> {
    try {
      await Auth.signOut()
      // Clear any local storage or state related to the user
      localStorage.removeItem('jwtToken')
      // Optionally, you can reset the class properties or Redux state related to the user
      this.user = undefined
      this.jwtToken = undefined
    } catch (error) {
      console.error('Error logging out:', error)
      throw error
    }
  }
}



