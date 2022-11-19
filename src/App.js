import './index.css'
import './index-min.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import Layout from './components/Layout'
import SignIn from './features/auth/SignIn'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin'
import UsersList from './features/users/UsersList'
import RequireAuth from './features/auth/RequireAuth';
import {ROLES} from './config/roles'
import AuthHomePage from './components/AuthHomePage'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import OfficersList from './features/officers/OfficersList'
import NewOfficerForm from './features/officers/NewOfficerForm'
import EditOfficer from './features/officers/EditOfficer'
import LeaguesList from './features/leagues/LeaguesList'
import NewLeagueForm from './features/leagues/NewLeagueForm'
import EditLeagueForm from './features/leagues/EditLeagueForm'

const App = () => (
  <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='signin' element={<SignIn/>}/>

          <Route path='officers'>
            <Route index element={<OfficersList/>}/>
          </Route>

          <Route path='leagues'>
            <Route index element={<LeaguesList/>}/>
          </Route>

          <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Tier1, ROLES.Tier2]}/>}>
                <Route element={<Prefetch/>}>
                    <Route path='u'>
                      <Route index element={<AuthHomePage/>}/>

                      <Route path='users'>
                        <Route index element={<UsersList/>}/>
                        <Route path='new' element={<NewUserForm/>}/>
                        <Route path=':id' element={<EditUser/>}/>
                      </Route>

                      <Route path='officers'>
                        <Route index element={<OfficersList/>}/>
                        <Route path='new' element={<NewOfficerForm/>}/>
                        <Route path=':id' element={<EditOfficer/>}/>
                      </Route>

                      <Route path='leagues'>
                        <Route index element={<LeaguesList/>}/>
                        <Route path='new' element={<NewLeagueForm/>}/>
                        <Route path=':id' element={<EditLeagueForm/>}/>
                      </Route>
                  
                    </Route>
                </Route>
              </Route>
          </Route>
        </Route>

      </Routes>
  </>
)

export default App;
