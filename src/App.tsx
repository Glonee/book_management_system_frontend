import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './Base';
import ErrorBoundary from './ErrorBoundary';
import NavigatePage from './NavigatePage';
import { homepage } from './config';
import AddFallBack from './AddFallBack';
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
                            <Route index element={<AddFallBack Component={<Home />} />} />
                            <Route path="books" element={<AddFallBack Component={<Books />} />} />
                        </Route>
                        <Route path="signin" element={<AddFallBack Component={<Signin mode="user" />} />} />
                        <Route path="signup" element={<AddFallBack Component={<Signup mode="user" />} />} />
                        <Route path="admin" >
                            <Route element={<Base pages={adminpages} mode="admin" />}>
                                <Route index element={<AddFallBack Component={<Home />} />} />
                            </Route>
                            <Route path="signin" element={<AddFallBack Component={<Signin mode="admin" />} />} />
                            <Route path="signup" element={<AddFallBack Component={<Signup mode="admin" />} />} />
                        </Route>
                    </Route>
                    <Route path="/*" element={<p style={{ textAlign: "center", fontSize: 70 }}>PAGE NOT FOUND</p>} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    )
}
export default App;