import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfoCard from "../components/UserInfoCard";
import PostPreview from "../components/PostPreview";
import "./../App.scss";
import { Link } from "react-router-dom"
import { gql, useQuery} from "@apollo/client"

const HomePage = () => {
  const GET_POSTS = gql`
    query GET_POSTS {
        getPosts(community: {id: "all", host:"localhost:8080"}) {
            id,
            title,
            author {
                id
            }
        }
    }
  `

  const { loading, error, data } = useQuery(GET_POSTS);
  
  if (loading) return <h1>'Loading...'</h1>
  if (error) return <h1>`Error! ${error.message}` </h1>
  
  return (
    <div>
      <Link to="/make-post">
        <button className="Submit-button">
          Make Post
        </button>
      </Link>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item container xs={8} direction="column" spacing={2}>
            {data.getPosts.map((post:any) => {
              return (
                <PostPreview username={post.author.id} title={post.title} postId={post.id}/>
              )
            })}
          </Grid>

          <Grid item container xs={4} direction="column" spacing={2}>
            <UserInfoCard username="js123" name="John Smith" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
