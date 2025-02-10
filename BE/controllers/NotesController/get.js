const notes = require("../../Model/notes");
const getNotes = async (req, res) => {
  const allNotes = await notes.find({});
  res.status(200).send({ data: allNotes });
};
module.exports = { getNotes };
