import React, { Component, Fragment } from "react";
import {
  Container,
  Image,
  Segment,
  Header,
  Modal,
  Icon,
  Button,
  Input
} from "semantic-ui-react";

import ModalAddImage from "./ModalAddImage";

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddImage: false,
      imageList: [],
      imageSrc: "",
      desc: "",
      id: "",
      disableImgDesc: true,
      disableImgSrc: true

    };
  }

  componentDidMount() {
    fetch("/getImages")
      .then(res => res.json())
      .then(images => this.setState({ imageList: images }));
  }

  handleImageModal = () => {
    this.setState({
      imageSrc: "",
      desc: "",
      id: "",
      disableImgDesc: true
    });
  };

  openModalAddImage = () => {
    console.log("ModalAddImage opened");
    this.setState({
      openAddImage: true
    });
  };

  closeModalAddImage = () => {
    console.log("ModalAddImage closed");
    this.setState({
      openAddImage: false
    });
  };

  fetchImages() {
    fetch("/getImages")
      .then(res => res.json())
      .then(images => this.setState({ imageList: images }));
  }

  handleImageSubmit = (imageSrc, imageDesc) => {
    console.log("form has been submitted");
    console.log("image src is : %s and desc is : %s", imageSrc, imageDesc);

    fetch("/postImage", {
      method: "POST",
      body: JSON.stringify({
        imageSrc: imageSrc,
        desc: imageDesc
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(
        console.log(
          "JSON sent to server",
          JSON.stringify({
            imageSrc: imageSrc,
            desc: imageDesc
          })
        )
      )
      .then(this.fetchImages()) // Re-render the image list in the view
      .then(this.setState({ openModal: false })); // Close Modal
  };

  handleUrlChange = event => {
    this.setState({
      imageSrc: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      desc: event.target.value
    });
  };

  handleDeleteImage = id => {
    console.log("Delete image with id = %s", id);
    fetch("/deleteImage", {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(
        console.log(
          "JSON object : image id to delete",
          JSON.stringify({
            id: id
          })
        )
      )
      .then(this.setState({ openModal: false })) // Close Modals
      .then(this.fetchImages()); // Re-render the image list in the view
  };

  editImageDesc = (id, src, desc) => {
    console.log("editImageDesc", desc);
    this.setState({
      disableImgDesc: false,
      imageSrc: src,
      desc: desc,
      id: id
    });
  };

  editImageSrc = (id, src, desc) => {
    console.log("editImageSrc", desc);
    this.setState({
      disableImgSrc: false,
      imageSrc: src,
      desc: desc,
      id: id
    });
  };

  handleEditImage = (id, src, desc) => {
    console.log(
      "Edit image with id = %s, src = %s and desc = %s",
      id,
      src,
      desc
    );
    this.setState({
      openEditModal: true,
      imageSrc: src,
      desc: desc,
      id: id
    });
  };

  handleImageEditSubmit = () => {
    this.setState({
          disableImgDesc: true,
          disableImgSrc: true
        })
    console.log("modifications sent");

    fetch("/putImage", {
      method: "PUT",
      body: JSON.stringify({
        id: this.state.id,
        imageSrc: this.state.imageSrc,
        desc: this.state.desc
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(
        console.log(
          "JSON modified sent to server",
          JSON.stringify({
            id: this.state.id,
            imageSrc: this.state.imageSrc,
            desc: this.state.desc
          })
        )
      )
      .then(this.setState({ openEditModal: false })) // Close Modal
      .then(this.fetchImages()); // Re-render the image list in the view
  }

  handleCloseEditModal = () => {
    this.setState({
      openEditModal: false
    })
  }

  render() {
    const { imageList } = this.state // This syntax is used for destructuring an object 

    console.log("images are", imageList);

    return (
      <Fragment>
        <Container fluid>
          <Segment padded>
            <Image.Group size="small">
              {imageList.map((image, i) => {
                return (
                  <Modal
                    key={i}
                    onClose={this.handleImageModal}
                    trigger={
                      <Image
                        src={image.imageSrc}
                        alt={image.description}
                        size="tiny"
                      />
                    }
                  >
                    <Modal.Header>
                      Identifiant de l'image : {image._id}
                      <Button
                        circular
                        floated="right"
                        icon="trash alternate outline"
                        onClick={() => {
                          this.handleDeleteImage(image._id);
                        }}
                      />
                    </Modal.Header>
                    <Modal.Content image>
                      <Image wrapped size="medium" src={image.imageSrc} />
                      <Modal.Description>
                        <Header>Récit</Header>
                        <p>{image.description}</p>

                        <Input
                          value={this.state.desc}
                          onChange={this.handleDescriptionChange}
                          disabled={this.state.disableImgDesc}
                        />

                        {this.state.disableImgDesc ? (
                          <Button
                            onClick={() =>
                              this.editImageDesc(
                                image._id,
                                image.imageSrc,
                                image.description
                              )
                            }
                            circular
                            icon="edit outline"
                          />
                       
                        ) : (
                          <Button onClick={this.handleImageEditSubmit} icon="check" circular/>
                      
                        )}

                        <p>URL de l'image</p>
                        <Input
                          value={this.state.imageSrc}
                          onChange={this.handleUrlChange}
                          disabled={this.state.disableImgSrc}
                        />

                        {this.state.disableImgSrc ? (
                          <Button
                            onClick={() =>
                              this.editImageSrc(
                                image._id,
                                image.imageSrc,
                                image.description
                              )
                            }
                            circular
                            icon="edit outline"
                          />
                        ) : (
                          <Button onClick={this.handleImageEditSubmit} icon="check" circular/>
                            
                        )}

                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                );
              })}
            </Image.Group>
            <Button
              onClick={this.openModalAddImage}
              icon
              circular
              floated="right"
              size="large"
              color="green"
            >
              <Icon name="plus" size="large" color="white" />
            </Button>
            <ModalAddImage
              openAddImage={this.state.openAddImage}
              closeAddImage={this.closeModalAddImage}
              submitAddImage={this.handleImageSubmit}
            />
          </Segment>
        </Container>
      </Fragment>
    )
  }
}

export default ImageContainer