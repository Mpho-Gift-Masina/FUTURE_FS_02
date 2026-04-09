const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
} = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put("/:id/status", protect, updateLeadStatus);
router.post("/:id/notes", protect, addLeadNote);
router.delete("/:id", protect, deleteLead);

module.exports = router;