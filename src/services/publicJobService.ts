import { jobService, type Job } from './jobService'

export interface PublicJob {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  skills: string[]
  postedDate: string
  createdDate: string
  isRemote: boolean
  experienceLevel: string
  contractType: string
  benefits: string[]
  requirements: string[]
  responsibilities: string[]
  applicationDeadline?: string
  totalApplications: number
}

export interface JobApplication {
  id: number
  jobId: number
  candidateName: string
  candidateEmail: string
  candidatePhone?: string
  resume: string
  coverLetter?: string
  portfolioUrl?: string
  appliedDate: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  source: string
}

class PublicJobService {
  private applications: JobApplication[] = []
  private nextApplicationId = 1

  // Convert internal job format to public format
  private convertToPublicJob(job: Job): PublicJob {
    // Handle different location formats in mock data
    let location = ''
    let isRemote = false

    if (job.jobSettings && job.jobSettings.location) {
      // New format with nested location object
      location = `${job.jobSettings.location.city}, ${job.jobSettings.location.country}`
      isRemote = job.jobSettings.location.remote || false
    } else if (job.location) {
      // Old format with simple location string
      location = job.location
      isRemote = false // Default to false for old format
    } else {
      location = 'Location not specified'
      isRemote = false
    }

    // Handle different type formats
    let jobType = ''
    if (job.jobSettings && job.jobSettings.contractType) {
      jobType = job.jobSettings.contractType
    } else if (job.type) {
      jobType = job.type
    } else {
      jobType = 'Type not specified'
    }

    // Handle different experience level formats
    let experienceLevel = ''
    if (job.jobSettings && job.jobSettings.experienceLevel) {
      experienceLevel = job.jobSettings.experienceLevel
    } else {
      experienceLevel = 'Level not specified'
    }

    // Handle salary formatting
    let salary = 'Salary not specified'
    if (job.jobSettings && job.jobSettings.salary) {
      salary = `${job.jobSettings.salary.currency} ${job.jobSettings.salary.min.toLocaleString()} - ${job.jobSettings.salary.max.toLocaleString()}`
    }

    const result = {
      id: job.id,
      title: job.title,
      company: job.company?.name || 'Company not specified',
      location: location,
      type: jobType,
      salary: salary,
      description: job.jobDescription?.summary || 'Description not available',
      skills: job.jobDescription?.requirements || [],
      postedDate: this.formatPostedDate(job.createdDate || job.date || new Date().toISOString()),
      createdDate: job.createdDate || job.date || new Date().toISOString(),
      isRemote: isRemote,
      experienceLevel: experienceLevel,
      contractType: jobType,
      benefits: job.jobDescription?.benefits || [],
      requirements: job.jobDescription?.requirements || [],
      responsibilities: job.jobDescription?.responsibilities || [],
      applicationDeadline: this.calculateDeadline(job.createdDate || job.date || new Date().toISOString()),
      totalApplications: job.applications || 0
    }

    return result
  }

  // Get all public jobs (only published/active jobs)
  getPublicJobs(): PublicJob[] {
    const allJobs = jobService.getAllJobs()

    const publicJobs = allJobs
      .filter(job => job.status === 'Public' && !job.hired)
      .map(job => this.convertToPublicJob(job))

    return publicJobs
  }

  // Get public job by ID
  getPublicJobById(id: number): PublicJob | undefined {
    const job = jobService.getJobById(id)
    if (job && job.status === 'Public' && !job.hired) {
      return this.convertToPublicJob(job)
    }
    return undefined
  }

