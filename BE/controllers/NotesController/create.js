const notes = require("../../Model/notes");

const createNote = async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).send({ error: "Title and text are required" });
  }
  try {
    const foundNote = await notes.find({ title: title });
    if (foundNote) {
      return res
        .status(400)
        .send({ error: "Note with this title already exists" });
    }
    if (title.length > 25 || title.length < 3) {
      return res
        .status(400)
        .send({ error: "Title should be between 3 to 25 characters" });
    }
    const newNote = await notes.create({ title, text });
    res.status(200).send({ resp: "New note created!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = { createNote };
