import {useUpdateLeagueMutation, useDeleteLeagueMutation} from './leaguesApiSlice'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useParams } from 'react-router-dom'
import { selectLeagueById } from './leaguesApiSlice'
import NavBar from "../../components/MinorComponents/NavBar"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectAllOfficers } from "../officers/officersApiSlice"
import {useFormik} from 'formik'
import { EditLeagueSchema } from "../../Schemas/leagues/EditLeagueSchema"
import {  useSelector } from "react-redux"


const EditLeagueForm = () => {
    const { id } = useParams()

    const league = useSelector(state => selectLeagueById(state, id))
    const [deleteLeague] = useDeleteLeagueMutation()
    const [updateLeague] = useUpdateLeagueMutation()
    const officers = useSelector(selectAllOfficers)


    const navigate = useNavigate()

    const onSubmit = async (values, actions)=>{
        try{
             await updateLeague(values).unwrap()
            // dispatch(setCredentials({ accessToken }))
            actions.resetForm()
            toast.success('Successful!')
            navigate(-1)
        }catch(err){
            if (!err.status) {
                toast.error('No Server Response!')
            } else if (err.status === 409){
                toast.error('Duplicate Name, please change it');
            }
        }
    }

    const options = officers.map(officer => {
        return (
            <option
                key={officer.id}
                value={officer.id}
            > {officer.username}</option >
        )
    })

    const {values, isSubmitting,  handleBlur, errors, handleChange, touched, handleSubmit} = useFormik({
        initialValues:{
            // email: league.email,
            name:league.name,
            location: league.location,
            officer: league.officer
         },
        validationSchema: EditLeagueSchema,
        onSubmit
    })

    const onDeleteLeagueClicked = async ()=>{
        await deleteLeague({id: league.id})
        navigate('/u/leagues')
        toast.success('District League successfully deleted!')
    }

    
  return (
    <>
    <NavBar/>
   <main className="new__form-container">
     <h2 style={{textAlign: 'center'}} className='my-3'>EDIT LEAGUE INFO</h2>
     <form onSubmit={handleSubmit} autoComplete='off' className="new__user-form">
                <div className="form__action-buttons">
                <button
                    className="form-icon"
                    title="Delete"
                    onClick={onDeleteLeagueClicked}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <ToastContainer autoClose={5000}/>
                </div>

                <label htmlFor="name" className="form-label"> Name</label>
                <input 
                        type="text"
                        required 
                        name="name" 
                        id="name"
                        placeholder="name..."
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.name ? 'input-error' : 'form__input'} />
                        {errors.name && touched.name && <p className='input-feedback'>{errors.name}</p>}


            <label htmlFor="location" className="form-label"> Location</label>
            <input 
                    type="text"
                    name="location" 
                    id="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.location ? 'input-error' : 'form__input'} />
                    {errors.location && touched.location && <p className='input-feedback'>{errors.location}</p>}
                
                <select
                name="officer"
                value={values.officer}
                onChange={handleChange}
                >
                    {options}
                 </select>
            

        <div className="my-3" >
            <button className="form__back-button mx-3" onClick={()=> navigate(-1)} >
                Back
            </button>
            <button type="submit" className="form__submit-button mx-3"  disabled={isSubmitting}>
                Submit
            </button>
            <ToastContainer autoClose={5000}/>
        </div>
        </form>
   </main>
    </>
  )
}

export default EditLeagueForm
