export interface WorkflowItem {
  id: number
  title: string
  dropDownActions?: WorkflowItemDropdownAction[]
  mainAction?: () => void
}

export interface WorkflowItemDropdownAction {
  icon: string
  actionName: string
  action?: () => void
}
