import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Flex, InputBase, Paper, PasswordInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import axios from 'axios'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().label('Email').required(),
  password: yup.string().min(8).label('Password').required()
})

export default function Login() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: yupResolver(schema)
  })
  const [loader, setLoader] = useState(false)

  const onSubmit = async (values: any) => {
    setLoader(true)

    const baseURL = 'http://134.209.20.129:8082/user/auth/sign-in'

    try {
      const res = await axios.post(baseURL, values)

      const userToken = res.data.data.accessToken

      localStorage.setItem('userToken', userToken)

      console.log(res.data)

     window.location.href = "/"
    } catch (err: any) {
      console.log('error = ', err)
    } finally {
      setLoader(false)
    }
  }

  return (
    <Box h="100vh" sx={{ display: 'grid', placeItems: 'center' }}>
      <Flex direction="column" gap={48} align="center">
        <Box>Login Online shop</Box>
        <Paper w={380} p={32} bg="#f1f2f6">
          <Title mb={44} size={24}>
            Login
          </Title>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex direction="column" gap={22}>
              <InputBase label="Email" {...form.getInputProps('email')} />
              <PasswordInput label="Password" {...form.getInputProps('password')} />
              <Flex sx={{ gap: '10px' }}>
                <p>Don't have an account ?</p>
                <Link style={{ textDecoration: 'none' }} to="/auth/register">
                  Sign up
                </Link>
              </Flex>
              <Button loading={loader} type="submit">
                Login
              </Button>
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  )
}
