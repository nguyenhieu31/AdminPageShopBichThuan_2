import { useState } from 'react';
import PropTypes from 'prop-types';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'nothing', label: 'Nothing' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort({ onSelectSort }) {
    const [open, setOpen] = useState(null);
    const [select, setSelect] = useState('nothing');

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleSelectSort = (status) => {
        setSelect(status);
        onSelectSort(status); // Fix here
        handleClose();
    };

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                onClick={handleOpen}
                endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
            >
                Sort By:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {SORT_OPTIONS.find((option) => option.value === select)?.label}
                </Typography>
            </Button>

            <Menu
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            [`& .${listClasses.root}`]: {
                                p: 0,
                            },
                        },
                    },
                }}
            >
                {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} selected={option.value === select} onClick={() => handleSelectSort(option.value)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

ShopProductSort.propTypes = {
    onSelectSort: PropTypes.func,
};
