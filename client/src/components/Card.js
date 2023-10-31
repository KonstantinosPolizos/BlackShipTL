import {
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Textarea,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const SimpleCard = (token) => {
  const [open, setOpen] = React.useState(false);
  const [notesList, setNotesList] = useState([]);
  const [focusId, setFocusId] = useState();
  const [clickEdit, setClickEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const notes = await axios.get(process.env.ENDPOINT + "api/notes", {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        });

        var finalNotes = [...JSON.parse(notes.data.message), []];
        setNotesList(finalNotes);
      } catch (error) {
        alert(error.response.data.error);
      }
    })();
  }, [token.token, notesList]);

  const handleEdit = async (e) => {
    const id = e.target.closest(".card").id;

    if (clickEdit) {
      setClickEdit(false);
      setFocusId("");
      const endpoint = process.env.ENDPOINT + `api/notes/${id}`;

      try {
        await axios.put(
          endpoint,
          {
            title: title,
            description: description,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      setClickEdit(true);
      setFocusId(id);
    }
  };

  const handleDelete = async (e) => {
    const id = e.target.closest(".card").id;

    const endpoint = process.env.ENDPOINT + `api/notes/${id}`;

    try {
      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleSave = async (e) => {
    setOpen(!open);
    const endpoint = process.env.ENDPOINT + `api/notes/`;

    try {
      await axios.post(
        endpoint,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setDescription("");
    setTitle("");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 gap-3">
        {notesList.length > 0 ? (
          notesList.map((val, index) => {
            if (index !== notesList.length - 1) {
              return (
                <Card className="card mt-6 w-96" id={val.id}>
                  <CardBody>
                    {clickEdit && parseInt(focusId) === val.id ? (
                      <Textarea
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        className="min-h-full"
                        label="Title"
                      >
                        {val.title}
                      </Textarea>
                    ) : (
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                      >
                        {val.title}
                      </Typography>
                    )}
                    {clickEdit && parseInt(focusId) === val.id ? (
                      <Textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        label="Description"
                      >
                        {val.description}
                      </Textarea>
                    ) : (
                      <Typography>{val.description}</Typography>
                    )}
                  </CardBody>
                  <CardFooter className="pt-0">
                    <div className="flex items-center gap-4">
                      <IconButton
                        className="rounded-full"
                        onClick={(e) => handleEdit(e)}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </IconButton>

                      <IconButton
                        className="rounded-full"
                        onClick={(e) => handleDelete(e)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </div>
                  </CardFooter>
                </Card>
              );
            } else {
              return (
                <Card className="mt-6 h-50 flex justify-center items-center">
                  <IconButton onClick={handleOpen}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </IconButton>
                </Card>
              );
            }
          })
        ) : (
          <></>
        )}
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Add new note.</DialogHeader>
          <DialogBody>
            <Textarea
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="min-h-full"
              label="Title"
            ></Textarea>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label="Description"
            ></Textarea>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={(e) => handleSave(e)}
            >
              <span>Save</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default SimpleCard;
