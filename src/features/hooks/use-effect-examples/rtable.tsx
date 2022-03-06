import { useState, useEffect, SetStateAction, Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns: any = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'color', label: 'Color', minWidth: 100 },
  {
    id: 'pantone_value',
    label: 'Panton Value',
    minWidth: 170,
    align: 'right',
    format: (value: string) => value.toLocaleString(),
  },
  {
    id: 'year',
    label: 'Year',
    minWidth: 170,
    align: 'right',
  },
];

function createData(name: string, code: string, population: number, size: number) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);

  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchUnknowList = ()  => {
       fetch('https://reqres.in/api/unknown')
    .then(response => response.json())
    .then(data => {
        setTableData(data.data);
    });
  };

useEffect(() => {
    // Update the document title using the browser API
    // https://reqres.in/api/unknown
    fetchUnknowList();
  },[]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: { id: Key | null | undefined; align: string | undefined; minWidth: any; label: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
                <TableCell
                  key={column.id}
                  align={column.align as 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={(row as any).code}>
                    {columns.map((column: { id: any; align: string | undefined; format: (arg0: number) => boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
                      const value = (row as any)[column.id];
                      return (
                        <TableCell key={column.id} align={column.align as 'left'}>
                          {(column as any).format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}