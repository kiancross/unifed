import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfoCard from "../components/UserInfoCard";
import Post from "../components/Post";
import "./../App.scss";
import PostEditor from "./../components/PostEditor"

interface Props {

}

interface State {
  makingPost: boolean
}

class HomePage extends React.Component <Props, State>{

  constructor(props:Props) {
    super(props);
    
    this.state = {
      makingPost: false
    }

    this.updateMakingPost = this.updateMakingPost.bind(this);
  }

  updateMakingPost() {
    this.setState(state => ({
      makingPost: !state.makingPost
    }))
  }
  
  render() { 
    const text1 =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet est placerat in egestas erat imperdiet sed. Amet nisl suscipit adipiscing bibendum. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Cras semper auctor neque vitae tempus quam.";
    const text2 =
      "Egestas tellus rutrum tellus pellentesque eu. Lectus magna fringilla urna porttitor rhoncus. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Quam adipiscing vitae proin sagittis nisl. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Sem fringilla ut morbi tincidunt augue interdum velit. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Neque laoreet suspendisse interdum consectetur libero id. Faucibus in ornare quam viverra orci sagittis eu volutpat. Volutpat diam ut venenatis tellus in metus. Dui vivamus arcu felis bibendum ut tristique.";

    return (
      <div>
        
        {this.state.makingPost ? 
          <div>
            <PostEditor /> 
            <button className="Submit-button" onClick={this.updateMakingPost}>
              Close
            </button>
          </div>
          : 
          <button className="Submit-button" onClick={this.updateMakingPost}>
          Make Post
          </button>
        }
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item container xs={8} direction="column" spacing={2}>
              <Post username="js123" text="Hello there" />
              <Post username="amc51" text={text1} />
              <Post username="tr55" text={text2} />
            </Grid>

            <Grid item container xs={4} direction="column" spacing={2}>
              <UserInfoCard username="js123" name="John Smith" />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
};

export default HomePage;
