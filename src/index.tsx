import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Routes from 'routes/routes'

import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)
