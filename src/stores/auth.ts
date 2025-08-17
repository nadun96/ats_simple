import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'recruiter' | 'candidate'
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userFullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })
  const userRole = computed(() => user.value?.role || null)

  // Actions
  const login = async (email: string, password: string) => {
    isLoading.value = true
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'recruiter'
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      // Store user data
      user.value = mockUser
      token.value = mockToken
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    isLoading.value = true
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'candidate' // Default role for new users
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      // Store user data
      user.value = mockUser
      token.value = mockToken
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user_data')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        logout()
      }
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user_data', JSON.stringify(user.value))
    }
  }

  // Initialize auth state from localStorage
  checkAuth()

  return {
    // State
    user,
    token,
    isLoading,
    
    // Getters
    isAuthenticated,
    userFullName,
    userRole,
    
    // Actions
    login,
    signup,
    logout,
    checkAuth,
    updateUser
  }
})
