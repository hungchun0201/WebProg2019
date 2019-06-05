import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import {
  POSTS_QUERY,
  USERS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION
} from "../../graphql";
import Post from "../../components/Post/Post";
import UserAccordion from "../../components/Post/Accordion";
import classes from "./App.module.css";
import "./style.css";
let unsubscribe = null;

class App extends Component {
  state = {
    formTitle: "",
    formBody: "",
    currUser: "1"
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { formTitle, formBody, currUser } = this.state;

    if (!formTitle || !formBody) return;

    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: currUser
      }
    });

    this.setState({
      formTitle: "",
      formBody: "",
      currUser: "1"
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost;
                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup>
                      <Label for="users">User </Label>
                      <Query query={USERS_QUERY}>
                        {({ loading, error, data }) => {
                          if (loading) return "Loading...";
                          if (error) return `Error! ${error.message}`;
                          return (
                            <select
                              name="users"
                              onChange={e => {
                                this.setState({ currUser: e.target.value });
                                console.log(e.target.value);
                              }}
                            >
                              {data.users &&
                                data.users.map(user => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </select>
                          );
                        }}
                      </Query>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e => {
                            this.setState({ formTitle: e.target.value });
                            console.log("titleChange");
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                );
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) {
                  console.error(error);
                  return <p>Error :(((</p>;
                }
                console.log(data);
                const posts = data.users.map(
                  (item, id) => (
                    <UserAccordion
                      data={item}
                      allPost={data.posts}
                      key={item.id}
                    />
                  )

                  // <Post data={post} key={id} />
                );
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      const newPost = subscriptionData.data.post.data;
                      console.log("newPost", subscriptionData);
                      const submittedUserPost = prev.users.filter(
                        item => item.name === newPost.author.name
                      )[0].posts;
                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      };
                    }
                  });
                //subscribeToMore is a function, accept two args,
                //first one is the schema of subscribtion,that is,what will subscriptionData get.
                //second one is the query result you want to change(use subscribeToMore in a Query Tag)
                return <div>{posts}</div>;
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
