import { Dispatch, useState } from 'react'
import { FieldTypes, FormAction, FormField } from '../types/formTypes'

interface AddFormProps {
  onChange: Dispatch<FormAction>
}

const optionTypes: FieldTypes[] = [
  'email',
  'password',
  'select',
  'text',
  'textarea',
]

const AddForm = ({ onChange }: AddFormProps) => {
  const [selectedOption, setSelectedOption] = useState<FieldTypes>('text')

  const addNewField = () => {
    let newObj: FormField
    switch (selectedOption) {
      case 'select':
        newObj = {
          type: selectedOption,
          name: '',
          label: '',
          options: [],
        }
        break
      default:
        newObj = {
          type: selectedOption,
          name: '',
          label: '',
          placeholder: '',
        }
    }
    onChange({
      type: 'ADD_FIELD',
      newField: newObj,
    })
  }

  return (
    <div>
      <label htmlFor="choose-type">Choose field type</label>
      <br />
      <select
        id="choose-type"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value as FieldTypes)}>
        {optionTypes.map((option, index) => (
          <option key={`option-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
      <button onClick={addNewField}>Add new field</button>
    </div>
  )
}

export default AddForm
