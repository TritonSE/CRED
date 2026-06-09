import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import mongoose from "mongoose";

import ApplicantModel from "../models/applicant";
import validationErrorParser from "../util/validationErrorParser";

import type { RequestHandler } from "express";

/**
 * Fetch a single applicant by MongoDB id.
 */
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

// Fields clients are allowed to sort by. Anything else falls back to the default
// so we don't expose internal fields or pay for scans on unindexed columns.
const ALLOWED_SORT_FIELDS = [
  "applicantNumber",
  "applicantName",
  "dateSubmitted",
  "status",
  "createdAt",
  "updatedAt",
] as const;

const DEFAULT_SORT_FIELD = "dateSubmitted";

// Safety cap when no pagination params are supplied, to avoid returning the
// entire collection as the dataset grows.
const DEFAULT_MAX_LIMIT = 100;

export const getAllApplicants: RequestHandler = async (req, res, next) => {
  try {
    const pageParam = req.query.page;
    const limitParam = req.query.limit;
    const sortByParam = req.query.sortBy;
    const orderParam = req.query.order;

    const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
    const limit = typeof limitParam === "string" ? parseInt(limitParam, 10) : DEFAULT_MAX_LIMIT;
    const requestedSortBy = typeof sortByParam === "string" ? sortByParam : DEFAULT_SORT_FIELD;
    const sortBy = (ALLOWED_SORT_FIELDS as readonly string[]).includes(requestedSortBy)
      ? requestedSortBy
      : DEFAULT_SORT_FIELD;
    const order = typeof orderParam === "string" && orderParam === "asc" ? 1 : -1;

    // Secondary _id sort keeps ordering deterministic when sortBy values tie.
    const sortOptions: Record<string, 1 | -1> = {
      [sortBy]: order,
      _id: order,
    };

    // If either param is present but invalid (NaN or < 1), throw an HTTP error so the
    // global error handler formats the response consistently.
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw createHttpError(400, "Invalid pagination parameters.");
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
  applicantNumber: string;
  applicantName: string;
  status?: string;
  dateOfBirth: Date;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

type UpdateApplicantBody = {
  applicantNumber: string;
  applicantName: string;
  dateSubmitted: Date;
  status?: string;
  dateOfBirth: Date;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted: boolean;
};

/**
 * Create a new applicant document from a validated request body.
 */
export const createApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const {
    applicantNumber,
    applicantName,
    status,
    dateOfBirth,
    race,
    gender,
    email,
    address,
    phoneNumber,
    housingStatus,
    educationStatus,
    employmentStatus,
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
      applicantNumber,
      applicantName,
      dateSubmitted: new Date(),
      status,
      dateOfBirth,
      race,
      gender,
      email,
      address,
      phoneNumber,
      housingStatus,
      educationStatus,
      employmentStatus,
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
  const errors = validationResult(req);
  const { id } = req.params;

  try {
    validationErrorParser(errors);

    const result = await ApplicantModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw createHttpError(404, "Applicant not found.");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Replace an existing applicant record by id.
 * This endpoint expects a full update payload and optionally checks body `_id` against route `:id`.
 */
export const updateApplicant: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const {
    applicantNumber,
    applicantName,
    dateSubmitted,
    status,
    dateOfBirth,
    race,
    gender,
    email,
    address,
    phoneNumber,
    housingStatus,
    educationStatus,
    employmentStatus,
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
        applicantNumber,
        applicantName,
        dateSubmitted,
        status,
        dateOfBirth,
        race,
        gender,
        email,
        address,
        phoneNumber,
        housingStatus,
        educationStatus,
        employmentStatus,
        convictionDetails,
        aidRequested,
        otherAidRequested,
        additionalComments,
        todos,
        notes,
        isCompleted,
      },
      { new: true, runValidators: true },
    );

    if (applicant === null) {
      throw createHttpError(404, "Applicant not found.");
    }

    res.status(200).json(applicant);
  } catch (error) {
    next(error);
  }
};
