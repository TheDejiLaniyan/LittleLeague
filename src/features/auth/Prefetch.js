import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { officersApiSlice } from '../officers/officersApiSlice';
import { leaguesApiSlice } from '../leagues/leaguesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const officers = store.dispatch(officersApiSlice.endpoints.getOfficers.initiate())
        const leagues = store.dispatch(leaguesApiSlice.endpoints.getLeagues.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            officers.unsubscribe()
            leagues.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch