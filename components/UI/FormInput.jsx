import { InputGroup, Form } from 'react-bootstrap';

export default function FormInput({ text, name, value, handleInputChange }) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
                {text}
            </InputGroup.Text>
            <Form.Control
                name={name}
                value={value}
                onChange={handleInputChange}
                aria-describedby="inputGroup-sizing-default"
            />
        </InputGroup>
    )
}