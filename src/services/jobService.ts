import mockData from '@/assets/mock.json'

export interface Job {
  id: number
  title: string
  location?: string
  date: string
  status: string
  hired: boolean
  type?: string
  company: {
    name: string
    url: string
    description: string
    logo: string | null
    banner: string | null
  }
  jobDescription: {
    title: string
    summary: string
    requirements: string[]
    responsibilities: string[]
    benefits: string[]
  }
  jobSettings: {
    contractType: string
    experienceLevel: string
    salary: {
      min: number
      max: number
      currency: string
    }
    location: {
      city: string
      country: string
      remote: boolean
      hybrid: boolean
    }
    duration: string
    startDate: string
  }
  applicationForm: {
    fields: string[]
    requiredFields: string[]
  }
  workflow: {
    stages: Array<{
      id: number
      name: string
      description: string
      color: string
    }>
  }
  team: {
    hiringManager: string
    recruiter: string
    interviewers: string[]
  }
  promotion: {
    careerSite: boolean
    jobBoards: string[]
    socialMedia: string[]
  }
  // Additional properties for JobDetail view compatibility
  applications: number
  createdDate: string
  applicationsList: Array<{
    id: number
    name: string
    email: string
    phone: string
    status: string
    appliedDate: string
    source: string
    avatar: string | null
    resume: string
    coverLetter: string | null
  }>
}

class JobService {
  private jobs: Job[] = mockData.jobs

  // Get all jobs
  getAllJobs(): Job[] {
    return this.jobs
  }

  // Get job by ID
  getJobById(id: number): Job | undefined {
    return this.jobs.find(job => job.id === id)
  }

  // Create new job
  createJob(jobData: Omit<Job, 'id'>): Job {
    const newJob: Job = {
      ...jobData,
      id: this.getNextId()
    }
    this.jobs.push(newJob)
    return newJob
  }

  // Update existing job
  updateJob(id: number, jobData: Partial<Job>): Job | null {
    const jobIndex = this.jobs.findIndex(job => job.id === id)
    if (jobIndex === -1) return null

    this.jobs[jobIndex] = {
      ...this.jobs[jobIndex],
      ...jobData
    }
    return this.jobs[jobIndex]
  }

  // Delete job
  deleteJob(id: number): boolean {
    const jobIndex = this.jobs.findIndex(job => job.id === id)
    if (jobIndex === -1) return false

    this.jobs.splice(jobIndex, 1)
    return true
  }

  // Get next available ID
  private getNextId(): number {
    const maxId = Math.max(...this.jobs.map(job => job.id), 0)
    return maxId + 1
  }

  // Search jobs
  searchJobs(query: string): Job[] {
    const lowercaseQuery = query.toLowerCase()
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(lowercaseQuery) ||
      (job.location && job.location.toLowerCase().includes(lowercaseQuery)) ||
      job.company.name.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Filter jobs by status
  filterJobsByStatus(status: string): Job[] {
    return this.jobs.filter(job => job.status === status)
  }

  // Filter jobs by type
  filterJobsByType(type: string): Job[] {
    return this.jobs.filter(job => job.type && job.type === type)
  }
}

export const jobService = new JobService()
export default jobService
