# Job Edit Functionality

This document describes the new job edit functionality that allows users to view and edit existing jobs using the same workflow as job creation.

## Overview

When you click on a job from the recruitment page (`http://localhost:5173/recruitment`), you can now:

1. **View Job Details**: Click the "View job" option in the 3-dot menu to see the job in the JobDetail view
2. **Edit Job**: Click the "Edit job" option in the 3-dot menu to open the job in the edit workflow

## Features

### Edit Job Workflow
- **Reuses the same components** as the job creation workflow
- **Pre-populates all forms** with existing job data
- **Maintains the same 5-step process**:
  1. Job Description (Company info, job details, settings)
  2. Application Form (Form fields and requirements)
  3. Workflow (Hiring stages)
  4. Job Team (Hiring manager, recruiter, interviewers)
  5. Promote (Job boards and social media)

### Dynamic Mock Data
- Jobs are loaded from `src/assets/mock.json`
- Each job contains comprehensive data for all workflow steps
- Data is managed through the `JobService` class

## How to Use

### 1. From Recruitment Page
1. Navigate to `/recruitment`
2. Click the 3-dot menu (⋮) on any job card
3. Select "Edit job" to open the edit workflow
4. Select "View job" to see the job details

### 2. Edit Workflow
1. The job opens in the edit mode with all existing data pre-filled
2. Navigate through the 5 steps using the stepper
3. Modify any fields as needed
4. Click "Save Changes" to update the job
5. Click "Cancel" to return to the recruitment page

### 3. Direct URL Access
- Edit a specific job: `/job/{id}/edit`
- View job details: `/recruitment/{id}`

## Technical Implementation

### Files Added/Modified
- `src/services/jobService.ts` - Job data management service
- `src/views/Jobs/EditJob.vue` - Edit job view
- `src/assets/mock.json` - Enhanced mock data
- `src/router/index.ts` - Added edit route
- `src/views/RecruitmentView.vue` - Updated to use job service
- `src/components/recruitment/RecruitmentCard.vue` - Added edit/view actions
- `src/views/Jobs/tabs/step1/SocietyCard.vue` - Added edit support

### Data Structure
Each job contains:
- Basic info (title, location, status, type)
- Company details (name, URL, description)
- Job description (requirements, responsibilities, benefits)
- Job settings (contract type, salary, location)
- Application form configuration
- Workflow stages
- Team information
- Promotion settings

### Service Methods
- `getAllJobs()` - Get all jobs
- `getJobById(id)` - Get specific job
- `updateJob(id, data)` - Update existing job
- `createJob(data)` - Create new job
- `deleteJob(id)` - Delete job
- `searchJobs(query)` - Search jobs
- `filterJobsByStatus(status)` - Filter by status
- `filterJobsByType(type)` - Filter by type

## Future Enhancements

1. **Form Validation**: Add validation to ensure data integrity
2. **Real-time Updates**: Implement real-time data synchronization
3. **Audit Trail**: Track changes made to jobs
4. **Bulk Operations**: Edit multiple jobs simultaneously
5. **Template System**: Save job configurations as templates
6. **Version Control**: Track different versions of job postings

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173/recruitment`
3. Click on any job's 3-dot menu
4. Test both "Edit job" and "View job" options
5. Verify that the edit workflow pre-populates with existing data
6. Test saving changes and returning to the recruitment page

## Notes

- The current implementation uses mock data stored in JSON
- All form components are reused from the job creation workflow
- The edit workflow maintains the same user experience as job creation
- Changes are saved to the mock data and persist during the session
