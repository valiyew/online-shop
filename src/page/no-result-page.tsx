import { Box } from '@mantine/core'
import { PiSmileySad } from 'react-icons/pi'

interface NoResult {}

const NoResultPage = () => (
  <Box sx={{ marginTop: '70px', display: 'grid', placeItems: 'center' }}>
    <h1
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '150px',
        height: '150px',
        borderRadius: '50px',
        background: 'rgb(81, 81, 255)',
        fontSize: '80px',
        color: '#fff'
      }}
    >
      <PiSmileySad />
    </h1>
    <p style={{ fontSize: '22px' }}>You don't have an appointment</p>
  </Box>
)

export default NoResultPage
