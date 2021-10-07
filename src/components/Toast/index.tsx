import React, { ReactNode } from 'react';
import Alert from '@material-ui/lab/Alert';

interface ToastProps {
  children: string | ReactNode;
  type: 'error' | 'warning' | 'info' | 'success';
}

const Toast: React.FC<ToastProps> = ({ children, type }) => {
  return <Alert severity={type}>{children}</Alert>;
};

export default Toast;
