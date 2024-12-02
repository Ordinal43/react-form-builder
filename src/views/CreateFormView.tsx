import { useReducer } from 'react'
import { FormAction, FormField } from '../types/formTypes'
import EditText from '../components/edits/EditText'
import EditSelect from '../components/edits/EditSelect'
import EditContainer from '../components/EditContainer'
import AddForm from '../components/AddForm'

const initialState = (): FormField[] => []

const formFieldsReducer = (
  state: FormField[],
  action: FormAction
): FormField[] => {
  switch (action.type) {
    case 'ADD_FIELD':
      return [...state, action.newField]
    case 'UPDATE_FIELD':
      return state.map((field, idx) =>
        idx === action.index ? action.newValue : field
      )
    case 'DELETE_FIELD':
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
    case 'RESET_FORM':
      return initialState()
  }
}

const CreateFormView = () => {
  const [formFields, dispatchFormFields] = useReducer(
    formFieldsReducer,
    initialState()
  )

  const submitForm = () => {
    console.log(formFields)
  }

  const resetForm = () => {
    dispatchFormFields({
      type: 'RESET_FORM',
    })
  }

  return (
    <>
      <h1>Create Form</h1>
      <AddForm onChange={dispatchFormFields} />
      <div>
        {formFields.map((field, index) => {
          let input
          switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'textarea':
              input = (
                <EditText
                  index={index}
                  field={field}
                  onChange={dispatchFormFields}
                />
              )
              break
            case 'select':
              input = (
                <EditSelect
                  index={index}
                  field={field}
                  onChange={dispatchFormFields}
                />
              )
          }

          return (
            <EditContainer key={`form-field-${index}`}>
              {input}
              <br />
              <button
                onClick={() =>
                  dispatchFormFields({
                    type: 'DELETE_FIELD',
                    index: index,
                  })
                }>
                Delete field
              </button>
            </EditContainer>
          )
        })}
      </div>
      <br />
      <button onClick={submitForm}>Submit Form</button>
      <button onClick={resetForm}>Reset Form</button>
    </>
  )
}

export default CreateFormView
