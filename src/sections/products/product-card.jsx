import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
    const [open, setOpen] = useState(null);

    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleEditProduct = (productId) => {
        navigate(`/edit-product/${productId}`, { state: { product } });
    }

    // const renderStatus = (
    //     <Label
    //         variant="filled"
    //         color={(product.status === 'sale' && 'error') || 'info'}
    //         sx={{
    //             zIndex: 9,
    //             top: 16,
    //             right: 16,
    //             position: 'absolute',
    //             textTransform: 'uppercase',
    //         }}
    //     >
    //         {product.status}
    //     </Label>
    // );

    const renderImg = (
        <Box
            component="img"
            alt={product.name}
            src={product.image}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );

    const renderPrice = (
        <Typography variant="subtitle1">
            <Typography
                component="span"
                variant="body1"
                sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                }}
            >
                {/* {product.priceSale && fCurrency(product.priceSale)} */}
            </Typography>
            &nbsp;
            {fCurrency(product.price)} VNĐ
        </Typography>
    );

    return (
        <Card >
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {/* {product.status && renderStatus} */}

                {renderImg}
            </Box>


            <Stack spacing={2} sx={{ p: 1.5 }}>
                <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {product.name}
                </Link>



                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <ColorPreview colors={product.colorNames} />

                    <Stack direction="row" alignItems="center">
                        {renderPrice}

                        <IconButton onClick={handleOpenMenu} style={{ marginLeft: 10 }}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    </Stack>
                </Stack>


                <Popover
                    open={!!open}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    PaperProps={{
                        sx: { width: 140 },
                    }}
                >
                    <MenuItem onClick={() => handleEditProduct(product.productId)}>
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        Edit
                    </MenuItem>

                    <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
            </Stack>
        </Card>
    );
}

ShopProductCard.propTypes = {
    product: PropTypes.object,
};
