import { useUser } from "./useUser.hook";
import { Container, Button, Card, ListGroup, Alert } from "react-bootstrap";

export const User = () => {
  const { user, navigate } = useUser();

  if (!user) {
    return <Alert variant="danger">User not found</Alert>;
  }
  return (
    <Container>
      {/* <button onClick={() => navigate(-1)}>Back</button> */}
      <div className="d-flex justify-content-end align-content-center w-100">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="text-primary text-capitalize">
            {user.name} {user.username}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Added blogs</Card.Subtitle>
          {user.blogs.length === 0 ? (
            <Alert variant="info">No blogs added</Alert>
          ) : (
            <ListGroup variant="flush">
              {user.blogs.map((blog) => (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
