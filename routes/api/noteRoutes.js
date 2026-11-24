const router = require("express").Router();
const { Note } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

// Protect all note routes
router.use(authMiddleware);


// GET /api/notes
// Get only notes belonging to logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST /api/notes
// Create a note for logged-in user
router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT /api/notes/:id
// Update only your own note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "No note found with this id!",
      });
    }

    // Check note ownership
    if (note.user.toString() !== req.user._id) {
      return res.status(403).json({
        message: "User is not authorized to update this note.",
      });
    }

    // Update only allowed fields
    if (req.body.title !== undefined) {
      note.title = req.body.title;
    }

    if (req.body.content !== undefined) {
      note.content = req.body.content;
    }

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE /api/notes/:id
// Delete only your own note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "No note found with this id!",
      });
    }

    // Check note ownership
    if (note.user.toString() !== req.user._id) {
      return res.status(403).json({
        message: "User is not authorized to delete this note.",
      });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
export default router;