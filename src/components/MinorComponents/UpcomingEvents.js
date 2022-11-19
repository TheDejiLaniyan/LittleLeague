import { Table } from "react-bootstrap"

const UpcomingEvents = () => {
  return (
    <Table striped bordered hover className="table">
                            <thead className="">
                                <tr>
                                <th >Date</th>
                                <th >Activity</th>
                                <th >Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td >Mark</td>
                                <td >Otto</td>
                                <td >@mdo</td>
                                </tr>
                                <tr>
                                <td >Jacob</td>
                                <td >Thornton</td>
                                <td >@fat</td>
                                </tr>
                                <tr>
                                <td >@twitter</td>
                                <td >@twitter</td>
                                <td >@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
  )
}

export default UpcomingEvents
