import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import NavBar from "../../components/MinorComponents/NavBar"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { EditUserSchema } from "../../Schemas/user/EditUserSchema"


const EditUserForm = ({user}) => {
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const navigate = useNavigate()

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const onSubmit = async (values, actions)=>{
        try{
             await updateUser(values).unwrap()
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
            email: user.email,
            username:user.username,
            password:"",
            roles: user.role
         },
        validationSchema: EditUserSchema,
        onSubmit
    })

    const onDeleteUserClicked = async ()=>{
        await deleteUser({id: user.id})
        navigate('/u/users')
        toast.success('User successfully deleted!')
    }

  return (
    <>
         <NavBar/>
        <main className="new__form-container">
          <h2 style={{textAlign: 'center'}} className='my-3'>EDIT USER</h2>
            <form onSubmit={handleSubmit} autoComplete='off' className="new__user-form">
                        <div className="form__action-buttons">
                        <button
                            className="form-icon"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        </div>
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
                
                <label htmlFor="username" className="form-label"> Username</label>
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
                
                
                <label htmlFor="password" className="form-label"> Password</label>
                <input 
                        type="password"
                        name="password" 
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password ? 'input-error' : 'form__input'} />
                        {errors.password && touched.password && <p className='input-feedback'>{errors.password}</p>}
                    
                        <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select`}
                    size="2"
                    value={values.roles}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                </div>
            </form>
        </main>
    <ToastContainer autoClose={5000}/>
    </>
  )
}

export default EditUserForm
