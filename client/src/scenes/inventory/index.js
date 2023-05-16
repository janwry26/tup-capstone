import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaPlus, FaMinus, FaTrash, FaEdit } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = (event) => {
    event.preventDefault();
    const product = {
      id: Date.now(),
      inventoryID: products.length + 1,
      itemName: event.target.name.value,
      itemType: event.target.type.value,
      itemDescription: event.target.description.value,
      quantity: event.target.quantity.value,
      expDate: event.target.expDate.value,
    };
    setProducts([...products, product]);
    event.target.reset();
  };

  const handleDeleteProduct = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your product is safe :)", "error");
      }
    });
  };

  const handleEditProduct = (params, event) => {
    const { id, field, props } = params;
    const { value } = event.target;
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, [field]: value };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleQuantityChange = (index, amount) => {
    const newProducts = [...products];
    const product = newProducts[index];
    product.quantity = Math.max(parseInt(product.quantity) + amount, 0);
    setProducts(newProducts);
  };

  const handleEditDialogOpen = (product) => {
    setEditProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = () => {
    const newProducts = products.map((product) => {
      if (product.id === editProduct.id) {
        return {
          ...product,
          itemName: document.getElementById("editName").value,
          itemType: document.getElementById("editType").value,
          itemDescription: document.getElementById("editDescription").value,
          quantity: document.getElementById("editQuantity").value,
          expDate: document.getElementById("editExpDate").value,
        };
      }
      return product;
    });
    setProducts(newProducts);
    setEditDialogOpen(false);
  };
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" width="90%" margin="0 auto">
      <Header
        title="INVENTORY"
        subtitle="Inventory for medicines"
        fontSize="36px"
        mt="20px"
      />
      <Form onSubmit={handleAddProduct}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="type">


          <Form.Label>Type</Form.Label>
          <Form.Control type="text" placeholder="Enter product type" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product quantity"
            min="0"
            step="1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expDate">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        <div className="d-grid gap-2" style={{marginTop:"-20px", marginBottom: "20px"}}>
          <Button variant="success" type="submit"  style={{width:"300px"}} >
            <FaPlus /> Add Product
          </Button>
        </div>
      </Form>

      <Box
        m="40px 0 0 0"
        height="75vh"
        margin= "0 auto"
        sx={{
          // Styling for the DataGrid
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={[
            { field: "inventoryID", headerName: "#", flex: 0.5 },
            { field: "itemName", headerName: "Name", flex: 1 },
            { field: "itemType", headerName: "Type", flex: 1 },
            { field: "itemDescription", headerName: "Description", flex: 1 },
            {
              field: "quantity",
              headerName: "Quantity",
              type: "number",
              headerAlign: "left",
              align: "left",
              flex: 1,
            },
            { field: "expDate", headerName: "Expiration Date", flex: 1 },
            {
              field: "actions",
              headerName: "",
              sortable: false,
              filterable: false,
              renderCell: (params) => (
                <div style={{ marginBottom: '35px' }} >
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(params.rowIndex)}
                    style={{ padding: "6px 12px" }}
                  >
                    <FaTrash />
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleEditDialogOpen(params.row)}
                    style={{ padding: "6px 12px" }}
                  >
                    <FaEdit />
                  </Button>
                </div>
              ),
              flex: 0.5,
            },
          ]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
      <DialogTitle>Edit Product</DialogTitle>
<DialogContent>
  <Form onSubmit={handleEditProduct} >
    <Form.Group className="mb-3" controlId="editName">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product name"
        defaultValue={editProduct ? editProduct.itemName : ""}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="editType">
      <Form.Label>Type</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product type"
        defaultValue={editProduct ? editProduct.itemType : ""}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="editDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product description"
        defaultValue={editProduct ? editProduct.itemDescription : ""}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="editQuantity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter product quantity"
        defaultValue={editProduct ? editProduct.quantity : ""}
        min="0"
        step="1"
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="editExpDate">
      <Form.Label>Expiration Date</Form.Label>
      <Form.Control
        type="date"
        defaultValue={editProduct ? editProduct.expDate : ""}
        required
      />
    </Form.Group>
  </Form>
</DialogContent>
<DialogActions>
  <Button variant="outlined" onClick={handleEditDialogClose}>
    Cancel
  </Button>
  <Button variant="contained" onClick={handleEditDialogSave} type="submit">
    Save
  </Button>
</DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;