import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const AnimalRecords = () => {
  const [animals, setAnimals] = useState([]);

  const handleAddAnimal = (event) => {
    event.preventDefault();
    const animal = {
      name: event.target.name.value,
      species: event.target.species.value,
      age: event.target.age.value,
      gender: event.target.gender.value,
      animalID: event.target.animalID.value,
      breedType: event.target.breedType.value,
      weight: event.target.weight.value,
      birthDate: event.target.birthDate.value
    };
    setAnimals([...animals, animal]);
    event.target.reset();
  };
  

  const handleDeleteAnimal = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this animal record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const newAnimals = [...animals];
        newAnimals.splice(index, 1);
        setAnimals(newAnimals);
        Swal.fire(
          'Deleted!',
          'Your animal record has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your animal record is safe :)',
          'error'
        )
      }
    })
  };

  const handleEditAnimal = (index, key, value) => {
    const newAnimals = [...animals];
    newAnimals[index][key] = value;
    setAnimals(newAnimals);
  };

  return (
    <div className="container mt-5">
      <Header
        title="ANIMAL RECORDS"
        subtitle="Record of animals in the shelter"
        fontSize="36px"
        mt="20px"
      />
      {/* <Form onSubmit={handleAddAnimal}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter animal name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="species">
        <Form.Label>Species</Form.Label>
        <Form.Select required>
            <option value="">Select species</option>
            <option value="Mammal">Mammal</option>
            <option value="Bird">Bird</option>
            <option value="Amphibians">Amphibians</option>
            <option value="Reptiles">Reptiles</option>
            <option value="Fish">Fish</option>
            <option value="Insects">Insects</option>

           
        </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Enter animal age" min="1" step="1" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </Form.Select>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="success" type="submit" size="lg" className="mb-3">
            Add animal <FaPlus className="ms-2" />
          </Button>
        </div>
      </Form> */}
      <Form onSubmit={handleAddAnimal}>
  <Form.Group className="mb-3" controlId="name">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter animal name" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="species">
        <Form.Label>Species</Form.Label>
        <Form.Select required>
            <option value="">Select species</option>
            <option value="Mammal">Mammal</option>
            <option value="Bird">Bird</option>
            <option value="Amphibians">Amphibians</option>
            <option value="Reptiles">Reptiles</option>
            <option value="Fish">Fish</option>
            <option value="Insects">Insects</option>
        </Form.Select>
        </Form.Group>

  <Form.Group className="mb-3" controlId="age">
    <Form.Label>Age</Form.Label>
    <Form.Control type="number" placeholder="Enter animal age" min="1" step="1" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="gender">
    <Form.Label>Gender</Form.Label>
    <Form.Select required>
      <option value="">Select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="unknown">Unknown</option>
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3" controlId="animalID">
    <Form.Label>Animal ID</Form.Label>
    <Form.Control type="number" placeholder="Enter animal ID" min="1" step="1" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="breedType">
    <Form.Label>Breed Type</Form.Label>
    <Form.Control type="text" placeholder="Enter breed type" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="weight">
    <Form.Label>Weight</Form.Label>
    <Form.Control type="text" placeholder="Enter weight" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="birthDate">
    <Form.Label>Birth Date</Form.Label>
    <Form.Control type="date" required />
  </Form.Group>

  <div className="d-grid gap-2">
    <Button variant="success" type="submit" size="lg" className="mb-3">
      Add animal <FaPlus className="ms-2" />
    </Button>
  </div>
</Form>


      <Table responsive striped bordered hover className="mt-5"  style={{ color: "white" }}>
        <thead>
        <tr>
        <th>Name</th>
        <th>Species</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Action</th>
        </tr>
        </thead>
    <tbody>
    {animals.map((animal, index) => (
    <tr key={index}>
    <td>
    <Form.Control
    type="text"
    defaultValue={animal.name}
    onChange={(event) =>
    handleEditAnimal(index, "name", event.target.value)
    }
    />
    </td>
    <td>
    <Form.Control
    type="text"
    defaultValue={animal.species}
    onChange={(event) =>
    handleEditAnimal(index, "species", event.target.value)
    }
    />
    </td>
    <td>
    <Form.Control
    type="number"
    defaultValue={animal.age}
    min="1"
    step="1"
    onChange={(event) =>
    handleEditAnimal(index, "age", event.target.value)
    }
    />
    </td>
    <td>
    <Form.Select
    defaultValue={animal.gender}
    onChange={(event) =>
    handleEditAnimal(index, "gender", event.target.value)
    }
    >
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="unknown">Unknown</option>
    </Form.Select>
    </td>
    <td>
    <Button
    variant="danger"
    className="me-2"
    onClick={() => handleDeleteAnimal(index)}
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

export default AnimalRecords;