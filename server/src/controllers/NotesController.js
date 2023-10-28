const getOneNote = async (req, res) => {
  try {
    res.status(200).json({ message: "Get one note" });
  } catch (error) {
    res.status(400).json({ message: "Error in get one note" });
  }
};

const getManyNotes = async (req, res) => {
  try {
    res.status(200).json({ message: "Get many notes" });
  } catch (error) {
    res.status(400).json({ message: "Error in get many notes" });
  }
};

const postOneNote = async (req, res) => {
  try {
    res.status(200).json({ message: "Post one note" });
  } catch (error) {
    res.status(400).json({ message: "Error in post one note" });
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
