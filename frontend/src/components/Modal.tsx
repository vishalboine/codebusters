import ReactModal from 'react-modal'
import './Modal.scss'

const Modal = ({isOpen, handleClose,children}: any) => {
    console.log(isOpen)
  return (
    <div className='modal-wrappper'>
        <ReactModal
        isOpen={isOpen} 
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        onRequestClose={handleClose}
        className="Modal"
        overlayClassName="Overlay"
    >{children}</ReactModal>
    </div>
  )
}

export default Modal