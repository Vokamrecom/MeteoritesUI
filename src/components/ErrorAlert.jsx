import { Alert, Button } from 'antd';

const ErrorAlert = ({ message, description, onRetry }) => (
  <Alert
    type="error"
    showIcon
    message={message}
    description={description}
    action={
      onRetry && (
        <Button type="link" size="small" onClick={onRetry}>
          Повторить
        </Button>
      )
    }
  />
);

export default ErrorAlert;

