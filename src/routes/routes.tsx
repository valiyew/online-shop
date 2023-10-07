import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import { Products } from 'page/all-products'
import { Login, Register } from 'page/auth'
import { Home } from 'page/home'
import { Save } from 'page/save'

export default function Routes() {
  return (
    <Switch>
      <Route path="" element={<Home />} />

      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path='dashboard'>
        <Route path="products" element={<Products />} />
        <Route path="save" element={<Save />} />
      </Route>
    </Switch>
  )
}
