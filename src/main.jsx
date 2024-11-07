import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Paypal from './Components/PayPal/PayPal.jsx'
import Info from './Components/Info/Info.jsx'

import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />

      <Route path="/payment" element={<Paypal />} />
      <Route path ='/info' element={<Info />} />


      
    </Route>
  )
);



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={routes} />
  </React.StrictMode>
)
