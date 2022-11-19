import * as yup from 'yup'

export const NewLeagueSchema = yup.object().shape({
    name: yup
        .string()
        .required('League name is required!'),
    location: yup
        .string()
        .required(),
    // officer: yup
    //     .string()
})