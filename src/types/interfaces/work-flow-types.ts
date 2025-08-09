export type WorkflowActionType =
  | 'email'
  | 'sms'
  | 'add_tag'
  | 'update_property'
  | 'video_interview'
  | 'associate_pool'
  | 'request_evaluation'

export interface WorkflowAction {
  id: number
  type: WorkflowActionType
  label: string
  icon: string
  // Optional container for future configuration of the action
  config?: Record<string, unknown>
}

export interface WorkflowItem {
  id: number
  title: string
  dropDownActions?: WorkflowItemDropdownAction[]
  mainAction?: () => void
  actions?: WorkflowAction[]
}

export interface WorkflowItemDropdownAction {
  icon: string
  actionName: string
  action?: () => void
}
