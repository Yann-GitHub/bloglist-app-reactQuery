import { useNavigate } from "react-router-dom";
import { useUserValue } from "../../contexts/UserContext";
import { useBlog } from "./useBlog.hook";
import { Button, Container, Row, Col, Form, ListGroup } from "react-bootstrap";

export const Blog = () => {
  const navigate = useNavigate();
  const { username } = useUserValue();
  const { blog, comment, setComment, handleDelete, handleLike, handleComment } =
    useBlog();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-end align-content-center w-100">
        <Button
          className="mb-3"
          variant="outline-secondary"
          onClick={() => navigate("/")}
        >
          Go back
        </Button>
      </div>

      <div>
        <h2 className="text-primary">{blog.title}</h2>
        <div>
          <Row>
            <Col>{`Added by ${blog.author}`}</Col>
          </Row>
          <Row>
            <Col>
              <a
                href={
                  blog.url.startsWith("http") ? blog.url : `https://${blog.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {blog.url}
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              {blog.likes} 💙{" "}
              <Button variant="outline-primary" onClick={handleLike}>
                like
              </Button>
            </Col>
          </Row>
          {blog.user.username === username && (
            <div className="d-flex justify-content-end align-content-center w-100">
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
          <h4 className="mt-3">Post a new comment</h4>
          <Form onSubmit={handleComment}>
            <Form.Group controlId="formComment">
              <Form.Control
                type="text"
                value={comment}
                placeholder="New comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end align-content-center w-100 mt-3">
              <Button variant="primary" type="submit">
                Add comment
              </Button>
            </div>
          </Form>
          {blog.comments && (
            <div className="mt-3">
              <ListGroup>
                {blog.comments.map((comment, index) => (
                  <ListGroup.Item
                    className="bg-secondary-subtle border-1 border-secondary mb-1"
                    key={index}
                  >
                    {comment.content}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
