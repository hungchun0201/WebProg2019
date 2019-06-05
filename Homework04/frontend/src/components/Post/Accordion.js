import React, { Component } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  CardTitle,
  CardText
} from "reactstrap";

class Example extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    let validPost = this.props.allPost.filter(
      item => item.author.name === this.props.data.name
    );
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          {this.props.data.name + " with " + validPost.length + " posts."}
        </Button>
        <Collapse isOpen={this.state.collapse}>
          {validPost.map((item, index) => {
            return (
              <Card>
                <CardBody>
                  <CardTitle className="cardTitle">
                    Title : {item.title}
                  </CardTitle>
                  <CardText>Content : {item.body}</CardText>
                </CardBody>
              </Card>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default Example;
