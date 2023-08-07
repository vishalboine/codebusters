import { useContext } from 'react';
import ReactModal from 'react-modal'
import { ThemeContext } from '../context/theme-context';
import './Modal.scss'
import '../styles/iwVariables.scss';
import '../styles/themeVariable.scss';

const Modal = ({isOpen, handleClose,children, overlayClick = false}: any) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='modal-wrappper'>
        <ReactModal
        isOpen={isOpen} 
        shouldCloseOnOverlayClick={overlayClick}
        shouldCloseOnEsc={true}
        onRequestClose={handleClose}
        className={theme === "light"? "Modal":"DarkModal"}
        overlayClassName="Overlay"
    >{children}</ReactModal>
    </div>
  )
}

export default Modal