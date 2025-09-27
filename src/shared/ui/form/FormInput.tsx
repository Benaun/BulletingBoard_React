import type { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

interface FormInputProps {
  text: string
  name: string
  value?: string | number
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void
}

export default function FormInput({
  text,
  name,
  value,
  handleInputChange
}: FormInputProps) {
  return (
    <InputGroup className='mb-3'>
      <InputGroup.Text id='inputGroup-sizing-default'>
        {text}
      </InputGroup.Text>
      <Form.Control
        name={name}
        value={String(value ?? '')}
        onChange={handleInputChange}
        aria-describedby='inputGroup-sizing-default'
        aria-label={text}
        tabIndex={0}
      />
    </InputGroup>
  )
}
