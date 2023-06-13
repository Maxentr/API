import { z } from "zod"

export const ISO_DATE_REGEX = /\d{4}-[01]\d-[0-3]\d/
export const ISO_DATETIME_REGEX =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

export const hasISODate = z
  .string()
  .regex(ISO_DATETIME_REGEX, "date must be a valid ISO date")
