import { ReactNode } from 'react'

type EditContainerProps = {
  children: ReactNode
}

const style = {
  padding: '5px',
  margin: '5px',
  border: '1px solid black',
}

const EditContainer = ({ children }: EditContainerProps) => {
  return <div style={style}>{children}</div>
}

export default EditContainer
