import { useState } from 'react'
import { Box, Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().min(3).label('Title').required(),
  brand: yup.string().min(3).label('Brand').required(),
  price: yup.string().label('Price').required(),
  description: yup.string().max(20).label('Description').required()
})

function CreateProduct() {
  const [opened, { open, close }] = useDisclosure(false)
  const [loader, setLoader] = useState(false)
  const form = useForm<any>({
    initialValues: {
      title: '',
      brand: '',
      price: '',
      description: ''
    },
    validate: yupResolver(schema)
  })

  const handleSubmitSaveProduct = async () => {
    const baseURL = 'https://dummyjson.com/products/add'

    setLoader(true)
    try {
      const res = await axios.post(baseURL, form.values)

      console.log(res)
      console.log(res.data)
      console.log(res.status)

      notifications.show({ message: 'Succesfully added products', color: 'green' })

      form.reset()
      
      close()
    } catch (error: any) {
      notifications.show({ message: error.message, color: 'red' })
    } finally {
      setLoader(false)
    }
  }

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Create product">
        <form action="create" onSubmit={form.onSubmit(handleSubmitSaveProduct)}>
          <TextInput sx={{ marginBottom: '10px' }} label="Title" {...form.getInputProps('title')} placeholder="Enter product title" required />
          <TextInput sx={{ marginBottom: '10px' }} label="Brand" {...form.getInputProps('brand')} placeholder="Enter product brand" required />
          <TextInput
            sx={{ marginBottom: '10px' }}
            type="number"
            {...form.getInputProps('price')}
            label="Price"
            placeholder="Enter product price"
            required
          />
          <TextInput
            sx={{ marginBottom: '10px' }}
            {...form.getInputProps('description')}
            label="Description"
            placeholder="Enter product description"
            required
          />
          <Button loading={loader} type="submit" radius="md">
            Save
          </Button>
        </form>
      </Modal>
      <Group position="center">
        <Button onClick={open} variant="light" sx={{ fontSize: '20px' }}>
          <AiOutlinePlusCircle />
        </Button>
      </Group>
    </Box>
  )
}

export default CreateProduct
