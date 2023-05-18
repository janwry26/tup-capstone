import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const AnimalRecords = () => {
  const [records, setRecords] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const genderOptions = ["Male", "Female"];
  const handleAddRecord = (event) => {
    event.preventDefault();
    const record = {
      id: Date.now(),
      species: event.target.species.value,
      age: event.target.age.value,
      gender: event.target.gender.value,
      animalID: event.target.animalID.value,
      breedType: event.target.breedType.value,
      weight: event.target.weight.value,
      birthDate: event.target.birthDate.value,
    };
    setRecords([...records, record]);
    event.target.reset();
  };

  const handleDeleteRecord = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your record is safe :)", "error");
      }
    });
  };

  const handleEditRecord = (params, event) => {
    const { id, field, props } = params;
    const { value } = event.target;
    const newRecords = records.map((record) => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    });
    setRecords(newRecords);
  };

  const handleEditDialogOpen = (record) => {
    setEditRecord(record);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = () => {
    const newRecords = records.map((record) => {
      if (record.id === editRecord.id) {
        return {
          ...record,
          species: document.getElementById("editSpecies").value,
          age: document.getElementById("editAge").value,
          gender: document.getElementById("editGender").value,
          animalID: document.getElementById("editAnimalID").value,
          breedType: document.getElementById("editBreedType").value,
          weight: document.getElementById("editWeight").value,
          birthDate: document.getElementById("editBirthDate").value,
        };
      }
      return record;
    });
    setRecords(newRecords);
    setEditDialogOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" width="90%" margin="0 auto">
      <Header
        title="ANIMAL RECORDS"
        subtitle="Manage animal records"
        fontSize="36px"
        mt="20px"
      />
      <Form onSubmit={handleAddRecord}>
        <Form.Group className="mb-3" controlId="species">
          <Form.Label>Species</Form.Label>
          <Form.Control type="text" placeholder="Enter species" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" placeholder="Enter age" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Form.Group>


        <Form.Group className="mb-3" controlId="animalID">
          <Form.Label>Animal ID</Form.Label>
          <Form.Control type="text" placeholder="Enter animal ID" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="breedType">
          <Form.Label>Breed Type</Form.Label>
          <Form.Control as="select" required>
            <option value="">Select a breed type</option>
            <option value="Lion">Lion</option>
            <option value="Tiger">Tiger</option>
            <option value="Giraffe">Giraffe</option>
            <option value="Elephant">Elephant</option>
            <option value="Zebra">Zebra</option>
            <option value="Monkey">Monkey</option>
          </Form.Control>
        </Form.Group>


        <Form.Group className="mb-3" controlId="weight">
          <Form.Label>Weight</Form.Label>
          <Form.Control type="text" placeholder="Enter weight" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="birthDate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        <div className="d-grid gap-2" style={{ marginTop: "-20px", marginBottom: "20px" }}>
          <Button className="btnSignin" variant="success" type="submit" style={{ width: "300px" }}>
            <FaPlus /> Add Record
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
          rows={records}
          columns={[
            { field: "species", headerName: "Species", flex: 1 },
            { field: "age", headerName: "Age", flex: 1 },
            { field: "gender", headerName: "Gender", flex: 1 },
            { field: "animalID", headerName: "Animal ID", flex: 1 },
            { field: "breedType", headerName: "Breed Type", flex: 1 },
            { field: "weight", headerName: "Weight", flex: 1 },
            { field: "birthDate", headerName: "Birth Date", flex: 1 },
            {
              field: "actions",
              headerName: "",
              sortable: false,
              filterable: false,
              renderCell: (params) => (
                <div style={{ marginTop: "5px auto" }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteRecord(params.rowIndex)}
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
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleEditRecord}>
            <Form.Group className="mb-3" controlId="editSpecies">
              <Form.Label>Species</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter species"
                defaultValue={editRecord ? editRecord.species : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter age"
                defaultValue={editRecord ? editRecord.age : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" defaultValue={editRecord ? editRecord.gender : ""} required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>


            <Form.Group className="mb-3" controlId="editAnimalID">
              <Form.Label>Animal ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter animal ID"
                defaultValue={editRecord ? editRecord.animalID : ""}
                required
              />
            </Form.Group>

           <Form.Group className="mb-3" controlId="editBreedType">
            <Form.Label>Breed Type</Form.Label>
            <Form.Control as="select" defaultValue={editRecord ? editRecord.breedType : ""} required>
              <option value="">Select a breed</option>
              <option value="Lion">Lion</option>
              <option value="Tiger">Tiger</option>
              <option value="Giraffe">Giraffe</option>
              <option value="Elephant">Elephant</option>
              <option value="Zebra">Zebra</option>
              <option value="Monkey">Monkey</option>
            </Form.Control>
          </Form.Group>


            <Form.Group className="mb-3" controlId="editWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter weight"
                defaultValue={editRecord ? editRecord.weight : ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editBirthDate">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={editRecord ? editRecord.birthDate : ""}
                required
              />
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

export default AnimalRecords;
