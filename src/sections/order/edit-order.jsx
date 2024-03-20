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
  Box,
} from '@mui/material';

import { updatedOrderById } from '../../redux/order/orderSlice';

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
    <Box>
      <header>
        <h1>Thông tin chi tiết</h1>
        <div className='info-customer'>
          <Typography>Người đặt hàng: </Typography>
          <Typography>Địa chỉ: </Typography>
          <Typography>Số điện thoại: </Typography>
          <Typography>Lời nhắn từ khách hàng: </Typography>
        </div>
      </header>
      <div>
        <h1>Sản Phẩm</h1>
        <div className='info-product'>
          <Typography>Tên sản phẩm: </Typography>
          <Typography>Mã sản phẩm: </Typography>
          <Typography>Màu sắc: </Typography>
          <Typography>Kích c��: </Typography>
          <Typography>Đơn giá: </Typography>
          <Typography>Số lượng: </Typography>
          <Typography>T��ng tiền: </Typography>
        </div>
      </div>
    </Box>
  );
}
