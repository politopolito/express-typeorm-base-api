import { Request } from "express";

export interface PhotoCreateBody extends Record<string, string | boolean | number> {
  name: string;
  description: string;
  filename: string;
  isPublic?: boolean;
  userId: number;
}

export interface PhotoCreateRequest extends Request {
  body: PhotoCreateBody;
}
