import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const ObservationReport = () => {
const [reports, setReports] = useState([]);

const handleAddReport = (event) => {
event.preventDefault();
const report = {
animalID: event.target.animalID.value,
reportID: reports.length + 1,
staffID: event.target.staffID.value,
reportDescription: event.target.reportDescription.value,
dateReported: event.target.dateReported.value,
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

const handleEditReport = (index, key, value) => {
const newReports = [...reports];
newReports[index][key] = value;
setReports(newReports);
};

return (
<div className="container mt-5">
<Header
     title="OBSERVATION REPORT"
     subtitle="Report observations on animals"
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

    <Form.Group className="mb-3" controlId="reportDescription">
      <Form.Label>Report Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Enter report description"
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="dateReported">
      <Form.Label>Date Reported</Form.Label>
      <Form.Control type="date" required />
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
        <th>Report Description</th>
        <th>Date Reported</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

{reports.map((report, index) => (

  <tr style={{ color: "white" }} key={report.reportID}>
    <td>{report.reportID}</td>
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
        as="textarea"
        rows={3}
        value={report.reportDescription}
        onChange={(event) =>
          handleEditReport(index, "reportDescription", event.target.value)
        }
      />
    </td>
    <td>
      <Form.Control
        type="date"
        value={report.dateReported}
        onChange={(event) =>
          handleEditReport(index, "dateReported", event.target.value)
        }
      />
    </td>
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
export default ObservationReport;