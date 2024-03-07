import { AuthService } from './AuthService'
import {
  DataStack,
  ApiStack,
} from '../../../backendEshop/outputs.json'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { ProductEntry } from '../model/model'
import { Product } from '../store/Products/ProductTypes'

const productsUrl = ApiStack.myApiEndpointF2DFDFB1 + 'products'

export class DataService {
  private authService: AuthService
  private s3Client: S3Client | undefined
  private awsRegion = 'eu-central-1'

  constructor(authService: AuthService) {
    this.authService = authService
  }

  public reserveProduct(productId: string) {
    return '123'
  }

  public async getProducts(): Promise<ProductEntry[]> {
    const token = this.authService.getStoredToken() // Retrieve the token here
    console.log('Getting products')
    const getProductsResult = await fetch(productsUrl, {
      method: 'GET',
      headers: {
        Authorization: token!,
      },
    })

    const getProductsResultJson = await getProductsResult.json()
    return getProductsResultJson
  }

  public async deleteProduct(productId: string): Promise<ProductEntry[]> {
    const token = this.authService.getStoredToken() // Retrieve the token here
    console.log('Deleteing product')

    const getProductResult = await fetch(`${productsUrl}?id=${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token!,
      },
    })

    const getProductResultJson = await getProductResult.json()
    return getProductResultJson
  }

  public async createProduct(
    name: string,
    description: string,
    price: number,
    photo?: File
  ) {
    try {
      console.log('calling create product!!')

      const product: Product = {
        name: name,
        description: description,
        price: price,
      }

      if (photo && photo.name !== '') {
        const uploadUrl = await this.uploadPublicFile(photo)
        product.photo = uploadUrl
      }

      const token = this.authService.getStoredToken()

      const postResult = await fetch(productsUrl, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          Authorization: token!,
        },
      })

      if (!postResult.ok) {
        // If the response status is not okay, throw an error
        throw new Error(
          `Failed to create product. Status: ${postResult.status}`
        )
      }

      const postResultJSON = await postResult.json()
      console.log('Post result JSON isL ')
      console.log(postResultJSON)

      return postResultJSON.id
    } catch (error) {
      // Log the error and handle it as needed
      console.error('Error creating product:', error)
      // You might want to rethrow the error if you want to propagate it further
      throw error
    }
  }

  private async uploadPublicFile(file: File) {
    const credentials = await this.authService.getTemporaryCredentials()
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        credentials: credentials as any,
        region: this.awsRegion,
      })
    }
    const command = new PutObjectCommand({
      Bucket: DataStack.EshopProductPhotosBucketName,
      Key: file.name,
      ACL: 'public-read',
      Body: file,
    })
    await this.s3Client.send(command)
    return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`
  }

}
