import { Navigate } from 'react-router-dom';
import { isTokenValid, getToken } from '../utils/auth';



interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const ok = isTokenValid();

  if (!ok) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}
