import type { Job } from './jobService'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_ENDPOINTS = {
  JOBS: '/jobs',
  DRAFTS: '/jobs/drafts',
  PUBLISH: '/jobs/publish',
  APPLICATIONS: '/jobs/applications'
} as const

// HTTP Headers
const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// API Response Types
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Error handling
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// HTTP Client
const httpClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      )
    }

    return response.json()
  },

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      )
    }

    return response.json()
  },

  async put<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      )
    }

    return response.json()
  },

  async patch<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      )
    }

    return response.json()
  },

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      )
    }

    return response.json()
  }
}

// Job API Service
export const jobApiService = {
  // Create a new job
  async createJob(jobData: Omit<Job, 'id'>): Promise<Job> {
    try {
      const response = await httpClient.post<ApiResponse<Job>>(
        API_ENDPOINTS.JOBS,
        jobData
      )

      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || 'Failed to create job',
          400
        )
      }

      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  },

  // Save job as draft
  async saveDraft(jobData: Omit<Job, 'id'>): Promise<Job> {
    try {
      const response = await httpClient.post<ApiResponse<Job>>(
        API_ENDPOINTS.DRAFTS,
        { ...jobData, status: 'Draft' }
      )

      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || 'Failed to save draft',
          400
        )
      }

      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  },

  // Get job by ID
  async getJobById(jobId: number): Promise<Job | null> {
    try {
      const response = await httpClient.get<ApiResponse<Job>>(
        `${API_ENDPOINTS.JOBS}/${jobId}`
      )

      if (!response.success) {
        return null
      }

      return response.data || null
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null
      }
      throw error
    }
  },

  // Update existing job
  async updateJob(jobId: number, jobData: Partial<Job>): Promise<Job> {
    try {
      const response = await httpClient.put<ApiResponse<Job>>(
        `${API_ENDPOINTS.JOBS}/${jobId}`,
        jobData
      )

      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || 'Failed to update job',
          400
        )
      }

      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  },

  // Delete job
  async deleteJob(jobId: number): Promise<boolean> {
    try {
      const response = await httpClient.delete<ApiResponse<{ deleted: boolean }>>(
        `${API_ENDPOINTS.JOBS}/${jobId}`
      )

      return response.success && response.data?.deleted === true
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  },

  // Publish job (change status from Draft to Public)
  async publishJob(jobId: number): Promise<Job> {
    try {
      const response = await httpClient.patch<ApiResponse<Job>>(
        `${API_ENDPOINTS.PUBLISH}/${jobId}`,
        { status: 'Public' }
      )

      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || 'Failed to publish job',
          400
        )
      }

      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  },

  // Get all jobs with pagination and filters
  async getJobs(params: {
    page?: number
    limit?: number
    status?: string
    search?: string
    location?: string
    type?: string
  } = {}): Promise<PaginatedResponse<Job>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) searchParams.append('page', params.page.toString())
      if (params.limit) searchParams.append('limit', params.limit.toString())
      if (params.status) searchParams.append('status', params.status)
      if (params.search) searchParams.append('search', params.search)
      if (params.location) searchParams.append('location', params.location)
      if (params.type) searchParams.append('type', params.type)

      const queryString = searchParams.toString()
      const url = queryString ? `${API_ENDPOINTS.JOBS}?${queryString}` : API_ENDPOINTS.JOBS

      const response = await httpClient.get<ApiResponse<PaginatedResponse<Job>>>(url)

      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || 'Failed to fetch jobs',
          400
        )
      }

      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  },

  // Get job applications
  async getJobApplications(jobId: number, params: {
    page?: number
    limit?: number
    status?: string
  } = {}): Promise<PaginatedResponse<any>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) searchParams.append('page', params.page.toString())
      if (params.limit) searchParams.append('limit', params.limit.toString())
      if (params.status) searchParams.append('status', params.status)

      const queryString = searchParams.toString()
      const url = queryString
        ? `${API_ENDPOINTS.APPLICATIONS}/${jobId}?${queryString}`
        : `${API_ENDPOINTS.APPLICATIONS}/${jobId}`

      const response = await httpClient.get<ApiResponse<PaginatedResponse<any>>>(url)

      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || 'Failed to fetch applications',
          400
        )
      }

      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      )
    }
  }
}

export default jobApiService
