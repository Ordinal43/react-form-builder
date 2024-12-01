export interface BaseField {
  name: string
  label: string
}

export interface TextField extends BaseField {
  type: 'text' | 'textarea' | 'email' | 'password'
  placeholder: string
}

export interface SelectField extends BaseField {
  type: 'select'
  options: Array<{ label: string; value: string }>
}

export type FormField = TextField | SelectField

export type FormAction =
  | { type: 'UPDATE_FIELD'; index: number; newValue: FormField }
  | { type: 'RESET_FORM' }
  | { type: 'DELETE_FIELD'; index: number }
