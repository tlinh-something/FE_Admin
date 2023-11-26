import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/user/table-no-data';
import UserTableRow from 'src/sections/user/user-table-row';
import UserTableHead from 'src/sections/user/user-table-head';
import TableEmptyRows from 'src/sections/user/table-empty-rows';
import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from 'src/sections/user/utils';
import axios from 'axios';
import CourseTableRow from './course-table-row';

// ----------------------------------------------------------------------

export default function CoursePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [storeID, setStoreID] = useState(0);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  console.log(storeID);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleClick = (event, id) => {
    axios.delete(`http://167.172.92.40:8080/api/instructor/${id}`);
  };

  const [ins, setIns] = useState([]);
  const fetchIns = () => {
    axios.get('http://167.172.92.40:8080/api/allCourses').then((res) => {
      setIns(res.data);
    });
  };
  useEffect(() => {
    fetchIns();
    handleClick();
  }, []);
  const dataFiltered = applyFilter({
    inputData: ins,

    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Courses</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'avatar', label: 'Image' },

                  { id: 'name', label: 'Course Name' }, // { id: 'role', label: 'Role' },
                  // { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'upload_date', label: 'Upload Date' },
                  { id: 'description', label: 'Description' },
                  { id: 'price', label: 'Price' },

                  { id: 'status', label: 'Status' },
                  { id: 'action', label: 'Action' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CourseTableRow
                      id={row.courseID}
                      key={row.id}
                      avatar={row.avatar}
                      name={row.name}
                      date={row.upload_date}
                      description={row.description}
                      price={row.price}
                      status={row.status}
                      courseStatus={row.courseStatus}
                      action={row.id}
                      fetch={fetchIns}
                      // handleClick={(event) => {
                      //   handleClick(event, row.id);
                      // }}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={ins.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
