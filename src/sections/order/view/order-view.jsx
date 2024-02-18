import { useState, useEffect } from 'react';

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
import fetchDataOrders from 'src/axios/fetchDataOrders';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';
import TableNoData from '../../user/table-no-data';
import OrderTableToolbar from '../order-table-toolbar';
import TableEmptyRows from '../../user/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../user/utils';

// ----------------------------------------------------------------------

export default function OrderPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderData, setOrderData] = useState([]);

  const [selectStatus, setSelectStatus] = useState(null);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClickItemOrder=(orderId)=>{
  //     const findOrderById= orderData.find((orderItem)=>orderItem.id===orderId);

  // }
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  useEffect(() => {
    const fetchOrders = async (path) => {
      try {
        const data = await fetchDataOrders(path);
        setOrderData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders('order-today');
  }, []);
  const handleStatusSelect = (prop) => {
    let check;
    switch (prop) {
      case 'Chờ xác nhận':
        check = 0;
        break;
      case 'Chờ vận chuyển':
        check = 1;
        break;
      case 'Đang giao hàng':
        check = 2;
        break;
      case 'Đã giao hàng':
        check = 3;
        break;
      default:
        break;
    }
    setSelectStatus(check);
  };

  const handleOrder = async (path) => {
    setOrderData([]);
    setSelectStatus(null);
    try {
      const data = await fetchDataOrders(path);
      setOrderData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = orderData.filter(
    (o) => selectStatus === null || o.status === selectStatus
  );

  const dataFiltered = applyFilter({
    inputData: filteredOrders,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Orders</Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={() => handleOrder('order-today')}>
            Today
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleOrder('order-7-days')}>
            7 Days
          </Button>
        </Stack>
      </Stack>

      <Card>
        <OrderTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onStatusSelect={handleStatusSelect}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  // { id: 'orderid', label: 'Order Id' },
                  { id: 'fullnameAndproduct', label: 'Full Name / Product' },
                  { id: 'code', label: 'Code' },
                  { id: 'color', label: 'Color' },
                  { id: 'size', label: 'Size' },
                  { id: 'address', label: 'Address' },
                  { id: 'price', label: 'Price' },
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'total', label: 'Total' },
                  { id: 'status', label: 'Status' },
                  { id: 'createdAt', label: 'CreatedAt' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OrderTableRow
                      key={row.orderId}
                      id={row.orderId}
                      code={row.orderCode}
                      fullName={row.fullName}
                      pImage={row.productImage}
                      pName={row.productName}
                      color={row.color}
                      size={row.size}
                      address={row.address}
                      price={row.priceUnit}
                      quantity={row.quantity}
                      status={row.status}
                      pNote={row.personNote}
                      createdAt={row.createdAt}
                      selected={selected.indexOf(row.fullName) !== -1}
                      handleClick={(event) => handleClick(event, row.fullName)}
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
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
