import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import {Box} from "@mui/material"

const MortalityReport = () => {
  const [animal, setAnimal] = useState("");
  const [cause, setCause] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  const handleCauseChange = (event) => {
    setCause(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!animal || !cause || !date || !time) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit this mortality report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Animal: ${animal}, Cause: ${cause}, Date: ${date}, Time: ${time}`);
        setAnimal("");
        setCause("");
        setDate("");
        setTime("");
        Swal.fire("Submitted!", "Your mortality report has been submitted.", "success");
      }
    });
  };

  return (
    <Box p="20px" width="80%" margin="0 auto" paddingTop="50px">
      <div>
        <Header
          title="Mortality Report"
          subtitle="Fill up the form below to report an animal death."
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
            <Label for="cause">Cause of Death:</Label>
            <Input
              type="textarea"
              id="cause"
              name="cause"
              value={cause}
              onChange={handleCauseChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date of Death:</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">Time of Death:</Label>
            <Input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={handleTimeChange}
              required
            />
          </FormGroup>
          <Button type="submit" color="success">
            Submit
          </Button>
        </Form>
      </div>
    </Box>
  );
};

export default MortalityReport;
