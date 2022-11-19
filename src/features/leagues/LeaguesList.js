import {useGetLeaguesQuery} from './leaguesApiSlice'
import League from './League'
import NavBar from "../../components/MinorComponents/NavBar"
import useAuth from "../../hooks/useAuth"

const LeaguesList = () => {
    const {isTier1, isTier2} = useAuth()
    const {
        data: leagues, isLoading, isSuccess, isError, error
    } = useGetLeaguesQuery(undefined, {
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

        const { ids } = leagues

        const tableContent = ids?.length
            ? ids.map(leagueId => <League key={leagueId} leagueId={leagueId} />)
            : null

            let leagueTable = null
if(isTier1 || isTier2){
    leagueTable =(
        <table className="leagues-table-auth">
        <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th user-head">Name</th>
                <th scope="col" className="table__th user-head">Location</th>
                <th scope="col" className="table__th user-head">District Officer</th>
                <th scope="col" className="table__th user-head">Edit</th>
            </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </table>    )
} else{
    leagueTable=(
        <table className="leagues-table">
        <thead className="table__thead">
            <tr>
            <th scope="col" className="table__th user-head">Name</th>
                <th scope="col" className="table__th user-head">Location</th>
                <th scope="col" className="table__th user-head">District Officer</th>
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
                        LEAGUES</h1>
                <div className="officers-form">
                        {leagueTable}              
                </div>
                    {
                        (isTier1 || isTier2) &&
                        <div className="new-button-container">
                    <button  className="new-button" >
                        <a href='/u/leagues/new' style={{textDecoration: 'none', color: 'white'}}>
                        Create New Leagues
                        </a>
                    </button>
                    </div>
                    }
            </>
        )
    }

    return content
}
export default LeaguesList