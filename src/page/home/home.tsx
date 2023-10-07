import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex } from '@mantine/core'

export default function Home() {
  const navigate = useNavigate()

  return (
    <Flex sx={{ justifyContent: 'space-around', marginTop: '50px' }}>
      <h1>ONLINE SHOP</h1>
      <Flex sx={{ gap: '20px' }}>
        <Button onClick={() => navigate('/auth/login')}>Sign In</Button>
        <Button onClick={() => navigate('/auth/register')}>Sign Up</Button>
      </Flex>
    </Flex>
  )
}
