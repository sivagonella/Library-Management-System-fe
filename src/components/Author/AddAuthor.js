import { Card } from "react-bootstrap";
import classes from "./AddAuthor.module.css";
import Input from "../UI/Input";
import { useState } from "react";
import TextArea from "../UI/TextArea";
import Button from "../UI/Button";

const AddAuthor = () => {
  const [author, setAuthor] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const addAuthorHandler = async () => {
    const response = await fetch("http://localhost:8080/demo/authors", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    const responseData = await response.json();
    if (responseData) {
      window.alert("Author added successfully");
    }
    setAuthor({
      name: "",
      email: "",
      bio: "",
    });
  };

  return (
    <Card className={classes.card}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>Add Author</h3>
        <Input
          className={classes.input}
          label="Author name"
          type="text"
          id="name"
          value={author.name}
          onChange={(id, value) =>
            setAuthor((state) => {
              return { ...state, [id]: value };
            })
          }
        />
        <Input
          className={classes.input}
          label="Author email"
          type="email"
          id="email"
          value={author.email}
          onChange={(id, value) =>
            setAuthor((state) => {
              return { ...state, [id]: value };
            })
          }
        />
        <TextArea
          className={classes.input}
          id="bio"
          label="Author bio"
          value={author.bio}
          onChange={(id, value) =>
            setAuthor((state) => {
              return { ...state, [id]: value };
            })
          }
        />
        <div style={{ textAlign: "center" }}>
          <Button type="submit" onClick={addAuthorHandler}>
            Add author
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddAuthor;
