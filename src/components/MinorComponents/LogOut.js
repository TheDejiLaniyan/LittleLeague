import React, {useState} from 'react'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const LogOut = (props) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
      }

  return (
    <Modal{ ...props}  >
    <Modal.Header closeButton>
      <Modal.Title>Log Out</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{fontWeight: 600}}>Are you sure you want to Log Out?</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" 
                className='form__submit-button'
                onClick={handleClose}>
        No
      </Button>
      <Button style={{backgroundColor: 'black', borderColor:'black'}}
                className='form__submit-button'
                onClick={onLogoutClicked}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default LogOut
