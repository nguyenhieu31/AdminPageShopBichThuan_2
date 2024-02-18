import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Paper,
  Stack,
  Select,
  Avatar,
  Button,
  MenuItem,
  InputLabel,
  Typography,
} from '@mui/material';

import { updatedOrderById } from './redux/orderSlice';

export default function EditOrder() {
  const { state } = useLocation();
  const { order } = state;
  const dispatch = useDispatch();

  const statusMapping = {
    0: 'Chờ xác nhận',
    1: 'Chờ vận chuyển',
    2: 'Đang giao hàng',
    3: 'Đã giao hàng',
  };

  const statusMappingUpdate = {
    'Chờ xác nhận': 0,
    'Chờ vận chuyển': 1,
    'Đang giao hàng': 2,
    'Đã giao hàng': 3,
  };

  const handleUpdateOrder = async () => {
    try {
      const orderDTO = {
        status: statusMappingUpdate[formik.values.status],
      };
      const response = await dispatch(updatedOrderById({ orderId: order.orderId, orderDTO }));

      if (updatedOrderById.fulfilled.match(response)) {
        toast.success('Đơn hàng đã được cập nhật thành công!');

        setTimeout(() => {
          hanldeCancel();
        }, 3600);
      }
    } catch (error) {
      console.error('Error update order: ', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      status: statusMapping[order.status] || '',
    },
    onSubmit: () => {
      handleUpdateOrder();
    },
  });

  const handleChange = (event) => {
    const newStatus = event.target.value;

    formik.setFieldValue('status', newStatus);
  };

  const hanldeCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper>
        <Stack>
          <Typography variant="h5" align="center" marginBottom={3}>
            Edit Order For {order.fullName}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
            <Typography variant="h6">Product Image:</Typography>
            <Avatar
              alt="Product Image"
              src={order.productImage}
              sx={{ width: 150, height: 150 }}
              variant="rounded"
            />

            <Typography variant="h6">Product Name: {order.productName}</Typography>

            <Typography variant="h6">Color: {order.color}</Typography>

            <Typography variant="h6">Size: {order.size}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
            <Typography variant="h6">Address: {order.address}</Typography>

            <Typography variant="h6">Phone number: {order.phone}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
            <Typography variant="h6">
              Thành tiền = {order.priceUnit} x {order.quantity} = {order.priceUnit * order.quantity}
            </Typography>
          </Stack>

          <Stack direction="column" spacing={2} marginBottom={3}>
            <Typography variant="h6">Person Note:</Typography>
            <Typography variant="body1">{order.personNote}</Typography>
          </Stack>
        </Stack>
      </Paper>
      <InputLabel htmlFor="status">
        <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
          <Typography variant="h6">Status:</Typography>
          <Select name="status" id="status" onChange={handleChange} value={formik.values.status}>
            <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
            <MenuItem value="Chờ vận chuyển">Chờ vận chuyển</MenuItem>
            <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
            <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
          </Select>
        </Stack>
      </InputLabel>

      <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
        <Button style={{ backgroundColor: 'blue', color: 'white' }} type="submit">
          Save
        </Button>
        <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={hanldeCancel}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
}
