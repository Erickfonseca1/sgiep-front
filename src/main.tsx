// src/main.tsx
import { createRoot } from 'react-dom/client';
import DefaultLayout from './assets/layouts/DefaultLayout';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
    <DefaultLayout>
      <div>oi Corpo Default</div>
    </DefaultLayout>
);
