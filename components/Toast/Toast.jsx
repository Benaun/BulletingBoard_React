import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function ToastNotification({ text }) {
    return (
        <ToastContainer
          className="p-3"
          position='bottom-end'
          style={{ zIndex: 2 }}
        >
          <Toast>
            <Toast.Header>
              <strong className="me-auto">Avito</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
          </Toast>
        </ToastContainer>
    );
}