import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function DataTable(data) {
    return (
        <div><TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, maxHeight : 551, overflowY : 'scroll' }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">User Name</TableCell>
                        <TableCell align="center">Reading %</TableCell>
                        <TableCell align="center">Open Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.data.length !== 0 && data.data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {row.userName}
                            </TableCell>
                            <TableCell align="center">{row.track}</TableCell>
                            <TableCell align="center">{row.openCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></div>
    )
}

export default DataTable