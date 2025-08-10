export interface Candidate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  age: number
  experience: number
  studyLevel: string
  location: string
  availability: string
  salary: {
    min: number
    max: number
    currency: string
  }
  avatar?: string
  cvUrl?: string
  status: CandidateStatus
  appliedJobs: AppliedJob[]
  talentPools: string[]
  tags: string[]
  rating: number
  notes: string
  createdAt: string
  updatedAt: string
}

export interface AppliedJob {
  id: string
  title: string
  company: string
  status: JobApplicationStatus
  appliedDate: string
  contractType: string
  duration: string
  location: string
  remote: boolean
}

export interface TalentPool {
  id: string
  name: string
  description: string
  color: string
  candidateCount: number
}

export enum CandidateStatus {
  NEW = 'new',
  CV_SELECTED = 'cv_selected',
  PHONE_EVALUATED = 'phone_evaluated',
  INTERVIEW_PASSED = 'interview_passed',
  OFFER_MADE = 'offer_made',
  HIRED = 'hired',
  REJECTED = 'rejected'
}

export enum JobApplicationStatus {
  APPLIED = 'applied',
  REVIEWING = 'reviewing',
  SHORTLISTED = 'shortlisted',
  INTERVIEWING = 'interviewing',
  OFFERED = 'offered',
  HIRED = 'hired',
  REJECTED = 'rejected'
}

export interface CandidateFilters {
  search: string
  status: CandidateStatus[]
  experience: [number, number][]
  location: string[]
  talentPools: string[]
  appliedJobs: string[]
  availability: string[]
  salary: {
    min: number
    max: number
  }
}

export interface CreateCandidateData {
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  experience: number
  studyLevel: string
  location: string
  availability: string
  salary: {
    min: number
    max: number
    currency: string
  }
  talentPools: string[]
  appliedJobs: string[]
  notes: string
}
