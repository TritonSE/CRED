import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import ApplicantModel from "../models/applicant";
import validationErrorParser from "../util/validationErrorParser";

import type { RequestHandler } from "express";

export const getApplicant: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const applicant = await ApplicantModel.findById(id);

    if (applicant === null) {
      throw createHttpError(404, "Applicant not found.");
    }

    res.status(200).json(applicant);
  } catch (error) {
    next(error);
  }
};

export const getAllApplicants: RequestHandler = async (req, res, next) => {
  try {
    const applicants = await ApplicantModel.find().sort({ firstName: "desc" });

    res.status(200).json(applicants);
  } catch (error) {
    next(error);
  }
};

type CreateApplicantBody = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  raceEthnicity: string;
  gender: string;
  cdcrNumber?: string;
  description?: string;
  typeOfAid: string[];
  otherAidDescription?: string;
  status: string;
  actionPlan?: string;
};

type UpdateApplicantBody = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  raceEthnicity: string;
  gender: string;
  cdcrNumber?: string;
  description?: string;
  typeOfAid: string[];
  otherAidDescription?: string;
  status: string;
  actionPlan?: string;
};

export const createApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  // Extract assignee along with other fields
  const {
    firstName,
    lastName,
    dateOfBirth,
    raceEthnicity,
    gender,
    cdcrNumber,
    description,
    typeOfAid,
    otherAidDescription,
    status,
    actionPlan,
  } = req.body as CreateApplicantBody;

  try {
    validationErrorParser(errors);

    const applicant = await ApplicantModel.create({
      firstName,
      lastName,
      dateOfBirth,
      raceEthnicity,
      gender,
      cdcrNumber,
      description,
      typeOfAid,
      otherAidDescription,
      status,
      actionPlan,
    });

    res.status(201).json(applicant);
  } catch (error) {
    next(error);
  }
};

export const removeApplicant: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ApplicantModel.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const {
    firstName,
    lastName,
    dateOfBirth,
    raceEthnicity,
    gender,
    cdcrNumber,
    description,
    typeOfAid,
    otherAidDescription,
    status,
    actionPlan,
    _id,
  } = req.body as UpdateApplicantBody & {
    _id: string;
  };
  const { id } = req.params;

  try {
    validationErrorParser(errors);

    if (_id && id !== _id) {
      throw createHttpError(404, "Applicant ID Mismatch.");
    }

    // Update all fields in the database
    const applicant = await ApplicantModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dateOfBirth,
        raceEthnicity,
        gender,
        cdcrNumber,
        description,
        typeOfAid,
        otherAidDescription,
        status,
        actionPlan,
      },
      { new: true }, // Optional: returns the modified document
    );

    if (applicant === null) {
      throw createHttpError(404, "Applicant not found.");
    }

    const updatedApplicant = await ApplicantModel.findById(id);

    res.status(200).json(updatedApplicant);
  } catch (error) {
    next(error);
  }
};
