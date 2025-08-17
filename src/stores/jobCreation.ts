import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Job } from '@/services/jobService'
import { jobApiService } from '@/services/jobApiService'

export interface JobCreationData {
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

export const useJobCreationStore = defineStore('jobCreation', () => {
  // State
  const jobData = ref<Partial<JobCreationData>>({
    status: 'Draft',
    date: new Date().toISOString().split('T')[0],
    createdDate: new Date().toISOString(),
    applicationForm: {
      fields: [],
      requiredFields: [],
      simplifiedApplication: false,
      template: 'classic'
    },
    workflow: {
      stages: []
    },
    team: {
      hiringManager: '',
      recruiter: '',
      interviewers: []
    },
    promotion: {
      careerSite: true,
      jobBoards: [],
      socialMedia: []
    }
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentStep = ref(1)

  // Computed
  const isFormValid = computed(() => {
    // Basic validation - can be enhanced
    return !!(
      jobData.value.title &&
      jobData.value.company?.name &&
      jobData.value.jobDescription?.summary
    )
  })

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

  // Actions
  const updateJobData = (data: Partial<JobCreationData>) => {
    jobData.value = { ...jobData.value, ...data }
  }

  const updateStepData = (step: number, data: any) => {
    switch (step) {
      case 1:
        // Job Description data
        if (data.title) jobData.value.title = data.title
        if (data.company) jobData.value.company = { ...jobData.value.company, ...data.company }
        if (data.jobDescription) jobData.value.jobDescription = { ...jobData.value.jobDescription, ...data.jobDescription }
        if (data.jobSettings) jobData.value.jobSettings = { ...jobData.value.jobSettings, ...data.jobSettings }
        break
      case 2:
        // Application Form data
        if (data.applicationForm) jobData.value.applicationForm = { ...jobData.value.applicationForm, ...data.applicationForm }
        break
      case 3:
        // Workflow data
        if (data.workflow) jobData.value.workflow = { ...jobData.value.workflow, ...data.workflow }
        break
      case 4:
        // Team data
        if (data.team) jobData.value.team = { ...jobData.value.team, ...data.team }
        break
      case 5:
        // Promotion data
        if (data.promotion) jobData.value.promotion = { ...jobData.value.promotion, ...data.promotion }
        break
    }
  }

  const setCurrentStep = (step: number) => {
    currentStep.value = step
  }

  const createJob = async (): Promise<Job | null> => {
    if (!isFormValid.value) {
      error.value = 'Please complete all required fields'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      // Prepare the job data for API
      const jobPayload = {
        ...jobData.value,
        hired: false,
        applications: 0,
        applicationsList: []
      } as Omit<Job, 'id'>

      const createdJob = await jobApiService.createJob(jobPayload)

      // Reset form after successful creation
      resetForm()

      return createdJob
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create job'
      return null
    } finally {
      isLoading.value = false
    }
  }

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

  const loadJobForEditing = async (jobId: number): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const job = await jobApiService.getJobById(jobId)
      if (job) {
        jobData.value = { ...job }
        return true
      }
      return false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load job'
      return false
    } finally {
      isLoading.value = false
    }
  }

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

  const resetForm = () => {
    jobData.value = {
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      createdDate: new Date().toISOString(),
      applicationForm: {
        fields: [],
        requiredFields: [],
        simplifiedApplication: false,
        template: 'classic'
      },
      workflow: {
        stages: []
      },
      team: {
        hiringManager: '',
        recruiter: '',
        interviewers: []
      },
      promotion: {
        careerSite: true,
        jobBoards: [],
        socialMedia: []
      }
    }
    currentStep.value = 1
    error.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    jobData,
    isLoading,
    error,
    currentStep,

    // Computed
    isFormValid,
    canProceedToNext,

    // Actions
    updateJobData,
    updateStepData,
    setCurrentStep,
    createJob,
    saveDraft,
    loadJobForEditing,
    updateJob,
    resetForm,
    clearError
  }
})
