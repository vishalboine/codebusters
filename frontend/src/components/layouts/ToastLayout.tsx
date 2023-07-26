import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {}

const ToastLayout = (props: Props) => {
  return (
    <>
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default ToastLayout