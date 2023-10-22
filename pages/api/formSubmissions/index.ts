import { formSubmissions } from "../../../data/formSubmissions";
import { FormSubmissionResponse } from "../../../types/FormSubmissionResponse";

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    res.status(200).json(formSubmissions);
  } else if (req.method === "POST") {
    const newSubmission: FormSubmissionResponse = {
      id: Date.now(),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      message: req.body.message,
    };
    formSubmissions.push(newSubmission);

    res.status(201).json(newSubmission);
  }
}
