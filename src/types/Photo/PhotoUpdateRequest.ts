import { Request } from "express";

export interface PhotoUpdateBody extends Record<string, string | boolean | number> {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export interface PhotoUpdateRequest extends Request {
  body: PhotoUpdateBody;
}
