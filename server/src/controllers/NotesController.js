const { PrismaClient } = require("@prisma/client");
const { json } = require("express");

const prisma = new PrismaClient();

const getManyNotes = async (req, res) => {
  try {
    const user = req.user;

    const allNotes = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
    });

    if (!allNotes) {
      throw new Error("Get notes: can't find this combination");
    }

    res.status(200).json({ message: JSON.stringify(allNotes) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneNote = async (req, res) => {
  try {
    res.status(200).json({ message: "Get one notes" });
  } catch (error) {
    res.status(400).json({ message: "Error in get one note" });
  }
};

const postOneNote = async (req, res) => {
  try {
    const user = req.user;

    const { title, description } = req.body;

    if (!title) {
      throw new Error("Post note: title field is mendatory!");
    }

    const addNote = await prisma.post.create({
      data: {
        authorId: user.id,
        title: title,
        description: description || "",
      },
    });

    if (!addNote) {
      throw new Error("Post note: can't add note to db.");
    }

    res.status(200).json({ message: "Note added!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOneNote = async (req, res) => {
  try {
    res.status(200).json({ message: "Update one note" });
  } catch (error) {
    res.status(400).json({ message: "Error in update one note" });
  }
};

const deleteOneNote = async (req, res) => {
  try {
    res.status(200).json({ message: "Delete one note" });
  } catch (error) {
    res.status(400).json({ message: "Error in delete one note" });
  }
};

module.exports = {
  getOneNote,
  getManyNotes,
  postOneNote,
  updateOneNote,
  deleteOneNote,
};
