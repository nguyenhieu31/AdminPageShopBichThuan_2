/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button, TablePagination } from '@mui/material';

// import { products } from 'src/_mock/products';

import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

// import { applyFilter } from 'src/sections/order/utils';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import { fetchProducts } from '../redux/productSlice';

// ----------------------------------------------------------------------

export default function ProductsView() {
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(8);

    const [openFilter, setOpenFilter] = useState(false);

    const [selectSort, setSelectSort] = useState('nothing');

    const [category, setCategory] = useState(null);

    const [price, setPrice] = useState(null);

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.products.isLoading)
    const isError = useSelector((state) => state.products.isError)
    const products = useSelector((state) => state.products.listProducts)

    console.log(products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])


    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const categoryMapping = {
        'JUMBSUIT Liền Thân': 1,
        'ĐẦM DÀI': 2,
        'ĐẦM NGẮN': 3,
        'VEST': 4,
        'SET ĐỒ BỘ': 5,
        'Jean': 6,
        'All': null,
        'clear': null,
    };

    const priceMapping = {
        'below': 1,
        'between': 2,
        'above': 3,
        'clear': null,
    }

    const handleSelectCategory = (prop) => {
        setCategory(categoryMapping[prop]);
    }

    const handleSelectPrice = (prop) => {
        setPrice(priceMapping[prop])
    }

    const handleSelectSort = (prop) => {
        setSelectSort(prop)
    }

    const filteredProducts = products
        .filter((p) =>
            (category === null || p.categoryId === category) &&
            (price === null ||
                (price === 1 && p.price < 250000) ||
                (price === 2 && p.price >= 250000 && p.price <= 500000) ||
                (price === 3 && p.price > 500000))
        )
        .sort((a, b) => {
            if (selectSort === 'nothing') {
                return a.productId - b.productId;
            }
            if (selectSort === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (selectSort === 'priceAsc') {
                return a.price - b.price;
            }
            if (selectSort === 'priceDesc') {
                return b.price - a.price;
            }
            return 0;
        });


    let count;

    if (isLoading) {
        count = 0;
    } else {
        count = filteredProducts ? filteredProducts.length : 0;
    }

    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" >
                    Products
                </Typography>

                <Button style={{ height: 50 }}>Thêm sản phẩm</Button>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                        onSelectCategory={handleSelectCategory}
                        onSelectPrice={handleSelectPrice}
                    />
                    <ProductSort
                        onSelectSort={handleSelectSort}
                    />
                </Stack>
            </Stack>

            {isError && (
                toast.error('Không thể tải được sản phẩm!!!')
            )}

            {isLoading && (
                <ReactLoading type="spokes" color="#ff0000" height={50} width={50} />
            )}

            {!isLoading && !isError && (
                <Grid container spacing={3}>
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <Grid key={product.productId} xs={12} sm={6} md={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="body1">Không tìm thấy sản phẩm.</Typography>
                        </Grid>
                    )}
                </Grid>
            )}
            <TablePagination
                page={page}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[8, 16, 24]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
}
