# Job Backend Integration Documentation

## Overview

This document explains how the job creation system integrates with the backend API to create, update, and manage jobs. The system uses a centralized store (`useJobCreationStore`) to collect data from all 5 steps of the job creation wizard and sends it to the backend via the `jobApiService`.

## Architecture

### 1. Job Creation Store (`src/stores/jobCreation.ts`)

The store manages the complete job creation state across all steps:

- **State Management**: Centralized storage for all job data
- **Step Validation**: Ensures each step is complete before proceeding
- **Data Collection**: Aggregates data from all form steps
- **API Integration**: Handles communication with backend endpoints

### 2. Job API Service (`src/services/jobApiService.ts`)

Handles all HTTP communication with the backend:

- **HTTP Client**: Built-in fetch-based client with error handling
- **Authentication**: Automatic token inclusion in headers
- **Error Handling**: Comprehensive error management with custom `ApiError` class
- **Response Processing**: Standardized API response format

### 3. CreateJob Component (`src/views/Jobs/CreateJob.vue`)

The main orchestrator that:

- **Renders Steps**: Displays the 5-step job creation wizard
- **Data Collection**: Calls `getFormData()` on each step component
- **Store Integration**: Updates the store with collected data
- **API Calls**: Triggers job creation or draft saving

## Backend API Endpoints

### Base Configuration

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
```

### Available Endpoints

| Endpoint | Method | Purpose | Description |
|-----------|--------|---------|-------------|
| `/jobs` | POST | Create Job | Creates a new job with complete data |
| `/jobs` | GET | List Jobs | Retrieves jobs with pagination and filters |
| `/jobs/:id` | GET | Get Job | Retrieves a specific job by ID |
| `/jobs/:id` | PUT | Update Job | Updates an existing job |
| `/jobs/:id` | DELETE | Delete Job | Deletes a job |
| `/jobs/drafts` | POST | Save Draft | Saves job as draft |
| `/jobs/publish/:id` | PATCH | Publish Job | Changes job status from Draft to Public |
| `/jobs/applications/:id` | GET | Get Applications | Retrieves applications for a job |

## Data Flow

### 1. Step-by-Step Data Collection

```typescript
const collectStepData = async (step: number) => {
  let stepData: any = {}
  
  switch (step) {
    case 1: // Job Description
      stepData = jobDescriptionRef.value?.getFormData()
      break
    case 2: // Application Form
      stepData = applicationFormRef.value?.getFormData()
      break
    case 3: // Workflow
      stepData = workflowRef.value?.getFormData()
      break
    case 4: // Job Team
      stepData = jobTeamRef.value?.getFormData()
      break
    case 5: // Promotion
      stepData = promoteRef.value?.getFormData()
      break
  }
  
  if (Object.keys(stepData).length > 0) {
    updateStepData(step, stepData)
  }
}
```

### 2. Complete Job Data Structure

```typescript
interface JobCreationData {
  // Step 1: Job Description
  title: string
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
  
  // Step 2: Application Form
  applicationForm: {
    fields: string[]
    requiredFields: string[]
    simplifiedApplication: boolean
    template: string
  }
  
  // Step 3: Workflow
  workflow: {
    stages: Array<{
      id: number
      name: string
      description: string
      color: string
      actions: Array<{
        type: string
        config: any
      }>
    }>
  }
  
  // Step 4: Job Team
  team: {
    hiringManager: string
    recruiter: string
    interviewers: string[]
  }
  
  // Step 5: Promotion
  promotion: {
    careerSite: boolean
    jobBoards: string[]
    socialMedia: string[]
  }
  
