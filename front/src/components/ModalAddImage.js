import React, { Component } from "react";
import {
  Modal,
  Button,
  Form
} from "semantic-ui-react";

class ModalAddImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSrc:'',
      imageDesc:'',
    };
  }

  handleClose = () => {
    this.props.closeAddImage(this.props.openAddImage);
  };

  handleSubmit = () => {
    this.props.submitAddImage(this.state.imageSrc,this.state.imageDesc);
  };

  handleUrlChange = (event) => {
    this.setState({
      imageSrc:event.target.value
    })
  }

  handleDescriptionChange = (event) => {
    this.setState({
      imageDesc:event.target.value
    })
  }

  render() {
    console.log("ModalAddImage props : ", this.props)

    return (
      <Modal open={this.props.openAddImage} onClose={this.handleClose}>
        <Modal.Header>Selectionnez une Image</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit} error>
              <Form.Field>
                <label>URL</label>
                <input
                  placeholder="Entrez l'URL de l'image"
                  value={this.state.imageSrc}
                  onChange={this.handleUrlChange}           
                />
              </Form.Field>
              <Form.Field>
                <label>description</label>
                <input
                  placeholder="Entrez une description"
                  value={this.state.imageDesc}
                  onChange={this.handleDescriptionChange} 
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