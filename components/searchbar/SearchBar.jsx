import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SearchBar({ searchValue, onSearch, onClick }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className='container'>
      <InputGroup className="mb-3">
        <Form.Control
          className='input'
          placeholder="Поиск"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={handleInputChange}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={onClick}>
          Х
        </Button>
      </InputGroup>
    </div>
  )
};