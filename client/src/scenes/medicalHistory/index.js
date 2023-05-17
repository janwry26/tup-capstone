import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const MedicalHistory = () => {
  const [reports, setReports] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editReport, setEditReport] = useState(null);

  const handleAddReport = (event) => {
    event.preventDefault();
    const report = {
      id: Date.now(),
      animalId: event.target.animalId.value,
      staffId: event.target.staffId.value,
      healthDescription: event.target.healthDescription.value,
      nextCheckupDate: event.target.nextCheckupDate.value,
      medication: event.target.medication.value,
      vaccinationStatus: event.target.vaccinationStatus.value,
    };
    setReports([...reports, report]);
    event.target.reset();
  };

  const handleDeleteReport = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newReports = [...reports];
        newReports.splice(index, 1);
        setReports(newReports);
        Swal.fire("Deleted!", "Your report has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your report is safe :)", "error");
      }
    });
  };

  const handleEditReport = (params, event) => {
    const { id, field, props } = params;
    const { value } = event.target;
    const newReports = reports.map((report) => {
      if (report.id === id) {
        return { ...report, [field]: value };
      }
      return report;
    });
    setReports(newReports);
  };

  const handleEditDialogOpen = (report) => {
    setEditReport(report);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = () => {
    const newReports = reports.map((report) => {
      if (report.id === editReport.id) {
        return {
          ...report,
          animalId: document.getElementById("editAnimalId").value,
          staffId: document.getElementById("editStaffId").value,
          healthDescription: document.getElementById("editHealthDescription").value,
          nextCheckupDate: document.getElementById("editNextCheckupDate").value,
          medication: document.getElementById("editMedication").value,
          vaccinationStatus: document.getElementById("editVaccinationStatus").value,
        };
      }
      return report;
    });
    setReports(newReports);
    setEditDialogOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" width="90%" margin="0 auto">
      <Header
        title="MEDICAL HISTORY"
        subtitle="Manage medical history reports"
        fontSize="36px"
        mt="20px"
      />
      <Form onSubmit={handleAddReport}>
        <Form.Group className="mb-3" controlId="animalId">
          <Form.Label>Animal ID</Form.Label>
          <Form.Control type="text" placeholder="Enter animal ID" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="staffId">
          <Form.Label>Staff ID</Form.Label>
          <Form.Control type="text" placeholder="Enter staff ID" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="healthDescription">
          <Form.Label>Health Description</Form.Label>
          <Form.Control type="text" placeholder="Enter health description" required />
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
            <option value="Vaccinated">Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </Form.Select>
        </Form.Group>


        <div className="d-grid gap-2" style={{ marginTop: "-20px", marginBottom: "20px" }}>
          <Button className="btnSignin" variant="success" type="submit" style={{ width: "300px" }}>
            <FaPlus /> Add Report
          </Button>
        </div>
      </Form>

      <Box
        m="40px 0 0 0"
        height="75vh"
        margin="0 auto"
        sx={{
          // Styling for the DataGrid
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
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
          rows={reports}
          columns={[
            { field: "animalId", headerName: "Animal ID", flex: 1 },
            { field: "staffId", headerName: "Staff ID", flex: 1 },
            { field: "healthDescription", headerName: "Health Description", flex: 1 },
            { field: "nextCheckupDate", headerName: "Next Checkup Date", flex: 1 },
            { field: "medication", headerName: "Medication", flex: 1 },
            {
              field: "vaccinationStatus",
              headerName: "Vaccination Status",
              flex: 1,
            },
            {
              field: "actions",
              headerName: "",
              sortable: false,
              filterable: false,
              renderCell: (params) => (
                <div style={{ marginTop: "5px auto" }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteReport(params.rowIndex)}
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
        <DialogTitle>Edit Report</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleEditReport}>
            <Form.Group className="mb-3" controlId="editAnimalId">
              <Form.Label>Animal ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter animal ID"
                defaultValue={editReport ? editReport.animalId : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editStaffId">
              <Form.Label>Staff ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter staff ID"
                defaultValue={editReport ? editReport.staffId : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editHealthDescription">
              <Form.Label>Health Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter health description"
                defaultValue={editReport ? editReport.healthDescription : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editNextCheckupDate">
              <Form.Label>Next Checkup Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={editReport ? editReport.nextCheckupDate : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editMedication">
              <Form.Label>Medication</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medication"
                defaultValue={editReport ? editReport.medication : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editVaccinationStatus">
            <Form.Label>Vaccination Status</Form.Label>
            <Form.Select defaultValue={editReport ? editReport.vaccinationStatus : ""} required>
              <option value="">Select vaccination status</option>
              <option value="Vaccinated">Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </Form.Select>
          </Form.Group>

          </Form>
        </DialogContent>
        <DialogActions>
          <Button variant="warning" onClick={handleEditDialogClose}>
            Cancel
          </Button>
          <Button variant="success" color="danger" onClick={handleEditDialogSave} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicalHistory;
