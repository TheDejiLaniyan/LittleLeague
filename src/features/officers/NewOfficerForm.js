import NavBar from "../../components/MinorComponents/NavBar"
import { useAddNewOfficerMutation } from "./officersApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../auth/authSlice"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { NewOfficerSchema } from "../../Schemas/officer/NewOfficerSchema"

const NewOfficerForm = () => {
    const [addNewOfficer] = useAddNewOfficerMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (values, actions)=>{
        try{
            const { accessToken } = await addNewOfficer(values).unwrap()
            dispatch(setCredentials({ accessToken }))
            actions.resetForm()
            toast.success('Successful! Please Login')
            navigate(-1)
        }catch(err){
            if (!err.status) {
                toast.error('No Server Response!')
            } else {
                toast.error(err.data?.message);
            }
        }
    }

    const {values, isSubmitting,  handleBlur, errors, handleChange, touched, handleSubmit} = useFormik({
            initialValues:{
                email: "",
                username:"",
                league:"",
                contact: ""
             },
            validationSchema: NewOfficerSchema,
            onSubmit
        })
  return (
    <>
    <NavBar/>
        <main className="new__form-container">
          <h2 style={{textAlign: 'center'}} className='my-3'>REGISTER NEW USER</h2>
            <form onSubmit={handleSubmit} autoComplete='off' className="new__user-form">
                
                <label htmlFor="username" className="form-label"> Name</label>
                <input 
                        type="text"
                        required 
                        name="username" 
                        id="username"
                        placeholder="username..."
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username ? 'input-error' : 'form__input'} />
                        {errors.username && touched.username && <p className='input-feedback'>{errors.username}</p>}
                
                <label htmlFor="email" className="form-label"> Email</label>
                <input 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="example@email.com"
                        required
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email ? 'input-error' : 'form__input'} />
                        {errors.email && touched.email && <p className='input-feedback'>{errors.email}</p>}
                
                
                <label htmlFor="league" className="form-label"> League</label>
                <input 
                        type='text'
                        required 
                        name="league" 
                        id="league"
                        value={values.league}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.league ? 'input-error' : 'form__input'} />
                        {errors.league && touched.league && <p className='input-feedback'>{errors.league}</p>}
                
                <label htmlFor="contact" className="form-label"> Contact</label>
                <input 
                        type='text'
                        required 
                        name="contact" 
                        id="contact"
                        value={values.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.contact ? 'input-error' : 'form__input'} />
                        {errors.contact && touched.contact && <p className='input-feedback'>{errors.contact}</p>}

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

export default NewOfficerForm
