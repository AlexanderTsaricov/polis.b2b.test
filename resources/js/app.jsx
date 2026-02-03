import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Article from './pages/Article';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path='/article/:id' element={<Article />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
