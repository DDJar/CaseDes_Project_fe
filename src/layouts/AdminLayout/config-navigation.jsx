import SvgColor from '../../../src/components/Admin/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={require(`../../assets/icons/navbar/${name}.svg`)}sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/admin/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Orders History',
    path: '/admin/orders',
    icon: icon('ic_blog'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
