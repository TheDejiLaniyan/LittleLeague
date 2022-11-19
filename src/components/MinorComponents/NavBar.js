import {Navbar, Container, Form, NavDropdown, Nav, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogOut from './LogOut'
import { faHouse} from "@fortawesome/free-solid-svg-icons"
import React,{useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const NavBar = () => {
  const { isTier1, isTier2} = useAuth()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [logOutShow, setLogOutShow] = useState(false);

  const HomeClicked = ()=>{
    if(pathname.includes('/u')){
      navigate('/u')
    } else{
      navigate('/')
    }
  }

  // let HomeButton = null
  const HomeButton = (
    <button
        title="Logout"
        className='icon-button'
        style={{color:'white', backgroundColor: 'transparent'}}
        onClick={HomeClicked}
    >
        <FontAwesomeIcon icon={faHouse} />
    </button>
)

let officersLink = null
if(pathname.includes('/u')){
  officersLink = (
     <Nav.Link className='link nav-link' href="/u/officers">District Officers</Nav.Link>
  )
} else{
  officersLink = (
    <Nav.Link className='link nav-link' href="/officers">District Officers</Nav.Link>
  )
}

let leaguesLink = null
if(pathname.includes('/u')){
  leaguesLink = (
     <Nav.Link className='link nav-link' href="/u/leagues"> Leagues</Nav.Link>
  )
} else{
  leaguesLink = (
    <Nav.Link className='link nav-link' href="/leagues"> Leagues</Nav.Link>
  )
}


  

  let userButton = null
  if (isTier1 || isTier2){
    userButton = (
      <>
      <Nav.Link href='/u/users' className='link nav-link'>Users</Nav.Link>  
      <Nav.Link 
        className='link nav-link'
        onClick={() => setLogOutShow(true)} >LogOut</Nav.Link>
        </>
    )
  } else{
    userButton = (
      <Nav.Link className='link nav-link' href="/signin">Sign In</Nav.Link>
    )
  }

  const NavbarContent = (
    <>
                {leaguesLink}
                {officersLink}            
                <Nav.Link className='link nav-link' href="#action1">Media</Nav.Link>
                <Nav.Link className='link nav-link' href="#action1">Mission/Vision Statement</Nav.Link>
                {userButton}
                {/* {(!isTier1 && !isTier2) && <Nav.Link className='link nav-link' href="/signin">Sign In</Nav.Link> } */}
                {/* {(isTier1 && isTier2) && <Nav.Link className='link nav-link' href="/signin">LogOut</Nav.Link>} */}
                <LogOut show={logOutShow} onHide={()=>setLogOutShow(false)}/>
    </>
  )
    return (
        <Navbar className='NavBar' fixed='sticky' expand="lg" variant='dark' >
          <Container fluid>
          <div className='NavBar-container'>
            <Navbar.Brand href="#" className="NavBar-brand">
                {HomeButton}
              </Navbar.Brand>
              <div className='toggle-container'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='NavBar-toggle '/>
              </div>
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className=" me-auto my-2 my-lg-0"
                navbarScroll
                >
                  {NavbarContent}
              </Nav> 
            </Navbar.Collapse>
          </div>
          </Container>
        </Navbar>
      )
}

export default NavBar
