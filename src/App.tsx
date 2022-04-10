import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LinearProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Base from './Base';
import ErrorBoundary from './ErrorBoundary';
import NavigatePage from './NavigatePage';
import { homepage } from './config';
const Signin = lazy(() => import('./Signin'));
const Signup = lazy(() => import('./Signup'));
const Home = lazy(() => import('./Pages/Home'));
const Books = lazy(() => import('./Pages/Books'));
const userpages = [
    { name: "Home", to: homepage },
    { name: "Books", to: homepage === "/" ? "/books" : `${homepage}/books` },
    { name: "Borrow", to: homepage }
];
const adminpages = [
    { name: "Admin", to: homepage === "/" ? "/admin" : `${homepage}/admin` }
]
function App(): JSX.Element {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<NavigatePage />} />
                    <Route path={homepage}>
                        <Route element={<Base pages={userpages} mode="user" />} >
                            <Route index element={
                                <Suspense fallback={<LinearProgress />}>
                                    <Home />
                                </Suspense>
                            } />
                            <Route path="books" element={
                                <Suspense fallback={<LinearProgress />}>
                                    <Books />
                                </Suspense>
                            } />
                        </Route>
                        <Route path="signin" element={
                            <Suspense fallback={<LinearProgress />}>
                                <Signin mode="user" />
                            </Suspense>
                        } />
                        <Route path="signup" element={
                            <Suspense fallback={<LinearProgress />}>
                                <Signup mode="user" />
                            </Suspense>
                        } />
                    </Route>
                    <Route path={homepage === "/" ? "/admin" : `${homepage}/admin`} >
                        <Route element={<Base pages={adminpages} mode="admin" />}>
                            <Route index element={
                                <Suspense fallback={<LinearProgress />}>
                                    <Home />
                                </Suspense>
                            }
                            />
                        </Route>
                        <Route path="signin" element={
                            <Suspense fallback={<LinearProgress />}>
                                <Signin mode="admin" />
                            </Suspense>
                        } />
                        <Route path="signup" element={
                            <Suspense fallback={<LinearProgress />}>
                                <Signup mode="admin" />
                            </Suspense>
                        } />
                    </Route>
                    <Route path="/*" element={<p style={{ textAlign: "center", fontSize: 70 }}>PAGE NOT FOUND</p>} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    )
}
export default App;