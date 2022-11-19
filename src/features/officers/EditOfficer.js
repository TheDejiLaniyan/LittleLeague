import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOfficerById } from './officersApiSlice'
import EditOfficerForm from './EditOfficerForm'
const EditOfficer = () => {
    const { id } = useParams()

    const officer = useSelector(state => selectOfficerById(state, id))

    const content = officer ? <EditOfficerForm officer={officer}  /> : <p>Loading...</p>

    return content
}
export default EditOfficer
