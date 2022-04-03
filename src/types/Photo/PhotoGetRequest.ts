import {
  Request,
} from "express";
import * as core from "express-serve-static-core";

export interface PhotoGetOptions {
  withUserId?: string;
}

export interface PhotoGetRequest extends Request {
  query: core.Query & PhotoGetOptions;
}
