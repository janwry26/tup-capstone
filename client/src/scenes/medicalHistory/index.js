import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);

  const handleAddRecord = (event) => {
    event.preventDefault();
    const record = {
      animalId: event.target.animalId.value,
      staffId: event.target.staffId.value,
      healthDescription: event.target.healthDescription.value,
      nextCheckupDate: event.target.nextCheckupDate.value,
      medication: event.target.medication.value,
      vaccinationStatus: event.target.vaccinationStatus.value
    };
    setRecords([...records, record]);
    event.target.reset();
  };

  const handleDeleteRecord = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this medical record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
        Swal.fire(
          'Deleted!',
          'Your medical record has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your medical record is safe :)',
          'error'
        )
      }
    })
  };

  const handleEditRecord = (index, key, value) => {
    const newRecords = [...records];
    newRecords[index][key] = value;
    setRecords(newRecords);
  };

  return (
    <div className="container mt-5">
      <Header
        title="MEDICAL HISTORY"
        subtitle="Record of animal medical history"
        fontSize="36px"
        mt="20px"
      />
      <Form onSubmit={handleAddRecord}>
        <Form.Group className="mb-3" controlId="animalId">
          <Form.Label>Animal ID</Form.Label>
          <Form.Control type="number" placeholder="Enter animal ID" min="1" step="1" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffId">
          <Form.Label>Staff ID</Form.Label>
          <Form.Control type="number" placeholder="Enter staff ID" min="1" step="1" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="healthDescription">
          <Form.Label>Health Description</Form.Label>
          <Form.Control as="textarea" placeholder="Enter health description" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nextCheckupDate">
          <Form.Label>Next Checkup Date</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="medication">
          <Form.Label>Medication</Form.Label>
          <Form.Control type="text" placeholder="Enter medication" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vaccinationStatus">
            <Form.Label>Vaccination Status</Form.Label>
            <Form.Select required>
            <option value="">Select vaccination status</option>
            <option value="Up to date">Up to date</option>
            <option value="Expired">Expired</option>
            <option value="Not vaccinated">Not vaccinated</option>
            </Form.Select>
            </Form.Group>

    <div className="d-grid gap-2">
      <Button variant="success" type="submit" size="lg" className="mb-3">
        Add record <FaPlus className="ms-2" />
      </Button>
    </div>
  </Form>

  <Table striped bordered hover style={{ color: "white" }}>
    <thead>
      <tr>
        <th>Animal ID</th>
        <th>Staff ID</th>
        <th>Health Description</th>
        <th>Next Checkup Date</th>
        <th>Medication</th>
        <th>Vaccination Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record, index) => (
        <tr key={index}>
          <td>
            <Form.Control
              type="number"
              value={record.animalId}
              onChange={(event) =>
                handleEditRecord(index, "animalId", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              type="number"
              value={record.staffId}
              onChange={(event) =>
                handleEditRecord(index, "staffId", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              as="textarea"
              value={record.healthDescription}
              onChange={(event) =>
                handleEditRecord(index, "healthDescription", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              type="date"
              value={record.nextCheckupDate}
              onChange={(event) =>
                handleEditRecord(index, "nextCheckupDate", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={record.medication}
              onChange={(event) =>
                handleEditRecord(index, "medication", event.target.value)
              }
            />
          </td>
          <td>
            <Form.Control
              as="select"
              value={record.vaccinationStatus}
              onChange={(event) =>
                handleEditRecord(index, "vaccinationStatus", event.target.value)
              }
            >
              <option value="">Select vaccination status</option>
              <option value="Up to date">Up to date</option>
              <option value="Expired">Expired</option>
              <option value="Not vaccinated">Not vaccinated</option>
            </Form.Control>
          </td>
          <td>
            <Button
              variant="danger"
              onClick={() => handleDeleteRecord(index)}
              style={{
                marginTop: "0",
                padding: "6px 12px",
              }}
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

export default MedicalHistory;