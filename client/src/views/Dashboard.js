import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/post/SinglePost";
import AddPostModal from "../components/post/AddPostModal";
import AddIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/post/UpdatePostModal";

const Dashboard = () => {
  //context
  const {
    postState: { posts, postsLoading, post },
    getPosts,
    setShowAddPostModal,
    toast: { show, message, type },
    setToast,
  } = useContext(PostContext);

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  //   getPost
  useEffect(() => getPosts(), []);

  let body;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length > 0) {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* open add post modal */}
        {/* <OverlayTrigger
          placement="left"
          overlay={<Tooltip>add a new to learnIt</Tooltip>}
        > */}
        <Button
          className="btn-floating"
          onClick={() => setShowAddPostModal(true)}
        >
          <img src={AddIcon} width="60" height="60" alt="Add" />
        </Button>
        {/* </OverlayTrigger> */}
      </>
    );
  } else {
    body = (
      <>
        <Card className="text-center m-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>Click the button below to track your to learn</Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post && <UpdatePostModal />}

      {/* show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() => setToast({ show: false, message: null, type: "" })}
        delay={3000}
        autohide={true}
        animation={false}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
