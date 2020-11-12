import React from "react"
import { Container, Grid } from "@material-ui/core";
import Post from "./../components/Post"
import { useParams } from "react-router-dom";
import CommentEditor from "./../components/CommentEditor"
import {gql, useQuery} from "@apollo/client"
import Comments from "../components/Comments";
import UserInfoCard from "./../components/UserInfoCard"

interface PostParams {
    postId: string;
}

const PostPage = ():JSX.Element => {
    const { postId } = useParams<PostParams>();

    const GET_POST = gql`
        query GET_POST($id:String!) {
            getPost(post: {id: $id, host:"localhost:8080"}) {
                title,
                body,
                author {
                    id
                }
            }
        }
    `

    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id:postId }
    })

    if (loading) return <h1>'Loading...'</h1>
    if (error) return <h1>`Error! ${error.message}` </h1>

    const postData = data.getPost
    const username = postData.author.id
    const body = postData.body
    const title = postData.title

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item container xs={8} direction="column" spacing={2}>
                    <Post username={username} text={body} title={title}/>
                </Grid>
            
                <Grid item container xs={4} direction="column" spacing={2}>
                    <UserInfoCard username={username} name={username} />
                </Grid>
                <h3 style={{color:"black"}}>
                    Comments
                </h3>
                <Comments parentId={postId}/>
                <CommentEditor parentId={postId} parentTitle={title}/>
            </Grid>
            

        </Container>
    )
} 

export default PostPage