import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Timestamp } from "firebase/firestore"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDate(dateOrTimestamp: Date | Timestamp): Date {
  if (dateOrTimestamp instanceof Date) {
    return dateOrTimestamp;
  }
  if (dateOrTimestamp instanceof Timestamp) {
    return dateOrTimestamp.toDate();
  }
  return new Date(dateOrTimestamp);
}
