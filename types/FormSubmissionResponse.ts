export type FormSubmissionResponse = {
  id: number;
  firstName: string;
  lastName?: string | null;
  email: string;
  message: string;
};
