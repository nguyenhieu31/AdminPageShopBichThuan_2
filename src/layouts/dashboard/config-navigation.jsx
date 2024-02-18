import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Đơn hàng',
    path: '/order',
    icon: icon('ic_order'),
  },
  {
    title: 'Người dùng',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Sản phẩm',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Bài viết',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
