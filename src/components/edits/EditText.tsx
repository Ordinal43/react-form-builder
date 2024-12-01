import { ChangeEvent, Dispatch } from "react";
import { FormAction, TextField } from "../../types/formTypes";
import EditContainer from "../EditContainer";

interface EditTextProps {
  index: number
  field: TextField
  onChange: Dispatch<FormAction>
}

const EditText = ({ index, field, onChange }: EditTextProps) => {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'label' | 'name' | 'placeholder'
  ) => {
    const newVal = e.target.value
    const newObj: FormAction = {
      type: 'UPDATE_FIELD',
      index: index,
      newValue: {
        ...field,
      }
    }
    switch(type) {
      case 'label': newObj.newValue.label = newVal; break
      case 'name': newObj.newValue.name = newVal; break
      case 'placeholder':
        if (newObj.newValue.type !== 'select') {
          newObj.newValue.placeholder = newVal
        }
        break
    }
    onChange(newObj)
  }
  return (
    <EditContainer>
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
        <input
          type="text"
          placeholder="Edit Placeholder"
          value={field.placeholder}
          onChange={(e) => handleOnChange(e, 'placeholder')}
        />
      </div>
    </EditContainer>
  );
}

export default EditText;