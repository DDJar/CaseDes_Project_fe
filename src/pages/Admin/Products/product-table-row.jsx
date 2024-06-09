import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../../components/Admin/label';
import Iconify from '../../../components/Admin/iconify';
import { getProductList } from '../../../service/ProductService';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
  // brand: PropTypes.any,
  // phoneModel: PropTypes.func,
  // quantity: PropTypes.any,
  // name: PropTypes.any,
  // price: PropTypes.any,
  // selected: PropTypes.any,
  // status: PropTypes.string,
export default function ProductTableRow({
  selected,
  productId,
  name,
  brand,
  phoneModel,
  quantity,
  price,
  isVerified,
  status,
  handleClick,
  handleClickEdit,
  handleClickDelete,
  hasComment
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
      
    }, []);
  
    const fetchData = async () => {
        try {
            const productList = await getProductList();
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    handleClickEdit("edit", productId);
  };

  const handleDelete = () => {
    handleCloseMenu();
    handleClickDelete(productId);
  }

  const openComment = () => {
    navigate(`/products/${productId}`);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{brand}</TableCell>

        <TableCell>{phoneModel}</TableCell>
        <TableCell>{quantity } </TableCell>
        <TableCell>{price}</TableCell>
        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

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
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {hasComment && 
        <MenuItem onClick={openComment}>
          <Iconify icon="fluent:comment-20-regular" sx={{ mr: 2 }} />
          Comment
        </MenuItem>}

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
  hasComment: PropTypes.any
};
