import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, InputBase, Loader } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { NoResult } from 'page'
import { IApi } from 'page/all-products/type'

import Navbar from 'components/navbar'

interface KarzinkaProps {}

const Karzinka = () => {
  const [saveProducts, setSaveProducts] = useState<IApi.GetProducts.Response>({ allproducts: [] })

  // console.log('alkskcmlkjr', saveProducts)
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState('')
  const cartItemsJSON = localStorage.getItem('cart')

  const filtereSearchTitle = (searchValue: string) =>
    saveProducts.allproducts.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))

  // @ts-ignore
  const cartItems = JSON.parse(cartItemsJSON)

  console.log(cartItems)

  const handleClick = (productId: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    deleteProduct(productId)
  }

  const deleteProduct = (productId: number) => {
    const localStorageData = localStorage.getItem('cart')
    const cartItems = localStorageData ? JSON.parse(localStorageData) : []

    const updatedCart = cartItems.filter((item: number) => item !== productId)

    localStorage.setItem('cart', JSON.stringify(updatedCart))

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    removeProductFromSave(productId)
  }

  const removeProductFromSave = (productId: number) => {
    setSaveProducts(prevProducts => ({
      allproducts: prevProducts.allproducts.filter(product => product.id !== productId)
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true)
        if (cartItems && cartItems.length > 0) {
          for (let i = 0; i < cartItems.length; i++) {
            const productId = cartItems[i]
            // eslint-disable-next-line no-await-in-loop
            const res = await axios.get(`https://dummyjson.com/products/${productId}`)

            const product = res.data

            setSaveProducts(prevProducts => ({
              ...prevProducts,
              allproducts: [...prevProducts.allproducts, product]
            }))
          }

          notifications.show({ message: 'Barcha saqlangan mahsulotlarni muvaffaqiyatli olish', color: 'green' })
        } else {
          notifications.show({ message: "Karzinkangiz bo'sh", color: 'red' })
        }
      } catch (error: any) {
        notifications.show({ message: error.message, color: 'red' })
      } finally {
        setLoader(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <Center sx={{ flexDirection: 'column' }}>
        <h1>Save Products</h1>
        <InputBase value={search} onChange={e => setSearch(e.target.value)} sx={{ width: '50%' }} placeholder="Search..." />
        {loader ? (
          <Loader style={{ marginTop: '250px' }} variant="dots" size="md" />
        ) : (
          <Box sx={{ display: 'grid', marginTop: '100px' }} className="container">
            {saveProducts.allproducts && saveProducts.allproducts.length > 0 ? (
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
                        Cancel save
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

export default Karzinka
