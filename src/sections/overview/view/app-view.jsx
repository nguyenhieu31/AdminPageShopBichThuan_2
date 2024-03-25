import { format } from 'date-fns';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchDataToday } from 'src/redux/overview/overviewSlice';

import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// ----------------------------------------------------------------------

export default function AppView() {
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();

    const isError = useSelector((state) => state.datatoday.isError)
    const datatodays = useSelector((state) => state.datatoday.dataToday)

    useEffect(() => {
        dispatch(fetchDataToday());
    }, [dispatch])

    const generateLabels = () => {
        const labels = [];
        for (let i = 1; i <= 12; i += 1) {
            const dateString = format(new Date(currentYear, i - 1, 1), 'MM/dd/yyyy');
            labels.push(dateString);
        }
        return labels;
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Số Liệu Của Ngày Hôm Nay
            </Typography>

            {isError && (
                toast.error('Không thể tải được dữ liệu!!!')
            )}

            <Grid container spacing={6}>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Doanh Thu"
                        total={datatodays.total_income}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Số Người Đăng Kí"
                        total={datatodays.quantity_person_register}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Số Đơn Đặt Hàng"
                        total={datatodays.quantity_orders}
                        color="warning"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={12}>
                    <AppWebsiteVisits
                        title="Số Liệu Của Store"
                        chart={{
                            labels: generateLabels(),
                            series: [
                                {
                                    name: 'Người Đăng Kí',
                                    type: 'column',
                                    fill: 'solid',
                                    data: datatodays.quantity_users_in_chart,
                                },
                                {
                                    name: 'Đơn Đặt Hàng',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: datatodays.quantity_orders_in_chart,
                                },
                            ],
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
