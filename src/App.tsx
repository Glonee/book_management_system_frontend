import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './Base';
import { homepage } from './config';
import ErrorBoundary from './ErrorBoundary';
import Sus from './Sus';
import NavigatePage from './NavigatePage';
import Borrow from './Pages/Borrow';
const Signin = lazy(() => import('./Signin'));
const Signup = lazy(() => import('./Signup'));
const Home = lazy(() => import('./Pages/Home'));
const Books = lazy(() => import('./Pages/Books'));
const AddBooks = lazy(() => import('./Pages/AddBooks'));
const ModBooks = lazy(() => import('./Pages/ModBooks'));
const userpages = [
    { name: "Home", to: homepage },
    { name: "Books", to: homepage === "/" ? "/books" : `${homepage}/books` },
    { name: "Borrow", to: homepage === "/" ? "/borrow" : `${homepage}/borrow` }
];
const adminpages = [
    { name: "Home", to: homepage === "/" ? "/admin" : `${homepage}/admin` },
    { name: "Books", to: homepage === "/" ? "/admin/books" : `${homepage}/admin/books` },
    { name: "Borrow", to: homepage === "/" ? "/admin/borrow" : `${homepage}/admin/borrow` },
    { name: "AddBooks", to: homepage === "/" ? "/admin/AddBooks" : `${homepage}/admin/AddBooks` },
    { name: "ModBooks", to: homepage === "/" ? "/admin/ModBooks" : `${homepage}/admin/ModBooks` }
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
                            <Route index element={<Sus><Home /></Sus>} />
                            <Route path="books" element={<Sus><Books mode="user" /></Sus>} />
                            <Route path="borrow" element={<Sus><Borrow /></Sus>} />
                        </Route>
                        <Route path="signin" element={<Sus><Signin mode="user" /></Sus>} />
                        <Route path="signup" element={<Sus><Signup /></Sus>} />
                        <Route path="admin" >
                            <Route element={<Base pages={adminpages} mode="admin" />}>
                                {/*Modify admin components here*/}
                                <Route index element={<Sus><Home /></Sus>} />
                                <Route path="books" element={<Sus><Books mode="admin" /></Sus>} />
                                <Route path="borrow" element={<Sus><Borrow /></Sus>} />
                                <Route path="AddBooks" element={<Sus><AddBooks /></Sus>} />
                                <Route path="ModBooks" element={<Sus><ModBooks /></Sus>} />
                            </Route>
                            <Route path="signin" element={<Sus><Signin mode="admin" /></Sus>} />
                        </Route>
                    </Route>
                    <Route path="/*" element={<p style={{ textAlign: "center", fontSize: 70 }}>PAGE NOT FOUND</p>} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    )
}
export default App;