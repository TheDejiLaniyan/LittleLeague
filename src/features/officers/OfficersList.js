import { useGetOfficersQuery } from "./officersApiSlice"
import Officer from "./Officer"
import NavBar from "../../components/MinorComponents/NavBar"
import useAuth from "../../hooks/useAuth"

const OfficersList = () => {
    const {isTier1, isTier2} = useAuth()
    const {
        data: officers, isLoading, isSuccess, isError, error
    } = useGetOfficersQuery(undefined, {
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

        const { ids } = officers

        const tableContent = ids?.length
            ? ids.map(officerId => <Officer key={officerId} officerId={officerId} />)
            : null

            let officeTable = null
if(isTier1 || isTier2){
    officeTable =(
        <table className="officers-table-auth">
        <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th user-head">Name</th>
                <th scope="col" className="table__th user-head">Email</th>
                <th scope="col" className="table__th user-head">League</th>
                <th scope="col" className="table__th user-head">Contact</th>
                <th scope="col" className="table__th user-head">Edit</th>
            </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </table>    )
} else{
    officeTable=(
        <table className="officers-table">
        <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th user-head">Name</th>
                <th scope="col" className="table__th user-head">Email</th>
                <th scope="col" className="table__th user-head">League</th>
                <th scope="col" className="table__th user-head">Contact</th>
            </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </table>    )
}

        content = (
            
            <>
                <NavBar/>
                    <h1 className="my-3 user" style={{textAlign: 'center'}}>
                        DISTRICT OFFICERS</h1>
                <div className="officers-form">
                        {officeTable}              
                </div>
                    {
                       (isTier1 || isTier2) &&
                       <div className="new-button-container">
                    <button  className="new-button" >
                        <a href='/u/officers/new' style={{textDecoration: 'none', color: 'white'}}>
                        Create New Officers
                        </a>
                    </button>
                    </div>
                    }
            </>
        )
    }

    return content
}
export default OfficersList