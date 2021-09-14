import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  // context
  const {
    postState: { post, posts },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setToast,
  } = useContext(PostContext);

  //   state
  const [UpdatedPost, setUpdatedPost] = useState(post);

  useEffect(() => setUpdatedPost(post), [post]);

  const { title, description, url, status } = UpdatedPost;

  const handleInputChange = (e) =>
    setUpdatedPost({ ...UpdatedPost, [e.target.name]: e.target.value });

  const clearModal = () => {
    setShowUpdatePostModal(false);
  };

  const closeDialog = () => {
    setUpdatedPost(post);
    clearModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(UpdatedPost);
    clearModal();
    setToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
        <Modal.Header>
          <Modal.Title>Making process?</Modal.Title>
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
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                as="textarea"
                row={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                type="text"
                placeholder="Url tutorials"
                name="url"
                value={url}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={handleInputChange}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePostModal;
