import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import NavBar from "../../components/MinorComponents/NavBar"

const UsersList = () => {

    const {
        data: users, isLoading, isSuccess, isError, error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            
            <>
                <NavBar/>
                    
                <div className="users-form">
                <table className="users-table">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user-head">Username</th>
                        <th scope="col" className="table__th user-head">Roles</th>
                        <th scope="col" className="table__th user-head">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
                </div>
                    <div className="new-button-container">
                    <button  className="new-button" >
                        <a href='/u/users/new' style={{textDecoration: 'none', color: 'white'}}>
                        Create New Users
                        </a>
                    </button>
                    </div>
            </>
        )
    }

    return content
}
export default UsersList