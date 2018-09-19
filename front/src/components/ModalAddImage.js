import React, { Component } from "react";
import {
  Modal,
  Button,
  Form
} from "semantic-ui-react";

class ModalAddImage extends Component {


  render() {
    return (
      <Modal open={this.props.openAddImage}>
        <Modal.Header>Selectionnez une Image</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit} error>
              <Form.Field>
                <label>URL</label>
                <input
                  placeholder="Entrez l'URL de l'image"
           
                />
              </Form.Field>
              <Form.Field>
                <label>description</label>
                <input
                  placeholder="Entrez une description"
 
                />
              </Form.Field>
              <Button type="submit" floated="right">
                Valider
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default ModalAddImage;