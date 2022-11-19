import {useSelector} from 'react-redux'
import {selectCurrentToken} from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'


const useAuth = () => {
  let token = useSelector(selectCurrentToken)
  let isTier2 = false
  let isTier1 = false
  let status = null

  if(token){
    const decoded = jwtDecode(token)
    const {username, roles} = decoded.UserInfo

    isTier2 = roles.includes('Tier2')
    isTier1 = roles.includes('Tier1')

    if(isTier2) status = 'Tier2'
    if(isTier1) status = 'Tier1'
    return {username, roles, status, isTier1, isTier2}
  }
  return {username:'', roles:[], isTier2, isTier1, status}

}

export default useAuth

// let token = useSelector(selectCurrentToken)
//   let isTier2 = false
//   let status = 'Tier1'

//   if(token){
//     const decoded = jwtDecode(token)
//     const {username, roles} = decoded.UserInfo

//     isTier2 = roles.includes('Tier2')

//     if(isTier2) status = 'Tier2'
//     return {username, roles, status, isTier2}
//   }
//   return {username:'', roles:[], isTier2, status}
