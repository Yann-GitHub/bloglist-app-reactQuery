import { useState } from "react";
import { useBlogForm } from "./BlogForm.hook";
import { Form, Button } from "react-bootstrap";

export const BlogForm = ({ blogFormRef }) => {
  const { handleCreateBlog, title, setTitle, url, setUrl, author, setAuthor } =
    useBlogForm({ blogFormRef });

  return (
    <>
      <Form className="blog-form" onSubmit={handleCreateBlog}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <div className="button-container w-100 d-flex justify-content-center align-items-center">
          <Button variant="outline-primary" type="submit" className="mt-3">
            Save blog
          </Button>
        </div>
      </Form>
    </>
  );
};
