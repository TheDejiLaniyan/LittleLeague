import * as yup from 'yup'

const phoneRegExp = /^([0]{1})[0-9]{10}$/

export const NewOfficerSchema = yup.object().shape({
    username: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    league: yup
        .string()
        .required('League is required'),
    contact: yup
        .string()
        .matches(phoneRegExp, "Invalid phone number" )
})