  // Search public jobs
  searchPublicJobs(query: string): PublicJob[] {
    const publicJobs = this.getPublicJobs()
    const lowercaseQuery = query.toLowerCase()

    return publicJobs.filter(job =>
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      job.location.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Filter public jobs
  filterPublicJobs(filters: {
    location?: string
    type?: string
    experienceLevel?: string
    isRemote?: boolean
    salaryRange?: { min: number; max: number }
  }): PublicJob[] {
    let filteredJobs = this.getPublicJobs()

    if (filters.location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    if (filters.type) {
      filteredJobs = filteredJobs.filter(job =>
        job.type.toLowerCase() === filters.type!.toLowerCase()
      )
    }

    if (filters.experienceLevel) {
      filteredJobs = filteredJobs.filter(job =>
        job.experienceLevel.toLowerCase() === filters.experienceLevel!.toLowerCase()
      )
    }

    if (filters.isRemote !== undefined) {
      filteredJobs = filteredJobs.filter(job => job.isRemote === filters.isRemote)
    }

    if (filters.salaryRange) {
      filteredJobs = filteredJobs.filter(job => {
        const salaryMatch = job.salary.match(/\d+/g)
        if (salaryMatch && salaryMatch.length >= 2) {
          const minSalary = parseInt(salaryMatch[0])
          const maxSalary = parseInt(salaryMatch[1])
          return minSalary >= filters.salaryRange!.min && maxSalary <= filters.salaryRange!.max
        }
        return true
      })
    }

    return filteredJobs
  }

  // Get available filter options
  getFilterOptions() {
    const publicJobs = this.getPublicJobs()

    const locations = [...new Set(publicJobs.map(job => job.location))]
    const types = [...new Set(publicJobs.map(job => job.type))]
    const experienceLevels = [...new Set(publicJobs.map(job => job.experienceLevel))]

    return {
      locations: locations.sort(),
      types: types.sort(),
      experienceLevels: experienceLevels.sort()
    }
  }

  // Apply to a job
  applyToJob(jobId: number, applicationData: {
    candidateName: string
    candidateEmail: string
    candidatePhone?: string
    resume: string
    coverLetter?: string
    portfolioUrl?: string
    source?: string
  }): JobApplication {
    const application: JobApplication = {
      id: this.nextApplicationId++,
      jobId,
      candidateName: applicationData.candidateName,
      candidateEmail: applicationData.candidateEmail,
      candidatePhone: applicationData.candidatePhone,
      resume: applicationData.resume,
      coverLetter: applicationData.coverLetter,
      portfolioUrl: applicationData.portfolioUrl,
      appliedDate: new Date().toISOString(),
      status: 'pending',
      source: applicationData.source || 'Career Site'
    }

    this.applications.push(application)

    // Update the job's application count
    const job = jobService.getJobById(jobId)
    if (job) {
      job.applications = (job.applications || 0) + 1
    }

    return application
  }

  // Get applications for a specific job (for admin/recruiter use)
  getJobApplications(jobId: number): JobApplication[] {
    return this.applications.filter(app => app.jobId === jobId)
  }

  // Get all applications (for admin/recruiter use)
  getAllApplications(): JobApplication[] {
    return [...this.applications]
  }

  // Update application status (for admin/recruiter use)
  updateApplicationStatus(applicationId: number, status: JobApplication['status']): boolean {
    const application = this.applications.find(app => app.id === applicationId)
    if (application) {
      application.status = status
      return true
    }
    return false
  }

  // Helper methods
  private formatPostedDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  private calculateDeadline(createdDate: string): string {
    const date = new Date(createdDate)
    date.setDate(date.getDate() + 30) // 30 days from creation
    return date.toISOString().split('T')[0]
  }

  // Get popular jobs (most applications)
  getPopularJobs(limit: number = 5): PublicJob[] {
    const publicJobs = this.getPublicJobs()
    return publicJobs
      .sort((a, b) => b.totalApplications - a.totalApplications)
      .slice(0, limit)
  }

  // Get recent jobs
  getRecentJobs(limit: number = 5): PublicJob[] {
    const publicJobs = this.getPublicJobs()
    return publicJobs
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      .slice(0, limit)
  }
}

export const publicJobService = new PublicJobService()
export default publicJobService
