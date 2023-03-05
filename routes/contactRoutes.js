const express = require("express");
const router = express.Router();
const verifyJwt = require('../middleware/verifywt')
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} = require("../controllers/contactController");
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

app.use(verifyJwt);
router.route("/")
    .get(getContacts)
    .post(createContact)
    .delete(deleteAllContacts)

    
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;