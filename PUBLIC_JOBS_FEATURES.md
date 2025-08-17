# Public Jobs Features

This document describes the new public jobs functionality that allows anyone to view and apply to jobs without authentication.

## Overview

The public jobs system provides:
- **Public Job Viewing**: Anyone can browse available jobs without logging in
- **Job Search & Filtering**: Advanced search and filter capabilities
- **Job Applications**: Direct application submission with forms
- **Authentication**: Separate login/signup system for job seekers

## Routes

### Public Routes (No Authentication Required)
- `/jobs` - Public jobs listing page
- `/login` - User login page
- `/signup` - User registration page

### Protected Routes (Require Authentication)
- `/` - Dashboard (after login)
- `/recruitment` - Recruitment management
- `/candidates` - Candidate management
- `/profile` - User profile management

## Features

### 1. Public Jobs View (`/jobs`)
- **Job Listings**: Display all published jobs with key information
- **Search**: Text-based search across job titles, companies, descriptions, and skills
- **Advanced Filtering**:
  - Location
  - Job Type (Full-time, Part-time, Contract, etc.)
  - Experience Level
  - Remote work options
- **Job Details**: Comprehensive job information in sidebar
- **Apply Button**: Direct application without leaving the page

### 2. Job Application System
- **Application Form**: Complete application with required fields
- **File Upload**: Resume/CV upload support
- **Validation**: Form validation and error handling
- **Application Tracking**: Store and manage applications

### 3. Authentication System
- **User Registration**: New user signup with validation
- **User Login**: Secure authentication with session management
- **Role-based Access**: Different user roles (admin, recruiter, candidate)
- **Persistent Sessions**: Local storage for user sessions

## Technical Implementation

### Services
- **`publicJobService.ts`**: Handles public job operations
- **`jobService.ts`**: Core job management (existing)
- **`auth.ts`**: Authentication store (Pinia)

### Components
- **`PublicJobsView.vue`**: Main public jobs page
- **`JobApplicationDialog.vue`**: Application form dialog
- **`LoginView.vue`**: User login form
- **`SignupView.vue`**: User registration form

### Data Flow
1. **Job Creation**: Admins create jobs through existing system
2. **Job Publication**: Jobs marked as "Public" become visible
3. **Public Viewing**: Anyone can browse and search jobs
4. **Application**: Users can apply directly or create accounts
5. **Application Management**: Admins/recruiters review applications

## Mock Data

The system includes sample job data for testing:
- Java Engineer (Freelance - Paris)
- Python Engineer (Freelance - Colombo)
- Frontend Developer (Full-time - New York)
- DevOps Engineer (Remote - Global)
- Product Manager (Full-time - London)

## Usage Examples

### For Job Seekers
1. Visit `/jobs` to browse available positions
2. Use search and filters to find relevant jobs
3. Click on jobs to view detailed information
4. Click "Apply Now" to submit application
5. Create account or login if needed

### For Admins/Recruiters
1. Create jobs through existing `/job` route
2. Set status to "Public" to make jobs visible
3. Monitor applications through existing system
4. Manage candidate workflow

## Future Enhancements

- **Email Notifications**: Application confirmations and updates
- **Application Status Tracking**: Let candidates track their applications
- **Resume Parsing**: Automatic data extraction from resumes
- **Interview Scheduling**: Integrated interview management
- **Analytics Dashboard**: Public job performance metrics

## Security Considerations

- **Input Validation**: All form inputs are validated
- **File Upload Security**: File type and size restrictions
- **Authentication Guards**: Protected routes require login
- **Data Sanitization**: User input is properly sanitized

## Testing

To test the system:
1. Start the application
2. Navigate to `/jobs` to see public jobs
3. Try searching and filtering jobs
4. Click "Apply Now" to test application form
5. Test login/signup functionality
6. Verify protected routes require authentication
