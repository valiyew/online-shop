import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, InputBase, Loader } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { NoResult } from 'page'
import { IoMdCart } from 'react-icons/io'

import Navbar from 'components/navbar'

import { IApi } from './type'

import './style.css'

interface ProductsProps {}

const Products = () => {
  const [loader, setLoader] = useState(false)
  const [products, setProducts] = useState<IApi.GetProducts.Response>({ allproducts: [] })
  const [search, setSearch] = useState('')
  const [haveSave, setSave] = useState(false)

  const filtereSearchTitle = (searchValue: string) =>
    products.allproducts.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))

  const handleClick = (productId: number) => {
    // setSave(true)
    const cartJson = localStorage.getItem('cart')
    const cart = cartJson ? JSON.parse(cartJson) : []

    if (!cart.includes(productId)) {
      cart.push(productId)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  useEffect(() => {
    const baseURL = 'https://dummyjson.com/products'

    const fetchData = async () => {
      setLoader(true)
      try {
        const res = await axios.get(baseURL)

        setProducts({ allproducts: res.data.products })

        notifications.show({ message: 'Successfully get all data', color: 'green' })
      } catch (error: any) {
        notifications.show({ message: error.message, color: 'red' })
      } finally {
        setLoader(false)
      }
    }

    fetchData()
  }, [])

  console.log('products', products)

  return (
    <>
      <Navbar />
      <Center sx={{ flexDirection: 'column' }}>
        <h1>Products</h1>
        <InputBase value={search} onChange={e => setSearch(e.target.value)} sx={{ width: '50%' }} placeholder="Search..." />
        {loader ? (
          <Loader style={{ marginTop: '250px' }} variant="dots" size="md" />
        ) : (
          <Box sx={{ display: 'grid', marginTop: '100px' }} className="container">
            {products.allproducts && products.allproducts.length > 0 ? (
              filtereSearchTitle(search)
                .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
                .map(prdouct => (
                  <Box
                    key={prdouct.id}
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      border: '2px solid #ccc',
                      padding: '20px 20px',
                      borderRadius: '20px',
                      height: '600px'
                    }}
                  >
                    <Box>
                      <Button
                        onClick={() => handleClick(prdouct.id)}
                        className="save"
                        sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                      >
                        <IoMdCart size={30} />
                      </Button>
                      <img style={{ width: '100%', height: '350px', borderRadius: '20px' }} src={prdouct.images[1]} alt="" />
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <h1 style={{ fontSize: '24px' }}>{prdouct.title}</h1>
                        <p style={{ color: 'blue', fontSize: '18px' }}>{prdouct.brand}</p>
                      </Flex>
                      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                        <p className="chegirma" style={{ color: '#ccc', fontSize: '18px', fontWeight: '500' }}>
                          {prdouct.price + 100}$
                        </p>
                        <p style={{ color: 'blue', fontSize: '18px', fontWeight: '500', textDecoration: 'lineThrough' }}>{prdouct.price}$</p>
                      </Flex>
                      <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '20px' }}>{prdouct.description}</p>
                    </Box>
                  </Box>
                ))
            ) : (
              <NoResult />
            )}
          </Box>
        )}
      </Center>
    </>
  )
}

export default Products
