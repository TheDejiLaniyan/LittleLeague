import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectOfficerById } from './officersApiSlice'

const Officer = ({ officerId }) => {
    const officer = useSelector(state => selectOfficerById(state, officerId))
    const {isTier1, isTier2} = useAuth()
    const navigate = useNavigate()
    

    if (officer) {
        const handleEdit = () => navigate(`/u/officers/${officerId}`)

        let officerTable = null
    if(isTier1 || isTier2){
        officerTable =(
                  <>
                   <td className={`table__cell `}>{officer.username}</td>
                <td className={`table__cell `}>{officer.email}</td>
                <td className={`table__cell `}>{officer.league}</td>
                <td className={`table__cell `}>{officer.contact}</td>
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
           officerTable = (
            <>
            <td className={`table__cell `}>{officer.username}</td>
           <td className={`table__cell `}>{officer.email}</td>
           <td className={`table__cell `}>{officer.league}</td>
           <td className={`table__cell `}>{officer.contact}</td>
       </>
           )
    }

        return (
            <>
             {/* <tr className="user"> */}
                      {officerTable}      
             {/* </tr> */}
            </>
        )

    } else return null
}
export default Officer