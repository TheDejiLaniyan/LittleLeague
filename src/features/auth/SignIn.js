import NavBar from '../../components/MinorComponents/NavBar'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import usePersist from '../../hooks/usePersist';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useFormik} from 'formik'
import { SignInSchema } from '../../Schemas/SignInSchema'

const SignIn = () => {
    const location = useLocation()
    const [persist, setPersist] = usePersist()
    const userRef = useRef()  

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()

    const onSubmit = async (values, actions)=>{
        try{
            const { accessToken } = await login(values).unwrap()
            dispatch(setCredentials({ accessToken }))
            navigate(`/u`)
            actions.resetForm()
        }catch(err){
            if (!err.status) {
                console.log('No Server Response!')
            } else if(err.status === 401){
                console.log('Unauthorized')
            }
        }
    }

    const handleToggle = () => setPersist(prev => !prev)
    const {values, isSubmitting, setSubmitting, handleBlur, errors, handleChange, touched, handleSubmit} = useFormik({
        initialValues:{
            password:"",
            email:""
         },
        validationSchema: SignInSchema,
        onSubmit
    })

    if (isSubmitting) return <p>Loading...</p>


  return (
    <>
        <NavBar/>
        <main className="form-container">
            <h1 className='form-text'>SIGN IN</h1>
                <form className="form " onSubmit={handleSubmit}>
                    {/* <label htmlFor="username">Username:</label>
                    <input
                        className={errors.username ? 'input-error' : 'form__input'}
                        type="text"
                        id="username"
                        ref={userRef}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                    {errors.username && touched.username && <p className='input-feedback'>{errors.username}</p>} */}

                    <label htmlFor="email">Email:</label>
                    <input
                        className={errors.email ? 'input-error' : 'form__input'}
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.email && touched.email && <p className='input-feedback'>{errors.email}</p>}

                    <label htmlFor="password">Password:</label>
                    <input
                        className={errors.password ? 'input-error' : 'form__input'}
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                        required
                    />
                    {errors.password && touched.password && <p className='input-feedback'>{errors.password}</p>}
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className="form__submit-button mb-3" type='submit' disabled={isSubmitting}>
                            Sign In</button>
                    </div>

                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Remember Me
                    </label>
                </form>
        </main>
    </>
    
  )
}

export default SignIn
