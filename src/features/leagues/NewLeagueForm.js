import NavBar from "../../components/MinorComponents/NavBar"
import { useAddNewLeagueMutation } from "./leaguesApiSlice"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { selectAllOfficers } from "../officers/officersApiSlice"
import { NewLeagueSchema } from "../../Schemas/leagues/NewLeagueSchema"

const NewLeagueForm = () => {
    const [addNewLeague] = useAddNewLeagueMutation()
    const navigate = useNavigate()
    const officers = useSelector(selectAllOfficers)

    const onSubmit = async (values, actions)=>{
        try{
            await addNewLeague(values).unwrap()
            // dispatch(setCredentials({ accessToken }))
            toast.success('Successful!')
            actions.resetForm()
            navigate(-1)
        }catch(err){
            if (!err.status) {
                toast.error('No Server Response!')
            } else {
                toast.error(err.data?.message);
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
                name:"",
                location:"",
                officer:""
             },
            validationSchema: NewLeagueSchema,
            onSubmit
        })
  return (
    <>
    <NavBar/>
        <main className="new__form-container">
          <h2 style={{textAlign: 'center'}} className='my-3'>REGISTER NEW LEAGUE</h2>
            <form onSubmit={handleSubmit} autoComplete='off' className="new__user-form">
                
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
                        type='text'
                        required 
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
                    <button type='submit' className="form__submit-button mx-3"  disabled={isSubmitting}>
                        Submit
                    </button>
                </div>
            </form>
        </main>
    <ToastContainer autoClose={5000}/>
    </>
  )
}

export default NewLeagueForm
