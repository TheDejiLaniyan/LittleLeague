import {useUpdateOfficerMutation, useDeleteOfficerMutation} from './officersApiSlice'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashCan } from "@fortawesome/free-solid-svg-icons"
import NavBar from "../../components/MinorComponents/NavBar"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { EditOfficerSchema } from "../../Schemas/officer/EditOfficerSchema"


const EditOfficerForm = ({officer}) => {
    const [deleteOfficer] = useDeleteOfficerMutation()
    const [updateOfficer] = useUpdateOfficerMutation()

    const navigate = useNavigate()

    const onSubmit = async (values, actions)=>{
        try{
             await updateOfficer(values).unwrap()
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

    const {values, isSubmitting,  handleBlur, errors, handleChange, touched, handleSubmit} = useFormik({
        initialValues:{
            email: officer.email,
            username:officer.username,
            league: officer.league,
            contact: officer.contact
         },
        validationSchema: EditOfficerSchema,
        onSubmit
    })

    const onDeleteOfficerClicked = async ()=>{
        await deleteOfficer({id: officer.id})
        navigate('/u/officers')
        toast.success('District Officer successfully deleted!')
    }

  return (
    <>
         <NavBar/>
        <main className="new__form-container">
          <h2 style={{textAlign: 'center'}} className='my-3'>EDIT DISTRICT OFFICER INFO</h2>
            <form onSubmit={handleSubmit} autoComplete='off' className="new__user-form">
                        <div className="form__action-buttons">
                        <button
                            className="form-icon"
                            title="Delete"
                            onClick={onDeleteOfficerClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <ToastContainer autoClose={5000}/>
                        </div>
                
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
                        type="text"
                        name="league" 
                        id="league"
                        value={values.league}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.league ? 'input-error' : 'form__input'} />
                        {errors.league && touched.league && <p className='input-feedback'>{errors.league}</p>}
                    
                <label htmlFor="contact" className="form-label"> Contact</label>
                <input 
                        type="text"
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

export default EditOfficerForm
