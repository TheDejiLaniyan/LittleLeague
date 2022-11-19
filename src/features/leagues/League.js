import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectLeagueById } from './leaguesApiSlice'

const League = ({ leagueId }) => {
    const league = useSelector(state => selectLeagueById(state, leagueId))
    const {isTier1, isTier2} = useAuth()
    const navigate = useNavigate()
    

    if (league) {
        const handleEdit = () => navigate(`/u/leagues/${leagueId}`)

        let leagueTable = null
    if(isTier1 || isTier2){
        leagueTable =(
                  <>
                   <td className={`table__cell `}>{league.name}</td>
                <td className={`table__cell `}>{league.location}</td>
                <td className={`table__cell `}>{league.username}</td>
                <td className={`table__cell `}> 
                    <button
                        className="users-form__button"
                        onClick={handleEdit}
                        >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
                  </>
                    )
    } else{
           leagueTable = (
            <>
            <td className={`table__cell `}>{league.name}</td>
           <td className={`table__cell `}>{league.location}</td>
           <td className={`table__cell `}>{league.username}</td>
       </>
           )
    }

        return (
            <>
             {/* <tr className="user"> */}
                      {leagueTable}      
             {/* </tr> */}
            </>
        )

    } else return null
}
export default League