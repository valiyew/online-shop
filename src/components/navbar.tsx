import { useNavigate } from 'react-router-dom'
import { Box, Flex } from '@mantine/core'
import { AddProducts } from 'page/add-product'
import { IoMdCart } from 'react-icons/io'

interface NavbarProps {}

const Navbar = () => {
  const navigate = useNavigate()

  const handleSave = () => {
    navigate('/dashboard/save')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px' }}>
      <h3 onClick={() => navigate('')} style={{ cursor: 'pointer' }}>
        Products
      </h3>
      <Flex sx={{ gap: '10px', alignItems: 'center' }}>
        <AddProducts/>
        <Box sx={{ fontSize: '30px', cursor: 'pointer' }} onClick={handleSave}>
          <IoMdCart />
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
