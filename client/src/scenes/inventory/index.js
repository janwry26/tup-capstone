import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (event) => {
    event.preventDefault();
    const product = {
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
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        )
      }
    })
  };

  const handleEditProduct = (index, key, value) => {
    const newProducts = [...products];
    newProducts[index][key] = value;
    setProducts(newProducts);
  };

  const handleQuantityChange = (index, amount) => {
    const newProducts = [...products];
    const product = newProducts[index];
    product.quantity = Math.max(parseInt(product.quantity) + amount, 0);
    setProducts(newProducts);
  };

  return (
    <div className="container mt-5">
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
   {/* dasddasdaasada */}
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

        <div className="d-grid gap-2">
          <Button variant="success" type="submit" size="lg" className="mr-3">
<FaPlus /> Add Product
</Button>
</div>
</Form>

  <Table striped bordered hover className="mt-4" style={{ color: "white" }}>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Expiration Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr style={{color: "white"}} key={product.inventoryID}>
          <td>{product.inventoryID}</td>
          <td>
            <Form.Control
              type="text"
              value={product.itemName}
              onChange={(event) =>
                handleEditProduct(index, "itemName", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={product.itemType}
              onChange={(event) =>
                handleEditProduct(index, "itemType", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={product.itemDescription}
              onChange={(event) =>
                handleEditProduct(
                  index,
                  "itemDescription",
                  event.target.value
                )
              }
            />
          </td>
          <td>
            <div className="d-flex justify-content-between align-items-center">
            <Form.Control
              type="number"
              min="0"
              step="1"
              value={product.quantity}
              onChange={(e) => handleEditProduct(index, "quantity", e.target.value)}
              className="mx-2"
            />
            </div>
          </td>
          <td>
            <Form.Control
              type="date"
              value={product.expDate}
              onChange={(event) =>
                handleEditProduct(index, "expDate", event.target.value)
              }
            />
          </td>
          <td  >
            <Button
              style={{
                marginTop: '0',
                padding: '6px 12px'
              }}
              variant="danger"
              onClick={() => handleDeleteProduct(index)}
            >
              <FaTrash />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>
);
};

export default Inventory;