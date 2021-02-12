import { Container, Grid } from "@material-ui/core";
import { useState } from "react";
import CourseForm from "./CourseForm";
import VideoList from "./VideoList";

const CreateCourse = () => {
  const [totalTime, setTotalTime] = useState();

  return (
    <div>
      <Container maxWidth={false}>
        <Grid container spacing={0}>
          {/* left half portion */}
          <Grid
            container
            item
            sm={6}
            spacing={2}
            direction="row"
            // justify="center"
            alignItems="center"
          >
            <VideoList setTotalTime={setTotalTime} />
          </Grid>
          {/* right half portion */}
          <Grid container item sm={6}>
            <CourseForm totalTime={totalTime} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateCourse;