  // Metadata
  status: string
  date: string
  createdDate: string
}
```

## API Request Examples

### 1. Create Job

```typescript
// Frontend: Store action
const createJob = async (): Promise<Job | null> => {
  if (!isFormValid.value) {
    error.value = 'Please complete all required fields'
    return null
  }

  isLoading.value = true
  error.value = null

  try {
    const jobPayload = {
      ...jobData.value,
      hired: false,
      applications: 0,
      applicationsList: []
    } as Omit<Job, 'id'>

    const createdJob = await jobApiService.createJob(jobPayload)
    resetForm()
    return createdJob
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create job'
    return null
  } finally {
    isLoading.value = false
  }
}
```

**Backend Request:**
```http
POST /api/jobs
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Senior Frontend Developer",
  "company": {
    "name": "Tech Corp",
    "url": "https://techcorp.com",
    "description": "Leading technology company"
  },
  "jobDescription": {
    "title": "Senior Frontend Developer",
    "summary": "We are looking for an experienced frontend developer...",
    "requirements": ["Vue.js", "TypeScript", "5+ years experience"],
    "responsibilities": ["Develop user interfaces", "Code review"],
    "benefits": ["Competitive salary", "Remote work", "Health insurance"]
  },
  "jobSettings": {
    "contractType": "Full-time",
    "experienceLevel": "Senior",
    "salary": {
      "min": 80000,
      "max": 120000,
      "currency": "USD"
    },
    "location": {
      "city": "New York",
      "country": "USA",
      "remote": true,
      "hybrid": false
    },
    "duration": "Permanent",
    "startDate": "2025-01-15"
  },
  "applicationForm": {
    "fields": ["resume", "coverLetter", "portfolio"],
    "requiredFields": ["resume"],
    "simplifiedApplication": false,
    "template": "classic"
  },
  "workflow": {
    "stages": [
      {
        "id": 1,
        "name": "Application Review",
        "description": "Initial application screening",
        "color": "#1976d2",
        "actions": []
      }
    ]
  },
  "team": {
    "hiringManager": "John Doe",
    "recruiter": "Jane Smith",
    "interviewers": ["John Doe", "Mike Johnson"]
  },
  "promotion": {
    "careerSite": true,
    "jobBoards": ["LinkedIn", "Indeed"],
    "socialMedia": ["Twitter", "LinkedIn"]
  },
  "status": "Draft",
  "date": "2025-01-15",
  "createdDate": "2025-01-10T10:00:00Z",
  "hired": false,
  "applications": 0,
  "applicationsList": []
}
```

### 2. Save Draft

```typescript
// Frontend: Store action
const saveDraft = async (): Promise<boolean> => {
  isLoading.value = true
  error.value = null

  try {
    const draftData = {
      ...jobData.value,
      status: 'Draft',
      hired: false,
      applications: 0,
      applicationsList: []
    } as Omit<Job, 'id'>

    await jobApiService.saveDraft(draftData)
    return true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to save draft'
    return false
  } finally {
    isLoading.value = false
  }
}
```

**Backend Request:**
```http
POST /api/jobs/drafts
Content-Type: application/json
Authorization: Bearer <token>

{
  // Same data structure as create job, but with status: "Draft"
}
```

### 3. Update Job

```typescript
// Frontend: Store action
const updateJob = async (jobId: number): Promise<boolean> => {
  if (!isFormValid.value) {
    error.value = 'Please complete all required fields'
    return false
  }

  isLoading.value = true
  error.value = null

  try {
    const jobPayload = {
      ...jobData.value,
      hired: false,
      applications: 0,
      applicationsList: []
    } as Omit<Job, 'id'>

    await jobApiService.updateJob(jobId, jobPayload)
    return true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update job'
    return false
  } finally {
    isLoading.value = false
  }
}
```

**Backend Request:**
```http
PUT /api/jobs/123
Content-Type: application/json
Authorization: Bearer <token>

