import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';

// ----------------------------------------------------------------------

export default function OrderTableRow({ selected, order, handleClick }) {
  const navigate = useNavigate();

  const handleEditOrder = (orderId) => {
    navigate(`/edit-order/${orderId}`, { state: { order } });
  };

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
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={order.productName} src={order.productImage} />
          <Stack>
            <Typography variant="subtitle2" noWrap>
              {order.fullName}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {order.productName}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2" noWrap>
          {order.code}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" noWrap>
          {order.color}
        </Typography>
      </TableCell>

      <TableCell>{order.size}</TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {order.address}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {order.priceUnit} VNĐ
        </Typography>
      </TableCell>

      <TableCell align="center">{order.quantity}</TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {order.priceUnit * order.quantity} VNĐ
        </Typography>
      </TableCell>

      <TableCell>
        <Label color={order.status === '0' ? 'error' : 'success'}>
          {getStatusLabel(order.status)}
        </Label>
      </TableCell>
      <TableCell>
        <Typography variant="body2" noWrap>
          {order.createdAt}
        </Typography>
      </TableCell>
      <TableCell>
        <MenuItem onClick={() => handleEditOrder(order.orderId)}>
          <Iconify icon="eva:edit-fill" />
        </MenuItem>
      </TableCell>
    </TableRow>
  );
}

OrderTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  order: PropTypes.object,
};
