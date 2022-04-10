import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './Base';
import { homepage } from './config';
import ErrorBoundary from './ErrorBoundary';
import FallBack from './FallBack';
import NavigatePage from './NavigatePage';
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
    { name: "Admin", to: homepage === "/" ? "/admin" : `${homepage}/admin` },
    { name: "Haha", to: homepage === "/" ? "/admin/home" : `${homepage}/admin/home` },
    { name: "Hehe", to: homepage === "/" ? "/admin" : `${homepage}/admin` }
]
function App(): JSX.Element {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<NavigatePage />} />
                    <Route path={homepage}>
                        <Route element={<Base pages={userpages} mode="user" />} >
                            {/*Modify user page here*/}
                            <Route index element={<FallBack><Home /></FallBack>} />
                            <Route path="books" element={<FallBack><Books /></FallBack>} />
                        </Route>
                        <Route path="signin" element={<FallBack><Signin mode="user" /></FallBack>} />
                        <Route path="signup" element={<FallBack><Signup mode="user" /></FallBack>} />
                        <Route path="admin" >
                            <Route element={<Base pages={adminpages} mode="admin" />}>
                                {/*Modify admin components here*/}
                                <Route index element={<FallBack><Books /></FallBack>} />
                                <Route path="home" element={<FallBack><Home /></FallBack>} />
                            </Route>
                            <Route path="signin" element={<FallBack><Signin mode="admin" /></FallBack>} />
                            <Route path="signup" element={<FallBack><Signup mode="admin" /></FallBack>} />
                        </Route>
                    </Route>
                    <Route path="/*" element={<p style={{ textAlign: "center", fontSize: 70 }}>PAGE NOT FOUND</p>} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    )
}
export default App;