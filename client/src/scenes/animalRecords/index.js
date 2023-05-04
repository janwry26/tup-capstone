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


<Table striped bordered hover style={{ color: "white" }}>
  <thead>
    <tr>
      <th>Name</th>
      <th>Species</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Animal ID</th>
      <th>Breed Type</th>
      <th>Weight (kg)</th>
      <th>Birth Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {animals.map((animal, index) => (
      <tr key={index}>
        <td>
          <Form.Control
            type="text"
            value={animal.name}
            onChange={(event) =>
              handleEditAnimal(index, "name", event.target.value)
            }
          />
        </td>
        <td>
          <Form.Control
            as="select"
            value={animal.species}
            onChange={(event) =>
              handleEditAnimal(index, "species", event.target.value)
            }
          >
            <option value="">Select species</option>
            <option value="Mammal">Mammal</option>
            <option value="Bird">Bird</option>
            <option value="Amphibians">Amphibians</option>
            <option value="Reptiles">Reptiles</option>
            <option value="Fish">Fish</option>
            <option value="Insects">Insects</option>
          </Form.Control>
        </td>
        <td>
          <Form.Control
            type="number"
            value={animal.age}
            onChange={(event) =>
              handleEditAnimal(index, "age", event.target.value)
            }
          />
        </td>
        <td>
          <Form.Control
            as="select"
            value={animal.gender}
            onChange={(event) =>
              handleEditAnimal(index, "gender", event.target.value)
            }
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </Form.Control>
        </td>
        <td>
          <Form.Control
            type="text"
            value={animal.animalID}
            onChange={(event) =>
              handleEditAnimal(index, "animalID", event.target.value)
            }
          />
        </td>
        <td>
          <Form.Control
            type="text"
            value={animal.breedType}
            onChange={(event) =>
              handleEditAnimal(index, "breedType", event.target.value)
            }
          />
        </td>
        <td>
          <Form.Control
            type="number"
            value={animal.weight}
            onChange={(event) =>
              handleEditAnimal(index, "weight", event.target.value)
            }
          />
        </td>
        <td>
          <Form.Control
            type="date"
            value={animal.birthDate}
            onChange={(event) =>
              handleEditAnimal(index, "birthDate", event.target.value)
            }
          />
        </td>
        <td>
          <Button  style={{
                marginTop: '0',
                padding: '6px 12px'
              }} variant="danger" onClick={() => handleDeleteAnimal(index)}>
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