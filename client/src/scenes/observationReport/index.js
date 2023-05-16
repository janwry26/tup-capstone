import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaPlus, FaMinus, FaTrash, FaEdit } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ObservationReport = () => {
  const [reports, setReports] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editReport, setEditReport] = useState(null);

  const handleAddReport = (event) => {
    event.preventDefault();
    const report = {
      id: Date.now(),
      animalID: event.target.animalID.value,
      reportID: event.target.reportID.value,
      staffID: event.target.staffID.value,
      reportDescription: event.target.reportDescription.value,
      dateReported: event.target.dateReported.value,
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
          animalID: document.getElementById("editAnimalID").value,
          reportID: document.getElementById("editReportID").value,
          staffID: document.getElementById("editStaffID").value,
          reportDescription: document.getElementById("editReportDescription").value,
          dateReported: document.getElementById("editDateReported").value,
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
        title="OBSERVATION REPORT"
        subtitle="Manage observation reports"
        fontSize="36px"
        mt="20px"
      />
  <Form onSubmit={handleAddReport}>
    <Form.Group className="mb-3" controlId="animalID">
      <Form.Label>Animal ID</Form.Label>
      <Form.Control type="text" placeholder="Enter animal ID" required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="reportID">
      <Form.Label>Report ID</Form.Label>
      <Form.Control type="text" placeholder="Enter report ID" required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="staffID">
      <Form.Label>Staff ID</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter staff ID"
        required
      />
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

    <div className="d-grid gap-2" style={{marginTop:"-20px", marginBottom: "20px"}}>
      <Button variant="success" type="submit"  style={{width:"300px"}} >
        <FaPlus /> Add Report
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
      rows={reports}
      columns={[ 
        { field: "animalID",headerName: "Animal ID", flex: 1 },

        { field: "reportID", headerName: "Report ID", flex: 1 }, 
        { field: "staffID", headerName: "Staff ID", flex: 1 },  
        { field: "reportDescription", headerName: "Description", flex: 1 },
        { field: "dateReported", headerName: "Date Reported", flex: 1 },  
         { 
          field: "actions",
           headerName: "", 
            sortable: false, 
             filterable: false, 
              renderCell: (params) => 
              (<div style={{ marginBottom: '35px' }} > 
               <Button   variant="danger" onClick={() => handleDeleteReport(params.rowIndex)} 
               style={{ padding: "6px 12px" }}  >
                 <FaTrash />
                  </Button> 
                <Button  variant="primary"  onClick={() => handleEditDialogOpen(params.row)} 
                 style={{ padding: "6px 12px" }}              >                <FaEdit />
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
        <Form.Group className="mb-3" controlId="editAnimalID">
          <Form.Label>Animal ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter animal ID"
            defaultValue={editReport ? editReport.animalID : ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editReportID">
          <Form.Label>Report ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter report ID"
            defaultValue={editReport ? editReport.reportID : ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editStaffID">
          <Form.Label>Staff ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter staff ID"
            defaultValue={editReport ? editReport.staffID : ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editReportDescription">
          <Form.Label>Report Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter report description"
            defaultValue={editReport ? editReport.reportDescription : ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editDateReported">
          <Form.Label>Date Reported</Form.Label>
          <Form.Control
            type="date"
            defaultValue={editReport ? editReport.dateReported : ""}
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

export default ObservationReport;