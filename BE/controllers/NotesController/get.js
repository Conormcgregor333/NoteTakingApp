const notes = require("../../Model/notes");
const getNotes = async (req, res) => {
  const { isFav, sort, field } = req.query;
  console.log(sort, field, isFav);
  let findObj = {};
  if (isFav) {
    findObj = { ...findObj, is_fav: isFav === "true" ? true : false };
  }
  let sortObj = {};
  if (sort && field) {
    sortObj[field] = sort === "asc" ? 1 : -1;
  }
  let allNotes = await notes.find(findObj).sort(sortObj);
  res.status(200).send({ data: allNotes });
};
module.exports = { getNotes };
