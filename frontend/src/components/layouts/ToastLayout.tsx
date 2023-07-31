import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "../../styles/iwVariables.scss";
import "../../styles/dxTable.scss";
import "../../styles/formElemets.scss";
import "../../styles/mixins.scss";
import "../../styles/index.scss";
import 'react-toastify/dist/ReactToastify.css'

const ToastLayout = () => {
  return (
    <>
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default ToastLayout