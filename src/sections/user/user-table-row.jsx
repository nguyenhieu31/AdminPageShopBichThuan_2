/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { updateStatusOfUser, updateStateStatusOfUser } from 'src/redux/user/user';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function UserTableRow({
  userId,
  selected,
  fullName,
  role,
  status,
  createdAt,
  updatedAt,
  handleClick,
  userName: PropUserName,
  email,
  phoneNumber,
  updatedBy,
}) {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.authentication);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleUpdateStatusOfUser = () => {
    const data = {
      id: userId,
      status: !status,
      userName,
    };
    dispatch(updateStateStatusOfUser(data));
    dispatch(updateStatusOfUser(data));
    setOpen(null);
  };
  const handleOpenAlert = () => {
    setOpen(null);
    confirmAlert({
      title: 'Vui lòng xác nhận!',
      message: `Bạn muốn thay đổi trạng thái của người dùng ${fullName}?`,
      buttons: [
        {
          label: 'Xác nhận',
          onClick: () => handleUpdateStatusOfUser(),
        },
        {
          label: 'Hủy',
          onClick: () => console.log('Hủy'),
        },
      ],
    });
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={fullName}
              src="https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png"
            />
            <Typography variant="subtitle2" noWrap>
              {fullName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{PropUserName}</TableCell>

        <TableCell>{role}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phoneNumber}</TableCell>
        {/* <TableCell align="center">{status ? 'Yes' : 'No'}</TableCell> */}

        <TableCell>
          <Label color={status ? 'success' : 'error'}>{status ? 'Đang hoạt động' : 'Bị cấm'}</Label>
        </TableCell>
        <TableCell>{createdAt}</TableCell>

        <TableCell>{updatedAt}</TableCell>
        <TableCell>{updatedBy}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleOpenAlert}
          sx={{ color: `${status ? 'error.main' : 'success.main'}` }}
        >
          <Iconify
            icon={`${status ? 'eva:minus-circle-outline' : 'eva:checkmark-circle-2-outline'}`}
            sx={{ mr: 2 }}
          />
          {status ? 'banned' : 'active'}
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  userId: PropTypes.number,
  userName: PropTypes.string,
  fullName: PropTypes.any,
  email: PropTypes.string,
  role: PropTypes.any,
  phoneNumber: PropTypes.string,
  selected: PropTypes.any,
  createdAt: PropTypes.any,
  updatedAt: PropTypes.any,
  updatedBy: PropTypes.string,
  status: PropTypes.bool,
};
