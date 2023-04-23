import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import {Box} from "@mui/material"

const ObservationReport = () => {
  const [observation, setObservation] = useState("");
  const [animal, setAnimal] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleObservationChange = (event) => {
    setObservation(event.target.value);
  };

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!observation || !animal) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit this observation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const now = new Date();
        setDateTime(now.toLocaleString());
        console.log(`Observation: ${observation}, Animal: ${animal}, Date/Time: ${now.toLocaleString()}`);
        setObservation("");
        setAnimal("");
        Swal.fire("Submitted!", "Your observation has been submitted.", "success");
      }
    });
  };

  return (
    <Box p="20px" width="80%" margin="0 auto" paddingTop="50px">
      <div>
        <Header
          title="Observation Report"
          subtitle="Fill up the form below to report an observation."
          fontSize="36px"
          mt="20px"
        />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="animal">Animal:</Label>
            <Input
              type="text"
              id="animal"
              name="animal"
              value={animal}
              onChange={handleAnimalChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="observation">Observation:</Label>
            <Input
              type="textarea"
              id="observation"
              name="observation"
              value={observation}
              onChange={handleObservationChange}
              required
            />
          </FormGroup>
          <p>Current date and time: {dateTime}</p>
          <Button type="submit" color="success">
            Submit
          </Button>
        </Form>
      </div>
    </Box>
  );
};

export default ObservationReport;
