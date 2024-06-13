import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import Iconify from "../../../../components/Admin/iconify";
import TableNoData from "../table-no-data";
import OrderTableRow from "../order-table-row";
import OrderTableHead from "../order-table-head";
import TableEmptyRows from "../table-empty-rows";
import OrderTableToolbar from "../order-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  getProductById,
} from "../../../../service/ProductService";
import { GetCartOrder } from "../../../../service/CartOrderService";
// ----------------------------------------------------------------------

export default function ProductPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [isCreate, setIsCreate] = useState(true);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openCartItemsModal, setOpenCartItemsModal] = useState(false);

  const [orders, setOrders] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [productData, setProductData] = useState({});

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const orderList = await GetCartOrder();
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.price = {
      amount: parseFloat(formJson.amount),
      currency: formJson.currency,
    };
    delete formJson.amount;
    delete formJson.currency;

    formJson.images = formJson.images.split(",").map((url) => url.trim());

    if(isCreate) {
      try {
        const response = await CreateProduct(
          formJson.name,
          formJson.brand,
          formJson.phoneModel,
          formJson.quantity,
          formJson.price,
          formJson.status,
          formJson.inventory,
          formJson.description,
          formJson.images,
          formJson.material,
          formJson.bought
        );
        fetchData();
        handleCloseEditModal();
      } catch (error) {
        console.error("Error saving product:", error);
      }
    } else {
      try {
        const response = await UpdateProduct(
          productData._id,
          formJson.name,
          formJson.brand,
          formJson.phoneModel,
          formJson.quantity,
          formJson.price,
          formJson.status,
          formJson.inventory,
          formJson.description,
          formJson.images,
          formJson.material,
          formJson.bought
        );

        fetchData();
        handleCloseEditModal();
      } catch (error) {
        console.error("Error saving product:", error);
      }
    }
  };
  const handleOpenEditModal = (createOrEdit, productId) => {
    let productData  = orders.find((product) => product._id === productId);
    setProductData(productData);
    setOpenEditModal(true);
    setIsCreate(createOrEdit === "create" ? true : false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId); // Cập nhật selectedProductId với giá trị productId truyền vào
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: orders,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleConfirmDelete = async () => {
    try {
      await DeleteProduct(selectedProductId);
      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOpenCartItemsModal = async (items) => {
    const updatedItems = await Promise.all(items.map(async (item) => {
      const product = await getProductById(item.productId);
      item.name = product.name;
      item.price = product.price.amount;
      item.currency = product.price.currency;
      return item;
    }));
    setCartItems(updatedItems);
    setOpenCartItemsModal(true);
  }

  const handleCloseCartItemsModal = () => {
    setOpenCartItemsModal(false);
  }
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      {/* DELETE MODAL */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm delete product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="inherit">
            Cancel
          </Button>
          <LoadingButton
            size="large"
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* EDIT, CREATE MODAL */}
      <Dialog
        sx={{ p: 5, width: 1 }}
        open={openEditModal}
        onClose={handleCloseEditModal}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit(event);
            handleCloseEditModal();
          },
        }}
      >
        <DialogTitle>
          {isCreate ? "Create Product" : "Edit Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            defaultValue={isCreate ? '' : productData.name}
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="brand"
            defaultValue={isCreate ? '' : productData.brand}
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="phoneModel"
            name="phoneModel"
            label="Phone Model"
            type="text"
            defaultValue={isCreate ? '' : productData.phoneModel}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            defaultValue={isCreate ? '' : productData.description}
          />
          <TextField
            required
            margin="dense"
            id="images"
            name="images"
            label="Images"
            defaultValue={isCreate ? '' : productData.images.join(",")}
            type="text"
            fullWidth
            variant="outlined"
            helperText="Enter image URLs separated by commas"
            
          />
          <TextField
            sx={{ mt: 1.5, ml: 1.5 }}
            required
            id="quantity"
            name="quantity"
            label="Quantity"
            defaultValue={isCreate ? '' : productData.quantity}
            type="number"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            margin="dense"
            id="material"
            name="material"
            label="Material"
            type="text"
            defaultValue={isCreate ? '' : productData.material}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="bought"
            name="bought"
            label="Bought"
            type="number"
            defaultValue={isCreate ? '' : productData.bought}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="inventory"
            name="inventory"
            defaultValue={isCreate ? '' : productData.inventory}
            label="Inventory"
            type="number"
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth required variant="outlined" margin="dense">
            <InputLabel>Status</InputLabel>
            <Select id="status" name="status" label="Status" defaultValue={isCreate ? '' : productData.status}>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
              <MenuItem value="discontinued">Discontinued</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 1.5 }}>
            <InputLabel required htmlFor="outlined-adornment-amount">
              Amount
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              name="amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              defaultValue={isCreate ? '' : productData?.price?.amount}
              label="Amount"
            />
            <TextField
              required
              margin="dense"
              id="currency"
              name="currency"
              label="Currency"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={isCreate ? 'USD' : productData?.price?.currency}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* CART ITEMS MODAL */}
      <Dialog
        maxWidth="md"
        sx={{ p: 5 }}
        open={openCartItemsModal}
        onClose={handleCloseCartItemsModal}
      >
        <DialogTitle>
         Cart Items 
        </DialogTitle>
        <DialogContent>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Product Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} class="border-b border-gray-200 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          {item?.name}
                        </th>
                        <td class="px-6 py-4">
                          {item?.status}
                        </td>
                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {item?.price} {" "} {item?.currency}
                        </td>
                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {item?.quantity}
                        </td>
                        <td class="px-6 py-4">
                          {item?.totalPrice} {" "} {item?.currency}
                        </td>
                    </tr>
                  ))
                  }
                </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleCloseCartItemsModal}
          >
            Close
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <h2 className="text-2xl font-bold">List Orders History</h2>

        <Button
          variant="contained"
          color="inherit"
          onClick={() => handleOpenEditModal("create",  {})}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Order
        </Button>
      </Stack>

      <Card>
        <OrderTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <OrderTableHead
              order={order}
              orderBy={orderBy}
              rowCount={orders.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "user", label: "User" },
                { id: "orderId", label: "OrderId" },
                { id: "totalPrice", label: "Total Price" },
                { id: "" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <OrderTableRow
                    key={row._id}
                    orderId={row._id}
                    userId={row.userId}
                    totalPrice={row.totalPrice}
                    cartItems={row.cartItems}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    handleClickEdit={handleOpenEditModal}
                    handleClickDelete={handleOpenDeleteModal}
                    handleOpenCartItemsModal={handleOpenCartItemsModal}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, orders.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
