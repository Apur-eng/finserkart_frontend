export interface ServiceEditorial {
  overview: string;
  benefits: string[];
  eligibility: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
}

// Editorial scaffolding only. The client must review service-specific details and
// verify all regulatory language before these drafts are presented as advice.
export const SERVICE_EDITORIAL: Record<string, ServiceEditorial> = {
  '1': {
    overview: 'Support with reviewing the service request, organising the information supplied, and coordinating the application assistance included in the confirmed scope.',
    benefits: ['Understand the information and documents requested for this service.', 'Keep the agreed professional scope and listed pricing visible before applying.', 'Coordinate questions with the assistance team before starting.'],
    eligibility: ['Applicability depends on the applicant, business activity, and current rules. Ask a qualified adviser to confirm your situation before proceeding.'],
    process: ['Discuss the applicant and service scope.', 'Review the information and documents available.', 'Confirm the engagement scope and applicable charges.', 'Proceed with the agreed assistance after the details are confirmed.'],
    faqs: [
      { question: 'Does every business need this service?', answer: 'Applicability can depend on individual circumstances and current requirements. Please confirm with a qualified adviser.' },
      { question: 'How long will the service take?', answer: 'Timing depends on the completeness of information, the confirmed scope, and any external review. No processing time is guaranteed here.' },
    ],
  },
  '2': {
    overview: 'Support for organising tax return information and coordinating the filing assistance included in the confirmed service scope.',
    benefits: ['Review the records requested for your selected service.', 'Understand the listed professional and government charges before applying.', 'Raise questions about scope before sharing documents.'],
    eligibility: ['The appropriate return and reporting requirements depend on your income, sources, and current rules. Confirm these details with a qualified tax professional.'],
    process: ['Discuss the relevant financial year and information available.', 'Organise the supporting records for review.', 'Confirm the scope and charges with the service team.', 'Proceed with the agreed assistance after review.'],
    faqs: [
      { question: 'Which return should I file?', answer: 'That depends on your income, activities, and current filing rules. A qualified tax professional can assess your circumstances.' },
      { question: 'Can filing time be guaranteed?', answer: 'No timing is guaranteed on this page. Turnaround depends on record completeness, review, and the agreed scope.' },
    ],
  },
  '3': {
    overview: 'Formation assistance for applicants exploring a private limited company, with information gathering and coordination based on the confirmed engagement scope.',
    benefits: ['Review the information currently listed for the service.', 'Clarify the scope and listed charges before you apply.', 'Coordinate questions about documents and applicant details with the service team.'],
    eligibility: ['The appropriate entity structure and applicant requirements depend on current law and the proposed business. Seek qualified advice before deciding.'],
    process: ['Discuss the proposed business and applicant details.', 'Review the available documents and identify open questions.', 'Confirm the engagement scope and applicable charges.', 'Proceed with the agreed assistance after all details are checked.'],
    faqs: [
      { question: 'Is this structure right for every business?', answer: 'No single structure is right for every business. Discuss your plans and circumstances with a qualified professional.' },
      { question: 'Are all government charges included?', answer: 'The catalogue shows professional and government charge fields separately where values are listed. Final charges may need confirmation before engagement.' },
    ],
  },
};
