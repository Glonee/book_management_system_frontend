import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//import { Dashboard } from '@mui/icons-material';
import { CssBaseline } from '@mui/material';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './Base';
import Sus from './Components/Sus';
import { homepage } from './config';
import ErrorBoundary from './ErrorBoundary';
import NavigatePage from './NavigatePage';
//以上为常规import，以下为懒加载import
//懒加载（即打开这个页面时才加载）需要将懒加载组件包裹在Suspense(或我已封装的Sus)组件内才能使用
//嫌麻烦可以不使用懒加载，直接import
const Signin = lazy(() => import('./Pages/Signin'));
const Signup = lazy(() => import('./Pages/Signup'));
const Home = lazy(() => import('./Pages/Home'));
const Books = lazy(() => import('./Pages/Books'));
const Borrow = lazy(() => import('./Pages/Borrow'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const History = lazy(() => import('./Pages/History'));
const Reserve = lazy(() => import('./Pages/Reverse'));
const Member = lazy(() => import('./Pages/Member'));
//用户的菜单栏
const userpages = [
    { name: "Home", to: homepage },
    { name: "Books", to: `${homepage}/books` },
    { name: "Borrowed", to: `${homepage}/borrow` },
    { name: "History", to: `${homepage}/history}` },
    { name: "Reserve", to: `${homepage}/reserve` }
];
//管理员的菜单栏
const adminpages = [
    { name: "Home", to: `${homepage}/admin` },
    { name: "Books", to: `${homepage}/admin/books` },
    { name: "Borrowed", to: `${homepage}/admin/borrow` },
    { name: "History", to: `${homepage}/admin/history` },
    { name: "Reserve", to: `${homepage}/admin/reserve` },
    { name: "Dashboard", to: `${homepage}/admin/dashboard`},
    { name: "Member",to: `${homepage}/admin/member`}
]
function App(): JSX.Element {
    return (
        <BrowserRouter>
            <CssBaseline />
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<NavigatePage />} />
                    <Route path={homepage}>
                        <Route element={<Base pages={userpages} mode="user" />} >
                            {/*用户可用的页面*/}
                            <Route index element={<Sus><Home mode="user" /></Sus>} />
                            <Route path="books" element={<Sus><Books mode="user" /></Sus>} />
                            <Route path="borrow" element={<Sus><Borrow mode="user" /></Sus>} />
                            <Route path="history" element={<Sus><History mode="user" /></Sus>} />
                            <Route path="reserve" element={<Sus><Reserve mode="user" /></Sus>} />
                        </Route>
                        <Route path="signin" element={<Sus><Signin mode="user" /></Sus>} />
                        <Route path="signup" element={<Sus><Signup /></Sus>} />
                        <Route path="admin" >
                            <Route element={<Base pages={adminpages} mode="admin" />}>
                                {/*管理员可用的页面*/}
                                <Route index element={<Sus><Home mode="admin" /></Sus>} />
                                <Route path="books" element={<Sus><Books mode="admin" /></Sus>} />
                                <Route path="borrow" element={<Sus><Borrow mode="admin" /></Sus>} />
                                <Route path="history" element={<Sus><History mode="admin" /></Sus>} />
                                <Route path="reserve" element={<Sus><Reserve mode="admin" /></Sus>} />
                                <Route path="dashboard" element={<Sus><Dashboard mode="admin" /></Sus>} />
                                <Route path="member" element={<Sus><Member mode="admin" /></Sus>} />
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