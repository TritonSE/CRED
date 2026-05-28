import express from "express";

import * as ApplicantController from "../controllers/applicant";
import { requireAuth } from "../util/auth";
import { requireTurnstile } from "../util/turnstile";
import * as ApplicantValidator from "../validators/applicant";

/**
 * Applicant REST routes.
 * Validation middleware runs before controller handlers on write/delete operations.
 */
const router = express.Router();

// List endpoint with optional pagination/sort query params.
router.get("/", requireAuth, ApplicantController.getAllApplicants);

// Read a single applicant by document id.
router.get("/:id", requireAuth, ApplicantController.getApplicant);
// Create a new applicant record (public, needs anti-spam).
router.post(
  "/",
  requireTurnstile,
  ApplicantValidator.createApplicant,
  ApplicantController.createApplicant,
);
// Full-record update by id.
router.put(
  "/:id",
  requireAuth,
  ApplicantValidator.updateApplicant,
  ApplicantController.updateApplicant,
);
// Delete by id with body/id validation.
router.delete(
  "/:id",
  requireAuth,
  ApplicantValidator.removeApplicant,
  ApplicantController.removeApplicant,
);

export default router;
