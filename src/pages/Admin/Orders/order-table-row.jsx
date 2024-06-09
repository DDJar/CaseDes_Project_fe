import { useState, useEffect ,useCallback} from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../../components/Admin/iconify';
import { getUserById } from '../../../service/UserService';
export default function ProductTableRow({
  selected,
  orderId,
  userId,
  totalPrice,
  cartItems,
  handleClick,
  handleClickEdit,
  handleClickDelete,
  handleOpenCartItemsModal,
}) {
  
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId]);
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    handleClickEdit("edit", orderId);
  };

  const handleDelete = () => {
    handleCloseMenu();
    handleClickDelete(orderId);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="" src={user?.imgAvt} />
            <Typography variant="subtitle2" noWrap>
              {user?.firstName} {" "} {user?.lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{orderId}</TableCell>
        <TableCell>{totalPrice}</TableCell>

        <TableCell align="right">
          <button 
            type="button" 
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => handleOpenCartItemsModal(cartItems)}>
            View Cart
          </button>
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
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProductTableRow.propTypes = {
  productId: PropTypes.any,
  brand: PropTypes.any,
  phoneModel: PropTypes.any,
  quantity: PropTypes.any,
  name: PropTypes.any,
  price: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
