export interface BaseField {
  name: string
  label: string
}

export type FieldTypes = 'text' | 'textarea' | 'email' | 'password' | 'select'

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
  | { type: 'ADD_FIELD'; newField: FormField }
  | { type: 'UPDATE_FIELD'; index: number; newValue: FormField }
  | { type: 'RESET_FORM' }
  | { type: 'DELETE_FIELD'; index: number }
