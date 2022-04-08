import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LinearProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './Base';
import ErrorBoundary from './ErrorBoundary';
import NavigatePage from './NavigatePage';
import { homepage } from './config';
const Signin = lazy(() => import('./Signin'));
const Signup = lazy(() => import('./Signup'));
const Home = lazy(() => import('./Pages/Home'));
const Books = lazy(() => import('./Pages/Books'));
function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<NavigatePage />} />
                    <Route path={homepage === "" ? "/" : homepage} element={<Base />}>
                        <Route index element={
                            <Suspense fallback={<LinearProgress />}>
                                <Home />
                            </Suspense>
                        } />
                        <Route path="books" element={
                            <Suspense fallback={<LinearProgress />}>
                                <Books />
                            </Suspense>
                        } />                    </Route>
                    <Route path={`${homepage}/signin`} element={
                        <Suspense fallback={<LinearProgress />}>
                            <Signin />
                        </Suspense>
                    } />
                    <Route path={`${homepage}/signup`} element={
                        <Suspense fallback={<LinearProgress />}>
                            <Signup />
                        </Suspense>
                    } />
                    <Route path="/*" element={<p style={{ textAlign: "center", fontSize: 70 }}>PAGE NOT FOUND</p>} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    )
}
export default App;