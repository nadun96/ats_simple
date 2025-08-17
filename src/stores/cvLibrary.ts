import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CV {
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
  experience: string
  location: string
  skills: string[]
  isFavorite: boolean
  uploadDate: string
  lastViewed: string | null
  notes: string
  tags: string[]
  matchScore: number
}

export interface CVFilters {
  search?: string
  status?: string
  experience?: string
  location?: string
  skills?: string[]
  source?: string
  dateRange?: string
  favoritesOnly?: boolean
}

export const useCVLibraryStore = defineStore('cvLibrary', () => {
  // State
  const cvs = ref<CV[]>([])
  const filters = ref<CVFilters>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Mock data - replace with API calls
  const mockCVs: CV[] = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      status: 'New',
      appliedDate: '2025-01-15T10:30:00Z',
      source: 'Career Site',
      avatar: null,
      resume: 'resume_jean_dupont.pdf',
      coverLetter: 'cover_jean_dupont.pdf',
      experience: 'Senior',
      location: 'Paris',
      skills: ['Java', 'Spring Framework', 'Microservices', 'SQL'],
      isFavorite: false,
      uploadDate: '2025-01-15T10:30:00Z',
      lastViewed: null,
      notes: 'Strong Java developer with microservices experience',
      tags: ['Java', 'Senior', 'Microservices'],
      matchScore: 85
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '+33 6 98 76 54 32',
      status: 'CV Selected',
      appliedDate: '2025-01-14T14:20:00Z',
      source: 'LinkedIn',
      avatar: null,
      resume: 'resume_marie_martin.pdf',
      coverLetter: null,
      experience: 'Mid Level',
      location: 'Lyon',
      skills: ['JavaScript', 'Vue.js', 'Node.js', 'MongoDB'],
      isFavorite: true,
      uploadDate: '2025-01-14T14:20:00Z',
      lastViewed: '2025-01-16T09:15:00Z',
      notes: 'Good frontend skills, needs backend experience',
      tags: ['JavaScript', 'Frontend', 'Vue.js'],
      matchScore: 72
    },
    {
      id: 3,
      name: 'Pierre Dubois',
      email: 'pierre.dubois@email.com',
      phone: '+33 6 55 44 33 22',
      status: 'Phone Evaluated',
      appliedDate: '2025-01-13T09:15:00Z',
      source: 'Indeed',
      avatar: null,
      resume: 'resume_pierre_dubois.pdf',
      coverLetter: 'cover_pierre_dubois.pdf',
      experience: 'Junior',
      location: 'Marseille',
      skills: ['Python', 'Django', 'PostgreSQL', 'Git'],
      isFavorite: false,
      uploadDate: '2025-01-13T09:15:00Z',
      lastViewed: '2025-01-15T16:30:00Z',
      notes: 'Promising junior developer, good Python skills',
      tags: ['Python', 'Junior', 'Django'],
      matchScore: 68
    },
    {
      id: 4,
      name: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      phone: '+33 6 11 22 33 44',
      status: 'Interview Scheduled',
      appliedDate: '2025-01-12T11:45:00Z',
      source: 'Referral',
      avatar: null,
      resume: 'resume_sophie_bernard.pdf',
      coverLetter: 'cover_sophie_bernard.pdf',
      experience: 'Lead',
      location: 'Toulouse',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
      isFavorite: true,
      uploadDate: '2025-01-12T11:45:00Z',
      lastViewed: '2025-01-16T14:20:00Z',
      notes: 'Excellent technical lead, strong full-stack skills',
      tags: ['React', 'Lead', 'Full-stack'],
      matchScore: 92
    },
    {
      id: 5,
      name: 'Lucas Moreau',
      email: 'lucas.moreau@email.com',
      phone: '+33 6 99 88 77 66',
      status: 'New',
      appliedDate: '2025-01-16T08:30:00Z',
      source: 'Glassdoor',
      avatar: null,
      resume: 'resume_lucas_moreau.pdf',
      coverLetter: null,
      experience: 'Entry Level',
      location: 'Nantes',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      isFavorite: false,
      uploadDate: '2025-01-16T08:30:00Z',
      lastViewed: null,
      notes: 'Fresh graduate, basic frontend skills',
      tags: ['Entry Level', 'Frontend', 'React'],
      matchScore: 45
    },
    {
      id: 6,
      name: 'Emma Rousseau',
      email: 'emma.rousseau@email.com',
      phone: '+33 6 77 66 55 44',
      status: 'CV Selected',
      appliedDate: '2025-01-11T15:20:00Z',
      source: 'Career Site',
      avatar: null,
      resume: 'resume_emma_rousseau.pdf',
      coverLetter: 'cover_emma_rousseau.pdf',
      experience: 'Senior',
      location: 'Bordeaux',
      skills: ['Java', 'Kotlin', 'Spring Boot', 'Kubernetes', 'Jenkins'],
      isFavorite: true,
      uploadDate: '2025-01-11T15:20:00Z',
      lastViewed: '2025-01-16T10:45:00Z',
      notes: 'Senior Java developer with DevOps experience',
      tags: ['Java', 'Senior', 'DevOps'],
      matchScore: 88
    }
  ]

  // Computed
  const totalCVs = computed(() => cvs.value.length)

  const favoriteCVs = computed(() => cvs.value.filter(cv => cv.isFavorite).length)

  const recentCVs = computed(() => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return cvs.value.filter(cv => new Date(cv.uploadDate) >= thirtyDaysAgo).length
  })

  const viewedToday = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return cvs.value.filter(cv =>
      cv.lastViewed && new Date(cv.lastViewed) >= today
    ).length
  })

  const filteredCVs = computed(() => {
    let filtered = cvs.value

    // Apply search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      filtered = filtered.filter(cv =>
        cv.name.toLowerCase().includes(searchLower) ||
        cv.email.toLowerCase().includes(searchLower) ||
        cv.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        cv.experience.toLowerCase().includes(searchLower) ||
        cv.location.toLowerCase().includes(searchLower)
      )
    }

    // Apply status filter
    if (filters.value.status) {
      filtered = filtered.filter(cv => cv.status === filters.value.status)
    }

    // Apply experience filter
    if (filters.value.experience) {
      filtered = filtered.filter(cv => cv.experience === filters.value.experience)
    }

    // Apply location filter
    if (filters.value.location) {
      filtered = filtered.filter(cv => cv.location === filters.value.location)
    }

    // Apply skills filter
    if (filters.value.skills && filters.value.skills.length > 0) {
      filtered = filtered.filter(cv =>
        filters.value.skills!.some(skill => cv.skills.includes(skill))
      )
    }

    // Apply source filter
    if (filters.value.source) {
      filtered = filtered.filter(cv => cv.source === filters.value.source)
    }

    // Apply date range filter
    if (filters.value.dateRange) {
      const now = new Date()
      const daysAgo = parseInt(filters.value.dateRange)
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))
      filtered = filtered.filter(cv => new Date(cv.uploadDate) >= cutoffDate)
    }

    // Apply favorites filter
    if (filters.value.favoritesOnly) {
      filtered = filtered.filter(cv => cv.isFavorite)
    }

    return filtered
  })

  // Actions
  const loadCVs = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      cvs.value = [...mockCVs]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load CVs'
    } finally {
      isLoading.value = false
    }
  }

  const applyFilters = (newFilters: CVFilters) => {
    filters.value = { ...newFilters }
  }

  const sortCVs = (sortBy: string) => {
    const sorted = [...cvs.value]

    switch (sortBy) {
      case 'date':
        sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'experience':
        const experienceOrder = ['Entry Level', 'Junior', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive']
        sorted.sort((a, b) => experienceOrder.indexOf(a.experience) - experienceOrder.indexOf(b.experience))
        break
      case 'status':
        const statusOrder = ['New', 'CV Selected', 'Phone Evaluated', 'Interview Scheduled', 'Interview Completed', 'Hired', 'Rejected']
        sorted.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
        break
      case 'skills':
        sorted.sort((a, b) => b.matchScore - a.matchScore)
        break
    }

    cvs.value = sorted
  }

  const toggleFavorite = (cvId: number) => {
    const cv = cvs.value.find(c => c.id === cvId)
    if (cv) {
      cv.isFavorite = !cv.isFavorite
    }
  }

  const markAsViewed = (cvId: number) => {
    const cv = cvs.value.find(c => c.id === cvId)
    if (cv) {
      cv.lastViewed = new Date().toISOString()
    }
  }

  const downloadCV = (cvId: number) => {
    const cv = cvs.value.find(c => c.id === cvId)
    if (cv) {
      // Simulate download
      const link = document.createElement('a')
      link.href = `#${cv.resume}` // Replace with actual file URL
      link.download = cv.resume
      link.click()

      // Mark as viewed
      markAsViewed(cvId)
    }
  }

  const deleteCV = async (cvId: number) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      const index = cvs.value.findIndex(c => c.id === cvId)
      if (index !== -1) {
        cvs.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete CV'
    } finally {
      isLoading.value = false
    }
  }

  const exportCVs = (cvsToExport: CV[]) => {
    try {
      const csvContent = generateCSV(cvsToExport)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `cv_export_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const generateCSV = (cvs: CV[]): string => {
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Experience', 'Location', 'Skills', 'Source', 'Upload Date', 'Match Score']
    const rows = cvs.map(cv => [
      cv.name,
      cv.email,
      cv.phone,
      cv.status,
      cv.experience,
      cv.location,
      cv.skills.join(', '),
      cv.source,
      new Date(cv.uploadDate).toLocaleDateString(),
      cv.matchScore.toString()
    ])

    return [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')
  }

  const addCV = async (cvData: Omit<CV, 'id' | 'uploadDate' | 'lastViewed' | 'isFavorite' | 'matchScore'>) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const newCV: CV = {
        ...cvData,
        id: Math.max(...cvs.value.map(c => c.id), 0) + 1,
        uploadDate: new Date().toISOString(),
        lastViewed: null,
        isFavorite: false,
        matchScore: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
      }

      cvs.value.unshift(newCV)
      return newCV
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add CV'
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateCV = async (cvId: number, updates: Partial<CV>) => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      const index = cvs.value.findIndex(c => c.id === cvId)
      if (index !== -1) {
        cvs.value[index] = { ...cvs.value[index], ...updates }
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update CV'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    cvs,
    filters,
    isLoading,
    error,

    // Computed
    totalCVs,
    favoriteCVs,
    recentCVs,
    viewedToday,
    filteredCVs,

    // Actions
    loadCVs,
    applyFilters,
    sortCVs,
    toggleFavorite,
    markAsViewed,
    downloadCV,
    deleteCV,
    exportCVs,
    addCV,
    updateCV,
    clearError
  }
})
