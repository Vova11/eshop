import { AuthService } from "../AuthService";
import { DataStack, ApiStack } from '../../../../backendEshop/outputs.json'
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'

const productsUrl = ApiStack.myApiEndpointF2DFDFB1 + 'products'

export class DataService {
  private authService: AuthService
  private s3Client: S3Client | undefined
  private awsRegion = 'eu-central-1'
  constructor(authService: AuthService) {
    this.authService = authService
  }

  public async createProduct(
    name: string,
    description: string,
    price: string,
    photo: File | undefined
  ) {
    console.log('calling create product!!')
    const product = {} as any;
    product.name = name;
    product.description = description;
    product.price = price;
    await this.authService.getTemporaryCredentials()
    console.log('Token is');
    
    console.log(this.authService.jwtToken!);
    
    if (photo) {
      const uploadUrl = await this.uploadPublicFile(photo)
      console.log(uploadUrl)
      product.photoUrl = uploadUrl
    }
    const postResult = await fetch(productsUrl, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Authorization': this.authService.jwtToken!
      }
    })

    const postResultJSON = await postResult.json()


    console.log(postResultJSON)
    return postResultJSON.id
  }

  private async uploadPublicFile(file: File) {
    const credentials = await this.authService.getTemporaryCredentials()
    if (!this.s3Client) {
      this.s3Client = new S3Client({
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
  public isAuthorized() {
    return true
  }
}
