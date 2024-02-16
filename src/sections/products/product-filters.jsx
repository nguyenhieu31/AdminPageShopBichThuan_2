import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
];

export const CATEGORY_OPTIONS = ['JUMBSUIT Liền Thân', 'ĐẦM DÀI', 'ĐẦM NGẮN', 'VEST', 'SET ĐỒ BỘ', 'Jean', 'All'];
export const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const PRICE_OPTIONS = [
    { value: 'below', label: 'Dưới 250.000 VNĐ' },
    { value: 'between', label: 'Giữa 250.000 VNĐ - 500.000 VNĐ' },
    { value: 'above', label: 'Trên 500.000 VNĐ' },
];
export const COLOR_OPTIONS = [
    '#000000',
    '#f6ff00',
    '#0090ff',
    '#b9c5ce',
    '#ff0000',
    '#603440',
    '#d8d8d8',
];

// ----------------------------------------------------------------------

export default function ProductFilters({ openFilter, onOpenFilter, onCloseFilter, onSelectCategory, onSelectPrice }) {
    const handleCategorySelect = (status) => {
        onSelectCategory(status);
    };

    const handlePriceSelect = (status) => {
        onSelectPrice(status.value)
    }

    const handleClearAll = (status) => {
        onSelectCategory(status)
        onSelectPrice(status)
    };


    const renderCategory = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Category</Typography>
            <RadioGroup >
                {CATEGORY_OPTIONS.map((item) => (
                    <FormControlLabel key={item} value={item} control={<Radio />} label={item} onClick={() => handleCategorySelect(item)} />
                ))}
            </RadioGroup>
        </Stack>
    );

    const renderColors = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Colors</Typography>
            <ColorPicker
                name="colors"
                selected={[]}
                colors={COLOR_OPTIONS}
                onSelectColor={(color) => [].includes(color)}
                sx={{ maxWidth: 38 * 4 }}
            />
        </Stack>
    );

    const renderPrice = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Price</Typography>
            <RadioGroup>
                {PRICE_OPTIONS.map((item) => (
                    <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        onClick={() => handlePriceSelect(item)}
                    />
                ))}
            </RadioGroup>
        </Stack>
    );

    const renderRating = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Rating</Typography>
            <RadioGroup>
                {RATING_OPTIONS.map((item, index) => (
                    <FormControlLabel
                        key={item}
                        value={item}
                        control={
                            <Radio
                                disableRipple
                                color="default"
                                icon={<Rating readOnly value={4 - index} />}
                                checkedIcon={<Rating readOnly value={4 - index} />}
                                sx={{
                                    '&:hover': { bgcolor: 'transparent' },
                                }}
                            />
                        }
                        label="& Up"
                        sx={{
                            my: 0.5,
                            borderRadius: 1,
                            '&:hover': { opacity: 0.48 },
                        }}
                    />
                ))}
            </RadioGroup>
        </Stack>
    );

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={<Iconify icon="ic:round-filter-list" />}
                onClick={onOpenFilter}
            >
                Filters&nbsp;
            </Button>

            <Drawer
                anchor="right"
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, border: 'none', overflow: 'hidden' },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 1, py: 2 }}
                >
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        Filters
                    </Typography>
                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </Stack>

                <Divider />

                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {renderCategory}

                        {renderColors}

                        {renderPrice}

                        {renderRating}
                    </Stack>
                </Scrollbar>

                <Box sx={{ p: 3 }}>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        color="inherit"
                        variant="outlined"
                        startIcon={<Iconify icon="ic:round-clear-all" />}
                        onClick={() => handleClearAll('clear')}
                    >
                        Clear All
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

ProductFilters.propTypes = {
    openFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    onSelectCategory: PropTypes.func,
    onSelectPrice: PropTypes.func,
};
