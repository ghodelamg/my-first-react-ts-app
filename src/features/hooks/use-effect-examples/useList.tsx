import { SetStateAction, useEffect, useState } from "react";

export const useList = () => {
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
    fetchUnknowList();
  },[]);

  return {tableData, handleChangePage, page, handleChangeRowsPerPage, rowsPerPage};
}