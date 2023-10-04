import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Karzinka from 'page/karzinka'
import Products from 'page/product-page'
import ReactDOM from 'react-dom/client'

import Navbar from 'components/navbar'

import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="" element={<Products />} />
      <Route path="/karzinka" element={<Karzinka />} />
    </Routes>
  </BrowserRouter>
)
