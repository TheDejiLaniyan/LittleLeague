import * as yup from 'yup'

export const EditUserSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        // .required('Password is required')

})