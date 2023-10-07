export namespace IEntitiy {
  export interface Products {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: [img1: string, img2: string, img3: string, img4: string, img5: string]
  }
}

export namespace IApi {
  export namespace GetProducts {
    export interface Request {
      title: string
      description: string
      price: number
      discountPercentage: number
      brand: string
      category: string
    }

    export interface Response {
      allproducts: IEntitiy.Products[]
    }
  }
}
