import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { Paper, Stack, Select, Avatar, Button, MenuItem, InputLabel, Typography } from '@mui/material';

import updateOrder from 'src/axios/updateOrder';

export default function EditOrder() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderStatus = queryParams.get('orderStatus');
    let status;

    if (orderStatus === '0') {
        status = 'Chờ xác nhận';
    } else if (orderStatus === '1') {
        status = 'Chờ vận chuyển';
    } else if (orderStatus === '2') {
        status = 'Đang giao hàng';
    } else if (orderStatus === '3') {
        status = 'Đã giao hàng';
    }

    const statusMapping = {
        'Chờ xác nhận': 0,
        'Chờ vận chuyển': 1,
        'Đang giao hàng': 2,
        'Đã giao hàng': 3,
    };

    const [order, setOrder] = useState({
        id: (queryParams.get('orderId')),
        status,
        fullName: queryParams.get('personName'),
        address: queryParams.get('personAddress'),
        pImage: queryParams.get('productImage'),
        pName: queryParams.get('productName'),
        price: queryParams.get('productPrice'),
        quantity: parseInt(queryParams.get('productQuantity'), 10),
        size: queryParams.get('productSize'),
        color: queryParams.get('productColor'),
        phone: queryParams.get('personPhone'),
        pNote: queryParams.get('personNote'),
    });


    const handleUpdateOrder = async () => {
        try {
            if (order.status in statusMapping) {
                order.status = statusMapping[order.status];
            }
            const response = await updateOrder(order.id, order);
            console.log(response);
            if (response === 200) {
                toast.success('Đơn hàng đã được cập nhật thành công!');

                setTimeout(() => {
                    hanldeCancel();
                }, 3600);

            } else {
                toast.error('Không thể cập nhật đơn hàng. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error update order: ', error);
        }
    }

    const formik = useFormik({
        initialValues: {
            status: order.status || '',
        },
        onSubmit: () => {
            handleUpdateOrder();
        }
    });

    const handleChange = (event) => {
        const newStatus = event.target.value;

        setOrder((prevOrder) => ({
            ...prevOrder,
            status: newStatus,
        }));
        formik.setFieldValue('status', event.target.value);
    };

    const hanldeCancel = () => {
        window.history.back();
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Paper>
                <Stack>
                    <Typography variant='h5' align='center' marginBottom={3} >
                        Edit Order For {order.fullName}
                    </Typography>


                    <Stack direction='row' alignItems='center' spacing={2} marginBottom={3}>
                        <Typography variant='h6'>
                            Product Image:
                        </Typography>
                        <Avatar alt="Product Image" src={order.pImage} sx={{ width: 150, height: 150 }} variant='rounded' />

                        <Typography variant='h6'>
                            Product Name: {order.pName}
                        </Typography>

                        <Typography variant='h6'>
                            Color: {order.color}
                        </Typography>

                        <Typography variant='h6'>
                            Size: {order.size}
                        </Typography>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing={2} marginBottom={3}>
                        <Typography variant='h6'>
                            Address: {order.address}
                        </Typography>

                        <Typography variant='h6'>
                            Phone number: {order.phone}
                        </Typography>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing={2} marginBottom={3}>
                        <Typography variant='h6'>
                            Thành tiền =  {order.price} x {order.quantity} = {order.price * order.quantity}
                        </Typography>
                    </Stack>

                    <Stack direction='column' spacing={2} marginBottom={3}>
                        <Typography variant='h6'>
                            Person Note:
                        </Typography>
                        <Typography variant='body1'>
                            {order.pNote}
                        </Typography>
                    </Stack>

                </Stack>
            </Paper>
            <InputLabel htmlFor="status">
                <Stack direction='row' alignItems='center' spacing={2} marginBottom={3}>
                    <Typography variant='h6'>
                        Status:
                    </Typography>
                    <Select
                        name="status"
                        id="status"
                        onChange={handleChange}
                        value={formik.values.status}
                    >
                        <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
                        <MenuItem value="Chờ vận chuyển">Chờ vận chuyển</MenuItem>
                        <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
                        <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
                    </Select>
                </Stack>
            </InputLabel>

            <Stack direction='row' alignItems='center' spacing={2} marginBottom={3}>
                <Button style={{ backgroundColor: 'blue', color: 'white' }} type="submit">Save</Button>
                <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={hanldeCancel}>Cancel</Button>
            </Stack>
        </form >
    );
}
