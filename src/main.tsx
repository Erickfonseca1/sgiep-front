import { createRoot } from 'react-dom/client';
import AppRouter from './Router';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(<AppRouter />);
