import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, InputBase, Paper, PasswordInput, Select, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import axios from 'axios'
import {IMaskInput} from "react-imask"
import * as yup from 'yup'

const schema = yup.object({
  password: yup.string().min(8).label('Password').required(),
  fullName: yup.string().min(5).label('Full name'),
  email: yup.string().email().required(),
  dateOfBirth: yup.string().required(),
  phoneNumber: yup.string().required(),
  gender: yup.string().required()
})

export function Register() {
  const navigate = useNavigate()

  const form = useForm({
    initialValues: { fullName: '', password: '', email: '', dateOfBirth: '', phoneNumber: '', gender: '' },
    validate: yupResolver(schema)
  })

  const [loader, setLoader] = useState(false)

  const onSubmit = async (values: any) => {
    const baseURL = 'http://134.209.20.129:8082/user/auth/sign-up'
    
    setLoader(true)

    try {
      const res = await axios.post(baseURL, values)

      console.log(res.data)

      navigate('/auth/login')
    } catch (err: any) {
      console.log('error = ', err)
    } finally {
      setLoader(false)
    }
  }

  return (
    <Box h="100vh" sx={{ display: 'grid', placeItems: 'center' }}>
      <Flex direction="column" gap={48} align="center">
        <Box>Register Online shop</Box>
        <Paper w={380} p={32} bg="#f1f2f6">
          <Title mb={44} size={24}>
            Register
          </Title>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex direction="column" gap={22}>
              <InputBase label="Full name" {...form.getInputProps('fullName')} />
              <InputBase label="Date of birth" {...form.getInputProps('dateOfBirth')} 
              component={IMaskInput}
              mask="00.00.0000"
              />
              <InputBase label="Phone number" {...form.getInputProps('phoneNumber')} 
              component={IMaskInput}
              mask="+998 00 (000) 00-00"
              />
              <Select
                label="gender"
                data={[
                  { value: 'MALE', label: 'Male' },
                  { value: 'FEMALE', label: 'Female' }
                ]}
                {...form.getInputProps('gender')}
              />
              <InputBase label="email" {...form.getInputProps('email')} />
              <PasswordInput label="password" {...form.getInputProps('password')} />

              <Button loading={loader} type="submit">Register</Button>
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  )
}
