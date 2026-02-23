import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import ApplicantModel from "../models/applicant";
import validationErrorParser from "../util/validationErrorParser";

import type { RequestHandler } from "express";

export const getApplicant: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid applicant ID.");
    }

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
    const pageParam = req.query.page;
    const limitParam = req.query.limit;
    const sortByParam = req.query.sortBy;
    const orderParam = req.query.order;

    const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : NaN;
    const limit = typeof limitParam === "string" ? parseInt(limitParam, 10) : NaN;
    const sortBy = typeof sortByParam === "string" ? sortByParam : "clientName";
    const order = typeof orderParam === "string" && orderParam === "asc" ? 1 : -1;

    const sortOptions: Record<string, 1 | -1> = {
      [sortBy]: order,
      _id: order,
    };

    const pageProvided = pageParam !== undefined;
    const limitProvided = limitParam !== undefined;

    // If both page and limit are omitted, return all applicants
    if (!pageProvided && !limitProvided) {
      const applicants = await ApplicantModel.find().sort(sortOptions);
      res.status(200).json(applicants);
      return;
    }

    // If either param is present but invalid (NaN or < 1), return 400
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      res.status(400).json({ error: "Invalid pagination parameters." });
      return;
    }

    const skip = (page - 1) * limit;

    const [applicants, total] = await Promise.all([
      ApplicantModel.find().sort(sortOptions).skip(skip).limit(limit),
      ApplicantModel.countDocuments(),
    ]);

    res.status(200).json({
      data: applicants,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

type CreateApplicantBody = {
  clientNumber: string;
  clientName: string;
  dateSubmitted: Date;
  status?: string;
  dateOfBirth?: Date;
  race?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  housingStatus?: string;
  education?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

type UpdateApplicantBody = {
  clientNumber: string;
  clientName: string;
  dateSubmitted: Date;
  status?: string;
  dateOfBirth?: Date;
  race?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  housingStatus?: string;
  education?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

export const createApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const {
    clientNumber,
    clientName,
    dateSubmitted,
    status,
    dateOfBirth,
    race,
    gender,
    email,
    phoneNumber,
    housingStatus,
    education,
    convictionDetails,
    aidRequested,
    otherAidRequested,
    additionalComments,
    todos,
    notes,
    isCompleted,
  } = req.body as CreateApplicantBody;

  try {
    validationErrorParser(errors);

    const applicant = await ApplicantModel.create({
      clientNumber,
      clientName,
      dateSubmitted,
      status,
      dateOfBirth,
      race,
      gender,
      email,
      phoneNumber,
      housingStatus,
      education,
      convictionDetails,
      aidRequested,
      otherAidRequested,
      additionalComments,
      todos,
      notes,
      isCompleted,
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

    if (result.deletedCount === 0) {
      throw createHttpError(404, "Applicant not found.");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const {
    clientNumber,
    clientName,
    dateSubmitted,
    status,
    dateOfBirth,
    race,
    gender,
    email,
    phoneNumber,
    housingStatus,
    education,
    convictionDetails,
    aidRequested,
    otherAidRequested,
    additionalComments,
    todos,
    notes,
    isCompleted,
    _id,
  } = req.body as UpdateApplicantBody & {
    _id: string;
  };
  const { id } = req.params;

  try {
    validationErrorParser(errors);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid applicant ID.");
    }

    if (_id && id !== _id) {
      throw createHttpError(400, "Applicant ID Mismatch.");
    }

    const applicant = await ApplicantModel.findByIdAndUpdate(
      id,
      {
        clientNumber,
        clientName,
        dateSubmitted,
        status,
        dateOfBirth,
        race,
        gender,
        email,
        phoneNumber,
        housingStatus,
        education,
        convictionDetails,
        aidRequested,
        otherAidRequested,
        additionalComments,
        todos,
        notes,
        isCompleted,
      },
      { new: true },
    );

    if (applicant === null) {
      throw createHttpError(404, "Applicant not found.");
    }

    res.status(200).json(applicant);
  } catch (error) {
    next(error);
  }
};
