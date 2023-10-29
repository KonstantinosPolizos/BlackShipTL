const { PrismaClient } = require("@prisma/client");

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
    const user = req.user;
    const id = parseInt(req.params.id);

    const oneNote = await prisma.post.findUnique({
      where: {
        authorId: user.id,
        id: id,
      },
    });

    if (!oneNote) {
      throw new Error("Get notes: can't find this combination");
    }

    res.status(200).json({ message: JSON.stringify(oneNote) });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { title, description } = req.body;
    const user = req.user;
    const id = parseInt(req.params.id);

    const getPrevious = await prisma.post.findUnique({
      where: {
        id: id,
        authorId: user.id,
      },
    });

    if (!getPrevious) {
      throw new Error("Update one note: note doesn't exist!");
    }

    const updatedNote = await prisma.post.update({
      where: {
        authorId: user.id,
        id: id,
      },
      data: {
        title: title || getPrevious.title,
        description: description || getPrevious.description,
      },
    });

    if (!updatedNote) {
      throw new Error("Update one note: note didn't updated!");
    }

    res.status(200).json({ message: "Notes updated!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOneNote = async (req, res) => {
  try {
    const user = req.user;
    const id = parseFloat(req.params.id);

    const deletedNote = await prisma.post.delete({
      where: {
        id: id,
        authorId: user.id,
      },
    });

    if (!deletedNote) {
      throw new Error(
        "Delete one note: note doesn't exist or can't be deleted!"
      );
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOneNote,
  getManyNotes,
  postOneNote,
  updateOneNote,
  deleteOneNote,
};
