import NavBar from './MinorComponents/NavBar'
import UpcomingEvents from './MinorComponents/UpcomingEvents'
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
import useAuth from '../hooks/useAuth'
import Logo from '../Images/LITTLELEAGUE2.jpg'



const HomePage = () => {
    const {username} = useAuth()
  return (
    <>
            <NavBar/>
            <header className='Home-header'>
                <Image src={Logo} alt='Little league logo' className='header-logo' style={{color: 'white'}}/>
                <h2>
                    LITTLE LEAGUE NIGERIA: SOUTH-WEST DISTRICT
                </h2>
            </header>
        <div className="body-container">
            <div className="body">
                <div className="body-main">
                    <div className="column-1">
                        <div className="body-table">
                        <div>
                            <h4 className='mt-4' >Upcoming Events</h4 >
                                <UpcomingEvents/>  
                        </div>
                        </div>
                        <div>
                            
                        </div>

                    </div>
                    <div className='column-2'>
                        <div className='visit-facebook'>
                            <p href='#' className='link'>
                                VISIT AND 'LIKE' OUR FACEBOOK PAGE
                                <FontAwesomeIcon className='mx-3' icon={faArrowRight}/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}



export default HomePage