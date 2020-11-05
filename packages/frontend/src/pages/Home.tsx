import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfoCard from "../components/UserInfoCard";
import Post from "../components/Post";

const HomePage = (): JSX.Element => {
  // example text
  const text1 =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet est placerat in egestas erat imperdiet sed. Amet nisl suscipit adipiscing bibendum. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Cras semper auctor neque vitae tempus quam.";
  const text2 =
    "Egestas tellus rutrum tellus pellentesque eu. Lectus magna fringilla urna porttitor rhoncus. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Quam adipiscing vitae proin sagittis nisl. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Sem fringilla ut morbi tincidunt augue interdum velit. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Neque laoreet suspendisse interdum consectetur libero id. Faucibus in ornare quam viverra orci sagittis eu volutpat. Volutpat diam ut venenatis tellus in metus. Dui vivamus arcu felis bibendum ut tristique.";

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Column for posts */}
        <Grid item container xs={8} direction="column" spacing={2}>
          <Post username="js123" text="Hello there" />
          <Post username="amc51" text={text1} />
          <Post username="tr55" text={text2} />
        </Grid>

        {/* Column for other components */}
        <Grid item container xs={4} direction="column" spacing={2}>
          <UserInfoCard username="js123" name="John Smith" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
