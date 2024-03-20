import { toast } from 'react-toastify';
// import ReactLoading from 'react-loading';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';
import TableNoData from '../../user/table-no-data';
import OrderTableToolbar from '../order-table-toolbar';
import TableEmptyRows from '../../user/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../user/utils';
import { fetchDataOrders,getDataByStatusOrder } from '../../../redux/order/orderSlice';

// ----------------------------------------------------------------------

export default function OrderPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectStatus, setSelectStatus] = useState(null);
  const [loadStatus, setLoadStatus] = useState(null);

  const dispatch = useDispatch();
  const {isError, listOrders} = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchDataOrders('order/all'));
  }, [dispatch]);

  useEffect(()=>{
    if(selectStatus || selectStatus===0){
      dispatch(getDataByStatusOrder(selectStatus));
    }
  },[dispatch, selectStatus])

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listOrders.map((orderItem) => orderItem.orderCode);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name,statusOrder) => {
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
    setLoadStatus(statusOrder)
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

  const handleStatusSelect = (prop) => {
    let check;
    console.log(prop);
    switch (prop) {
      case 'Tất cả':
        check = 6
        break;
      case 'Chờ xác nhận':
        check = 0;
        break;
      case 'Chờ lấy hàng':
        check = 1;
        break;
      case 'Đang giao hàng':
        check = 2;
        break;
      case 'Đã giao hàng':
        check = 3;
        break;
        case 'Đã Huỷ':
          check = 4;
          break;
      case 'Trả hàng/hoàn hàng':
        check = 5;
        break;
      default:
        break;
    }
    setSelectStatus(check);
  };
  const handleTimeSelect = ()=>{
    
  }
  const dataFiltered = applyFilter({
    inputData: listOrders,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  console.log(selected);
  const notFound = !dataFiltered.length && !!filterName;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Orders</Typography>
      </Stack>

      <Card>
        <OrderTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onStatusSelect={handleStatusSelect}
          selectStatus={selectStatus || loadStatus}
          selected={selected}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={order}
                orderBy={orderBy}
                rowCount={listOrders&&listOrders.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'fullnameAndproduct', label: 'Tên Người đặt / sản phầm' },
                  { id: 'code', label: 'Mã đơn hàng' },
                  { id: 'color', label: 'Màu sắc' },
                  { id: 'size', label: 'Kích cỡ' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'price', label: 'Giá sản phẩm' },
                  { id: 'quantity', label: 'Số lượng' },
                  { id: 'total', label: 'Tổng tiền' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: 'createdAt', label: 'Ngày đặt' },
                  { id: '' },
                ]}
              />
              {isError && toast.error('Không thể tải được sản phẩm!!!')}
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OrderTableRow
                      key={row.orderId}
                      order={row}
                      selected={selected.indexOf(row.orderCode) !== -1}
                      handleClick={() => handleClick(row.orderCode,row.status)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
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
