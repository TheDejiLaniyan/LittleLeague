import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLeagueById } from './leaguesApiSlice'
import EditLeagueForm from './EditLeagueForm'
const EditLeague = () => {
    const { id } = useParams()

    const league = useSelector(state => selectLeagueById(state, id))

    const content = league ? <EditLeagueForm league={league}  /> : <p>Loading...</p>

    return content
}
export default EditLeague
