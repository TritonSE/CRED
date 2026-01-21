import express from "express";
import * as ApplicantController from "src/controllers/applicant";
import * as ApplicantValidator from "src/validators/applicant";

//GET: get an applicant based on id
//POST: create applicant
//PUT: Edit applicant/status
//DELETE: delete an applicant

const router = express.Router();

router.get("/:id", ApplicantController.getApplicant);
router.post("/", ApplicantValidator.createApplicant, ApplicantController.createApplicant);
router.put("/:id", ApplicantValidator.updateApplicant, ApplicantController.updateApplicant);
router.delete("/:id", ApplicantController.removeApplicant);

export default router;
