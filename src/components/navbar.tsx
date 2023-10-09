import { useNavigate } from 'react-router-dom'
import { Box, Flex } from '@mantine/core'
import { AddProducts } from 'page/add-product'
import { FaProductHunt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoMdCart } from 'react-icons/io'

interface NavbarProps {}

const Navbar = () => {
  const navigate = useNavigate()

  const handleSave = () => {
    navigate('/dashboard/save')
  }

  const logOut = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px' }}>
      <h3 onClick={() => navigate('')} style={{ cursor: 'pointer' }}>
        <Flex sx={{ gap: '5px' }}>
          <FaProductHunt size={45} />
          <p style={{ marginTop: '12px' }}>roducts</p>
        </Flex>
      </h3>
      <Flex sx={{ gap: '10px', alignItems: 'center' }}>
        <AddProducts />
        <Flex sx={{ fontSize: '30px', cursor: 'pointer', alignItems: 'center', gap: '20px' }}>
          <IoMdCart onClick={handleSave} />
          <FiLogOut onClick={logOut} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
