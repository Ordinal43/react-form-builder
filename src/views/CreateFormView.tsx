import { useReducer } from "react";
import { FormAction, FormField } from "../types/formTypes";
import EditText from "../components/edits/EditText";
import EditSelect from "../components/edits/EditSelect";

const initialState = () :FormField[] => [
  { type: 'text', name: 'username', label: 'Username', placeholder: 'Enter your username' },
  { type: 'email', name: 'email', label: 'Email', placeholder: 'Enter your email' },
  { type: 'password', name: 'password', label: 'Password', placeholder: 'Enter your password' },
  { type: 'select', name: 'gender', label: 'Gender', options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ] }
]

const formFieldsReducer = (state: FormField[], action: FormAction): FormField[] => {
  switch(action.type) {
    case 'RESET_FORM':
      return initialState()
    case 'UPDATE_FIELD':
      return state.map((field, idx) =>
        idx === action.index ? action.newValue : field
      );
    case 'DELETE_FIELD':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
  }
}

const CreateFormView = () => {
  const [formFields, dispatchFormFields] = useReducer(formFieldsReducer, initialState())

  return (
    <>
      <h1>Create Form</h1>

      {formFields.map((field, index) => {
        let input;
        switch(field.type) {
          case 'text':
          case 'email':
          case 'password':
          case 'textarea':
            input = <EditText
              index={index}
              field={field}
              onChange={dispatchFormFields}
            />
            break
          case 'select':
            input = <EditSelect
              index={index}
              field={field}
              onChange={dispatchFormFields}
            />
        }

        return (
          <div key={`form-field-${index}`}>
            {input}
          </div>
        )
      })}
    </>
  );
}

export default CreateFormView;