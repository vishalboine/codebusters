import ReactModal from 'react-modal'
import './Modal.scss'

const Modal = ({isOpen, handleClose,children, overlayClick = false}: any) => {
  return (
    <div className='modal-wrappper'>
        <ReactModal
        isOpen={isOpen} 
        shouldCloseOnOverlayClick={overlayClick}
        shouldCloseOnEsc={true}
        onRequestClose={handleClose}
        className="Modal"
        overlayClassName="Overlay"
    >{children}</ReactModal>
    </div>
  )
}

export default Modal