{
  // Updated job data
}
```

### 4. Publish Job

```typescript
// Frontend: API service call
const publishJob = async (jobId: number): Promise<Job> => {
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
    // Error handling
  }
}
```

**Backend Request:**
```http
PATCH /api/jobs/publish/123
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "Public"
}
```

## Error Handling

### 1. API Error Class

```typescript
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
```

### 2. Error Response Format

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

### 3. HTTP Status Codes

- **200**: Success
- **201**: Created (for new jobs)
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (job doesn't exist)
- **500**: Internal Server Error

## Authentication

### 1. Token Storage

```typescript
const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}
```

### 2. Token Usage

All API requests automatically include the authentication token:

```typescript
const response = await fetch(`${API_BASE_URL}${url}`, {
  method: 'POST',
  headers: getHeaders(), // Includes Authorization: Bearer <token>
  body: JSON.stringify(data)
})
```

## Environment Configuration

### 1. Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Fallback Configuration

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
```

## Step Component Integration

### 1. Required Interface

Each step component must implement:

```typescript
interface StepComponentExpose {
  getFormData: () => any
}
```

### 2. Example Implementation

```vue
<template>
  <!-- Your form content -->
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const formData = ref({
  title: '',
  company: { name: '', url: '', description: '' }
})

const getFormData = () => {
  return {
    title: formData.value.title,
    company: formData.value.company
  }
}

defineExpose({
  getFormData
})
</script>
```

## Validation

### 1. Step Validation

```typescript
const canProceedToNext = computed(() => {
  switch (currentStep.value) {
    case 1:
      return !!(
        jobData.value.title &&
        jobData.value.company?.name &&
        jobData.value.jobDescription?.summary
      )
    case 2:
      return jobData.value.applicationForm?.fields?.length > 0
    case 3:
      return jobData.value.workflow?.stages?.length > 0
    case 4:
      return !!(
        jobData.value.team?.hiringManager &&
        jobData.value.team?.recruiter
      )
    case 5:
      return true // Promotion step is optional
    default:
      return false
  }
})
```

### 2. Form Validation

```typescript
const isFormValid = computed(() => {
  return !!(
    jobData.value.title &&
    jobData.value.company?.name &&
    jobData.value.jobDescription?.summary
  )
})
```

## Testing

### 1. Mock API Responses

For development/testing, you can mock the API responses:

```typescript
// Mock successful job creation
const mockCreateJobResponse = {
  success: true,
  data: {
    id: 123,
    title: "Senior Frontend Developer",
    // ... other job data
  },
  message: "Job created successfully"
}
```

### 2. Error Testing

Test error scenarios:

```typescript
// Mock validation error
const mockValidationError = {
  success: false,
  message: "Validation failed",
  error: "REQUIRED_FIELDS_MISSING"
}
```

## Best Practices

### 1. Data Collection

- Collect data from each step before proceeding
- Validate data at each step
- Store data centrally in the store

### 2. Error Handling

- Always handle API errors gracefully
- Show user-friendly error messages
- Log errors for debugging

### 3. Loading States

- Show loading indicators during API calls
- Disable buttons during operations
- Provide visual feedback for all actions

### 4. Data Persistence

- Save drafts automatically or on user request
- Allow users to resume job creation
- Validate data before submission

## Troubleshooting

### 1. Common Issues

- **CORS Errors**: Ensure backend allows requests from frontend origin
- **Authentication Errors**: Check token validity and storage
- **Validation Errors**: Verify all required fields are filled
- **Network Errors**: Check API endpoint availability

### 2. Debug Steps

1. Check browser console for errors
2. Verify API endpoint URLs
3. Check authentication token
4. Validate request payload structure
5. Test API endpoints independently

### 3. Logging

Enable detailed logging for debugging:

```typescript
// Add to your API service
console.log('API Request:', { url, method, data })
console.log('API Response:', response)
```

## Conclusion

This integration provides a robust, scalable solution for job creation that:

- ✅ Collects data from all 5 steps
- ✅ Validates data at each step
- ✅ Sends complete data to backend
- ✅ Handles errors gracefully
- ✅ Provides user feedback
- ✅ Supports draft saving
- ✅ Enables job updates
- ✅ Manages authentication
- ✅ Follows best practices

The system is designed to be maintainable, testable, and user-friendly while providing a seamless experience for creating and managing jobs.
