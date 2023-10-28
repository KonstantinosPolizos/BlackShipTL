const {
  getOneNote,
  getManyNotes,
  postOneNote,
  updateOneNote,
  deleteOneNote,
} = require("../controllers/NotesController");
const validateToken = require("../middlewares/TokenValidation");

const express = require("express");

const router = express.Router();

router.get("/:id", validateToken, getOneNote);
router.get("/", validateToken, getManyNotes);
router.post("/", validateToken, postOneNote);
router.put("/:id", validateToken, updateOneNote);
router.delete("/:id", validateToken, deleteOneNote);

module.exports = router;
