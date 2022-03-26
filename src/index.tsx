import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LinearProgress } from '@mui/material';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './Base';
import ErrorBoundary from './ErrorBoundary';
import reportWebVitals from './reportWebVitals';
const Signin = lazy(() => import('./Signin'));
const Home = lazy(() => import('./Pages/Home'));
const Books = lazy(() => import('./Pages/Books'));
const Borrow = lazy(() => import('./Pages/Borrow'));
render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={
              <Suspense fallback={<LinearProgress sx={{ mt: 10 }} />}>
                <Home />
              </Suspense>
            } />
            <Route path="borrow" element={
              <Suspense fallback={<LinearProgress sx={{ mt: 10 }} />}>
                <Borrow />
              </Suspense>
            } />
            <Route path="books" element={
              <Suspense fallback={<LinearProgress sx={{ mt: 10 }} />}>
                <Books />
              </Suspense>
            } />
          </Route>
          <Route path="/signin" element={
            <Suspense fallback={<LinearProgress />}>
              <Signin />
            </Suspense>
          } />
          <Route path="/*" element={<p style={{ textAlign: "center", fontSize: 70 }}>PAGE NOT FOUND</p>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
