//DRAFT JUST TO REMOVE ERRORS IN ROUTES

import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import ApplicantModel from "src/models/applicant";
import validationErrorParser from "src/util/validationErrorParser";

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

type CreateApplicantBody = {
  //Replace with new model
  title: string;
  description?: string;
  isChecked?: boolean;
  assignee?: string;
};

type UpdateApplicantBody = {
  //Replace with new model
  title: string;
  description?: string;
  isChecked?: boolean;
  assignee?: string;
};

export const createApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  // Extract assignee along with other fields
  const { title, description, isChecked, assignee } = req.body as CreateApplicantBody;

  try {
    validationErrorParser(errors);

    const applicant = await ApplicantModel.create({
      //Replace with new model
      title,
      description,
      isChecked,
      assignee, // Save the assignee
      dateCreated: Date.now(),
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
  // Extract ALL fields: title, description, assignee, isChecked
  const { title, description, assignee, isChecked, _id } = req.body as UpdateApplicantBody & {
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
        title,
        description,
        assignee,
        isChecked,
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
