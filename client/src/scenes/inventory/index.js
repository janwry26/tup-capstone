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
      name: event.target.name.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
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
     <Header title="INVENTORY" subtitle="Inventory 1" fontSize="36px" mt="20px" />
      <Form onSubmit={handleAddProduct}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter product price" min="1" step="1" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" placeholder="Enter product quantity" min="0" step="1" required />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="success" type="submit" size="lg" className="mb-3">
            Add product <FaPlus className="ms-2" />
          </Button>
        </div>
      </Form>

      <Table responsive striped bordered hover className="mt-5 bg-light">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product, index) => (
      <tr key={index}>
       <td className="align-middle">{index + 1}</td>
        <td className="align-middle">
            <Form.Control
            type="text"
            defaultValue={product.name}
            onChange={(e) => handleEditProduct(index, "name", e.target.value)}
            readOnly
            />
        </td>
        <td className="align-middle">
          <Form.Control
            type="number"
            min="1"
            step="1"
            defaultValue={product.price}
            onChange={(e) => handleEditProduct(index, "price", e.target.value)}
          />
        </td>
        <td className="align-middle">
          <div  className="d-flex align-items-center">
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
        <td className="text-center">
  <Button className="align-middle" variant="danger" size="sm" onClick={() => handleDeleteProduct(index)}>
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