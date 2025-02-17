const notes = require("../../Model/notes");
const getNotes = async (req, res) => {
  const { isFav, sort } = req.query;
  console.log(sort, isFav);
  let findObj = {};
  if (isFav) {
    findObj = { ...findObj, is_fav: isFav === "true" ? true : false };
  }
  let sortObj = {};
  if (sort) {
    let sortingArray = sort.split(",");
    console.log(sortingArray);
    sortingArray.some((item) => {
      const [field, order] = item.split(":");
      if (item.includes("asc")) {
        sortObj[field] = 1;
      } else if (item.includes("desc")) {
        sortObj[field] = -1;
      } else {
        return res.status(400).send({ error: "Incorrect format for sorting!" });
      }
    });
    console.log(sortObj);
  }
  let allNotes = await notes.find(findObj).sort(sortObj);
  res.status(200).send({ data: allNotes });
};
module.exports = { getNotes };
// created_at:asc,title:desc....
//[title:desc]
//
