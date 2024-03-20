import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Menu, MenuItem } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import {handleOrder, updateStatusOrder} from '../../redux/order/orderSlice';

// ----------------------------------------------------------------------
const StyleButton= styled.div`
  display: flex;
  gap: 10px;
  &>button{
    border: none;
    background-color: #ff5630;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    color: #ffffff;
    transition: all 0.3s ease-in-out;
  }
  &>button:hover{
    background-color: #ff5630b3;
  }
`
export default function OrderTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onStatusSelect,
  selectStatus,
  selected
}) {
  const [anchorElStatus, setAnchorElStatus] = React.useState(null);
  const openMenuStatus = Boolean(anchorElStatus);

  const [anchorElTime, setAnchorElTime] = React.useState(null);
  const openMenuTime = Boolean(anchorElTime);
  const dispatch= useDispatch();
  const handleClickStatus = (event) => {
    setAnchorElStatus(event.currentTarget);
  };

  const handleCloseMenuStatus = () => {
    setAnchorElStatus(null);
  };

  const handleStatusSelect = (status) => {
    onStatusSelect(status);
    handleCloseMenuStatus();
  };
  const handleClickTime = (event) => {
    setAnchorElTime(event.currentTarget);
  };

  const handleCloseMenuTime = () => {
    setAnchorElTime(null);
  };

  const handleTimeSelect = (status) => {
    handleCloseMenuTime();
  };
  const handleClickOrder= async ()=>{
    await dispatch(handleOrder(selected));
    selected.forEach((status)=>{
      dispatch(updateStatusOrder(status));
    })
  }
  const menuStatus = [
    'Tất cả',
    'Chờ xác nhận',
    'Chờ lấy hàng',
    'Đang giao hàng',
    'Đã giao hàng',
    'Đã huỷ',
    'Trả hàng/Hoàn hàng',
  ];
  const selectTime = [
    'Tháng trước',
    'Tháng này',
    'Năm nay',
    'Năm trước',
    'Hôm nay',
    '7 ngày trước',
  ];

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          style={{ width: '400px' }}
          value={filterName}
          onChange={onFilterName}
          placeholder="Tìm kiếm theo mã đơn hàng"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {(numSelected > 0 && selectStatus===0) && (
          <StyleButton>
            <button type='button' onClick={handleClickOrder}>
              <span>Xử lý đơn hàng</span>
            </button>
          </StyleButton>
        )}
        {numSelected <= 0 && (
          <Tooltip title="filter-status">
            <IconButton
              id="positioned-button-status"
              aria-controls={openMenuStatus ? 'positioned-menu-status' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenuStatus ? 'true' : undefined}
              onClick={handleClickStatus}
            >
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
            <Menu
              id="positioned-menu-status"
              aria-labelledby="positioned-button-status"
              anchorEl={anchorElStatus}
              open={openMenuStatus}
              onClose={handleCloseMenuStatus}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {openMenuStatus &&
                menuStatus.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleStatusSelect(item)}>
                    {' '}
                    {item}{' '}
                  </MenuItem>
                ))}
            </Menu>
          </Tooltip>
        )}
        {numSelected <= 0 && (
          <Tooltip title="filter-time">
            <IconButton
              id="positioned-button-time"
              aria-controls={openMenuTime ? 'positioned-menu-time' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenuTime ? 'true' : undefined}
              onClick={handleClickTime}
            >
              <Iconify icon="eva:calendar-fill" />
            </IconButton>
            <Menu
              id="positioned-menu-time"
              aria-labelledby="positioned-button-time"
              anchorEl={anchorElTime}
              open={openMenuTime}
              onClose={handleCloseMenuTime}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {openMenuTime &&
                selectTime.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleTimeSelect(item)}>
                    {' '}
                    {item}{' '}
                  </MenuItem>
                ))}
            </Menu>
          </Tooltip>
        )}
      </Box>
    </Toolbar>
  );
}

OrderTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onStatusSelect: PropTypes.func,
  selectStatus: PropTypes.number,
  selected: PropTypes.array,
};
