import React from "react"
import { Container, Grid } from "@material-ui/core";
import Post from "./../components/Post"
import { useParams } from "react-router-dom";
import CommentEditor from "./../components/CommentEditor"

interface PostParams {
    postId: string;
}

const PostPage = ():JSX.Element => {
    const { postId } = useParams<PostParams>();

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item container xs={8} direction="column" spacing={2}>
                    <Post username={postId} text="Get post" />
                </Grid>
            </Grid>
            <h3 style={{color:"black"}}>
                Comments
            </h3>
            <CommentEditor postId={postId}/>
        </Container>
    )
} 

export default PostPage