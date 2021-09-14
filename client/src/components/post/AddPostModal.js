import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // context
  const { showAddPostModal, setShowAddPostModal, addPost, setToast } =
    useContext(PostContext);

  //   state
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
  });

  const { title, description, url } = newPost;

  const clearModal = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
    });
    setShowAddPostModal(false);
  };

  const closeDialog = () => {
    clearModal();
  };

  const handleInputChange = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    clearModal();
    setToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
        <Modal.Header>
          <Modal.Title>What do yout want to learn?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={handleInputChange}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                row={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Url tutorials"
                name="url"
                value={url}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              LearnIt
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostModal;
