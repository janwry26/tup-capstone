import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const MortalityReport = () => {
  const [reports, setReports] = useState([]);

  const handleAddReport = (event) => {
    event.preventDefault();
    const report = {
      animalID: event.target.animalID.value,
      staffID: event.target.staffID.value,
      causeOfDeath: event.target.causeOfDeath.value,
      deathDate: event.target.deathDate.value,
      deathTime: event.target.deathTime.value,
      dateReported: new Date().toISOString(),
    };
    setReports([...reports, report]);
    event.target.reset();
  };

  const handleDeleteReport = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this report!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const newReports = [...reports];
        newReports.splice(index, 1);
        setReports(newReports);
        Swal.fire(
          'Deleted!',
          'Your report has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your report is safe :)',
          'error'
        )
      }
    })
  };

  return (
    <div className="container mt-5">
      <Header
        title="Mortality Report"
        subtitle="Report on animal mortality"
        fontSize="36px"
        mt="20px"
      />
      <Form onSubmit={handleAddReport}>
        <Form.Group className="mb-3" controlId="animalID">
          <Form.Label>Animal ID</Form.Label>
          <Form.Control type="text" placeholder="Enter animal ID" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffID">
          <Form.Label>Staff ID</Form.Label>
          <Form.Control type="text" placeholder="Enter staff ID" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="causeOfDeath">
          <Form.Label>Cause of Death</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cause of death"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deathDate">
          <Form.Label>Death Date</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deathTime">
          <Form.Label>Death Time</Form.Label>
          <Form.Control type="time" required />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="success" type="submit" size="lg" className="mr-3">
            <FaPlus /> Add Report
          </Button>
        </div>
      </Form>

      <Table striped bordered hover className="mt-4" style={{ color: "white" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Animal ID</th>
            <th>Staff ID</th>


            <th>Cause of Death</th>
            <th>Death Date</th>
            <th>Death Time</th>
            <th>Date Reported</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  value={report.animalID}
                  onChange={(event) =>
                    handleEditReport(index, "animalID", event.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={report.staffID}
                  onChange={(event) =>
                    handleEditReport(index, "staffID", event.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={report.causeOfDeath}
                  onChange={(event) =>
                    handleEditReport(index, "causeOfDeath", event.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  value={report.deathDate}
                  onChange={(event) =>
                    handleEditReport(index, "deathDate", event.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="time"
                  value={report.deathTime}
                  onChange={(event) =>
                    handleEditReport(index, "deathTime", event.target.value)
                  }
                />
              </td>
              <td>{report.dateReported}</td>
              <td>
                <Button
                  style={{
                    marginTop: "0",
                    padding: "6px 12px",
                  }}
                  variant="danger"
                  onClick={() => handleDeleteReport(index)}
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

export default MortalityReport;