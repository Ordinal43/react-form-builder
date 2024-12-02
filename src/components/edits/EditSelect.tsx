import { ChangeEvent, Dispatch, useId, useState } from 'react'
import { FormAction, SelectField } from '../../types/formTypes'

interface EditSelectProps {
  index: number
  field: SelectField
  onChange: Dispatch<FormAction>
}

const EditSelect = ({ index, field, onChange }: EditSelectProps) => {
  const id = useId() // prevent duplicate keys on multiple EditSelects
  const [optionLabel, setOptionLabel] = useState('')
  const [optionValue, setOptionValue] = useState('')

  const newObj: FormAction = {
    type: 'UPDATE_FIELD',
    index: index,
    newValue: {
      ...field,
    },
  }

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'label' | 'name'
  ) => {
    const newVal = e.target.value
    switch (type) {
      case 'label':
        newObj.newValue.label = newVal
        break
      case 'name':
        newObj.newValue.name = newVal
        break
    }
    onChange(newObj)
  }

  const addNewOption = () => {
    if (newObj.newValue.type === 'select') {
      newObj.newValue.options.push({
        label: optionLabel,
        value: optionValue,
      })
    }
    onChange(newObj)
  }

  const deleteOption = (index: number) => {
    if (newObj.newValue.type === 'select') {
      newObj.newValue.options = [
        ...newObj.newValue.options.slice(0, index),
        ...newObj.newValue.options.slice(index + 1),
      ]
    }
    onChange(newObj)
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Edit label"
          value={field.label}
          onChange={(e) => handleOnChange(e, 'label')}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Edit name (for form)"
          value={field.name}
          onChange={(e) => handleOnChange(e, 'name')}
        />
      </div>
      <div>
        <p>Options:</p>
        <div>
          {field.options.map((option, index) => (
            <div key={`select-${index}-${id}`}>
              <span>
                Label: {option.label}, Value: {option.value}
              </span>
              <button onClick={() => deleteOption(index)}>Delete option</button>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Label"
            value={optionLabel}
            onChange={(e) => setOptionLabel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}
          />
          <button onClick={addNewOption}>Add New Option</button>
        </div>
      </div>
    </>
  )
}

export default EditSelect
