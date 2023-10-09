import React from 'react'
import { Navigate, Outlet, Route, Routes as Switch } from 'react-router-dom'
import { Products } from 'page/all-products'
import { Login, Register } from 'page/auth'
import { Save } from 'page/save'

export default function Routes() {
  const userToken = localStorage.getItem('userToken')

  return (
    <Switch>
      <Route path="" element={!userToken ? <Navigate to="auth"/> : <Navigate to="dashboard"/>}/>
       
  

      <Route path="auth" element={!userToken ? <Outlet/> : <Navigate to="/dashboard"/>}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route index  path="*" element={<Navigate to="/auth/login"/>} />
      </Route>

      <Route path="dashboard" element={userToken ? <Outlet/> : <Navigate to="/auth"/>}>
        <Route path="products" element={<Products />} />
        <Route path="save" element={<Save />} />
        <Route path="*" index element={<Navigate to="/dashboard/products"/>} />
      </Route>
    </Switch>
  )
}
