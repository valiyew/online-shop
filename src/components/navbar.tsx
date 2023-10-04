import { useNavigate } from 'react-router-dom'
import { Box } from '@mantine/core'
import { IoMdCart } from 'react-icons/io'

interface NavbarProps {}

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px' }}>
      <h3 onClick={() => navigate('')} style={{ cursor: 'pointer' }}>
        Products
      </h3>
      <Box sx={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => navigate('/karzinka')}>
        <IoMdCart />
      </Box>
    </Box>
  )
}

export default Navbar
