import express from "express";

import * as ApplicantController from "../controllers/applicant";
import * as ApplicantValidator from "../validators/applicant";

/**
 * Define the routes for the router
 */
const router = express.Router();

router.get("/:id", ApplicantController.getApplicant);
router.post("/", ApplicantValidator.createApplicant, ApplicantController.createApplicant);
router.put("/:id", ApplicantValidator.updateApplicant, ApplicantController.updateApplicant);
router.delete("/:id", ApplicantController.removeApplicant);

export default router;
