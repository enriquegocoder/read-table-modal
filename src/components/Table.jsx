import './Table.css';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";


export const Table = ({ rows, deleteRow, editRow }) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Page</th>
                        <th className='expand'>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        // console.log('Table-row', row);
                        // console.log('Table row.idx, idx, row.pageid', rows[idx].pageid, idx, row.pageid);
                        const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
                        return (
                            <tr key={idx}>
                                <td>{row.page}</td>
                                <td className='expand'>{row.description}</td>
                                <td className={`label label-${row.status}`}>{statusText}</td>
                                <td>
                                    <span className='actions'>
                                        <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(idx)} />
                                        <BsFillPencilFill onClick={() => editRow(idx)} />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
