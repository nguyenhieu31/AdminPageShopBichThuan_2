import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import deleteOrderById from 'src/axios/deleteOrderById';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
// ----------------------------------------------------------------------

export default function OrderTableRow({
    selected,
    id,
    fullName,
    pImage,
    pName,
    color,
    size,
    address,
    phone,
    price,
    quantity,
    status,
    handleClick,
}) {
    const [open, setOpen] = useState(null);

    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleDeleteOrderById = async (orderId) => {
        try {
            const response = await deleteOrderById(orderId);
            if (response === 200) {
                toast.success('Đơn hàng đã được xóa thành công!');

                setTimeout(() => {
                    window.location.reload();
                }, 3100);
            } else {
                toast.error('Không thể xóa đơn hàng. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error deleting order: ', error.message);
        }
    };

    const handleEditOrder = (orderId, personName, productImage, productName, productColor, productSize, personAddress, personPhone, productPrice, productQuantity, orderStatus) => {
        const queryParams = {
            orderId,
            personName,
            productImage,
            productName,
            productColor,
            productSize,
            personAddress,
            personPhone,
            productPrice,
            productQuantity,
            orderStatus
        }

        navigate({
            pathname: `/edit-order/${orderId}`,
            search: new URLSearchParams(queryParams).toString(),
        });
    }

    const getStatusLabel = (check) => {
        switch (check) {
            case 0:
                return 'Chờ xác nhận';
            case 1:
                return 'Chờ vận chuyển';
            case 2:
                return 'Đang giao hàng';
            case 3:
                return 'Đã giao hàng';
            default:
                return 'Không xác định';
        }
    };
    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={pName} src={pImage} />
                        <Stack>
                            <Typography variant="subtitle2" noWrap>
                                {fullName}
                            </Typography>
                            <Typography variant="subtitle2" noWrap>
                                {pName}
                            </Typography>
                        </Stack>
                    </Stack>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {color}
                    </Typography>
                </TableCell>

                <TableCell>{size}</TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {address}
                    </Typography>
                </TableCell>

                <TableCell>{phone}</TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {price} VNĐ
                    </Typography>
                </TableCell>

                <TableCell align="center">{quantity}</TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {price * quantity} VNĐ
                    </Typography>
                </TableCell>

                <TableCell>
                    <Label color={status === '0' ? 'error' : 'success'}>{getStatusLabel(status)}</Label>
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow >

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={() => handleEditOrder(id, fullName, pImage, pName, color, size, address, phone, price, quantity, status)}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={() => handleDeleteOrderById(id)} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}

OrderTableRow.propTypes = {
    id: PropTypes.number,
    fullName: PropTypes.string,
    pImage: PropTypes.any,
    handleClick: PropTypes.func,
    pName: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    selected: PropTypes.any,
    address: PropTypes.string,
    phone: PropTypes.string,
    price: PropTypes.any,
    quantity: PropTypes.any,
    status: PropTypes.number,
};
