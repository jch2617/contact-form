import { formSubmissions } from "../../../data/formSubmissions";
import { FormSubmissionResponse } from "../../../types/FormSubmissionRequest";
import { FormSubmissionRequest } from "../../../types/FormSubmissionResponse";

export default function handler(
  req: any,
  res: any
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: FormSubmissionResponse[]): void; new (): any };
//     };
//   }
) {
    if (req.method === 'GET') {
        res.status(200).json(formSubmissions);
    } else if (req.method === 'POST') {
        const submission: FormSubmissionRequest = req.body.formData
        const newSubmission: FormSubmissionResponse = {
            id: Date.now(),
             email: submission.email,
             firstName: submission.firstName,
             lastName: submission.lastName,
             message: submission.lastName,
        }
        formSubmissions.push(newSubmission);
        res.status(200).json(formSubmissions);
    }
}

