import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
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
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

import Iconify from "../../../../components/Admin/iconify";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import {
  getAllUser,
  updateUserById,
  getAllRole,
  getUserById,
  CreateUser,
} from "../../../../service/UserService";
import Cookies from "js-cookie";
// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [isCreate, setIsCreate] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUnBlockModal, setOpenUnBlockModal] = useState(false);
  const [user, setUser] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [usertData, setUserData] = useState({});
  const [selectedUsertId, setSelectedUserId] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userList = await getAllUser();
      const role = await getAllRole();
      if (userList === 403) {
        window.location.href = "/";
      }
      const userIdCookie = Cookies.get("userId");
      const userId = JSON.parse(userIdCookie);

      const filteredUserList = userList.filter(user => user._id !== userId);
      setRoleList(role);
      setUser(filteredUserList);
    } catch (error) {
      console.error("Error fetching userList data:", error);
    }
  };
  const handleOpenEditModal =async (createOrEdit, userId) => {
    let useDetail = user.find((users) => users._id === userId);
    setUserData(useDetail);
    setOpenEditModal(true);
    setIsCreate(createOrEdit === "create" ? true : false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setOpenDeleteModal(true);
  };
  const handleOpenUnBlockeModal = (userId) => {
    setSelectedUserId(userId);
    setOpenUnBlockModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleCloseUnBlockModal = () => {
    setOpenUnBlockModal(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const status = {
        status: "Block",
      };
      await updateUserById(selectedUsertId, status);
      // Sau khi xóa sản phẩm thành công, cập nhật lại danh sách sản phẩm
      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleConfirmUnBlock = async () => {
    try {
      const status = {
        status: "Active",
      };
      await updateUserById(selectedUsertId, status);
      // Sau khi xóa sản phẩm thành công, cập nhật lại danh sách sản phẩm
      fetchData();
      handleCloseUnBlockModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
      const newSelecteds = user.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, firstName) => {
    const selectedIndex = selected.indexOf(firstName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, firstName);
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
    inputData: user,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleSubmit = async (formData) => {
    if (isCreate) {
      try {
        const userCreate = {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          role: formData.get("role"),
          passwords: formData.get("passwords"),
        };
        const response = await CreateUser(userCreate);
        fetchData();
        handleCloseEditModal();
      } catch (error) {
        console.error("Error saving product:", error);
      }
    } else {
      try {
        const userUpdate = {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          role: formData.get("role"),
        };
        const response = await updateUserById(usertData._id, userUpdate);
        fetchData();
        handleCloseEditModal();
      } catch (error) {
        console.error("Error saving product:", error);
      }
    }
  };
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
          {"Confirm Block user"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to block this user?
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
      <Dialog
        open={openUnBlockModal}
        onClose={handleCloseUnBlockModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm UnBlock user"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to unblock this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUnBlockModal} color="inherit">
            Cancel
          </Button>
          <LoadingButton
            size="large"
            variant="contained"
            color="error"
            onClick={handleConfirmUnBlock}
          >
            Un Block
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* EDIT, CREATE MODAL */}
      <Dialog
        sx={{
          p: 5,
          width: 1,
        }}
        open={openEditModal}
        onClose={handleCloseEditModal}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            handleSubmit(formData);
            handleCloseEditModal();
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h4">
            {" "}
            {isCreate ? "Create User" : "Edit User"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <FormControl sx={{ mt: 1.5, mr: 3.5 }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                defaultValue={isCreate ? "" : usertData.firstName}
                type="text"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ mt: 1.5 }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                defaultValue={isCreate ? "" : usertData.lastName}
                type="text"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              defaultValue={isCreate ? "" : usertData.email}
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <FormControl fullWidth required variant="outlined" margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              id="role"
              name="role"
              label="Role"
              defaultValue={isCreate ? "" : usertData.role}
            >
              {roleList.map((role, index) => (
                <MenuItem
                  selected={
                    isCreate ? "" : (usertData.role === role._id ? true : "")
                  }
                  key={index}
                  value={isCreate ? (role.roleName):(role._id) }
                >
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isCreate && (
            <TextField
              autoFocus
              required
              margin="dense"
              id="passwords"
              name="passwords"
              label="Passwords"
              type="password"
              fullWidth
              variant="outlined"
            />
          )}
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">List User</Typography>

        <Button
          variant="contained"
          color="inherit"
          onClick={() => handleOpenEditModal("create", {})}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={user.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "firstName", label: "First Name" },
                { id: "lastName", label: "Last Name" },
                { id: "dob", label: "Dob" },
                { id: "email", label: "Email" },
                { id: "phoneNumber", label: "Phone Number" },
                { id: "gender", label: "Gender" },
                { id: "address", label: "Address" },
                { id: "isVerified", label: "Verified", align: "center" },
                { id: "status", label: "Status" },
                { id: "" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row._id}
                    userId={row._id}
                    firstName={row.firstName}
                    lastName={row.lastName}
                    email={row.email}
                    dob={row.dob}
                    gender={row.gender}
                    phoneNumber={row.phoneNumber}
                    address={row.address}
                    status={row.status}
                    role={row.role}
                    imgAvt={"https://case-shop-be.onrender.com/imageUpload/" + row.imgAvt}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.firstName) !== -1}
                    handleClick={(event) => handleClick(event, row.firstName)}
                    handleClickEdit={handleOpenEditModal}
                    handleClickDelete={() => handleOpenDeleteModal(row._id)}
                    handleClickUnBlock={() => handleOpenUnBlockeModal(row._id)}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, user.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
