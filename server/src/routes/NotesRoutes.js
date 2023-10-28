const {
  getOneNote,
  getManyNotes,
  postOneNote,
  updateOneNote,
  deleteOneNote,
} = require("../controllers/NotesController");

const express = require("express");

const router = express.Router();

router.get("/:id", getOneNote);
router.get("/", getManyNotes);
router.post("/", postOneNote);
router.put("/:id", updateOneNote);
router.delete("/:id", deleteOneNote);

module.exports = router;
