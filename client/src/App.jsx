// Using lazy loader for fast loading
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './Components/auth/ProtectRoute';
import { LayoutLoader } from "./Components/layout/Loaders"

const Login = lazy(() => import("./Pages/Login"));
const Chats = lazy(() => import("./Pages/Chat"));
const Groups = lazy(() => import("./Pages/Groups"));
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));

const AdminLogin = lazy(() => import("./Pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const UserManagment = lazy(() => import("./Pages/admin/UserManagment"));
const ChatManagment = lazy(() => import("./Pages/admin/ChatManagment"));
const MessageManagment = lazy(() => import("./Pages/admin/MessageManagment"));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chats />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route path="/login" element={<ProtectRoute user={!user}><Login /></ProtectRoute>} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagment />} />
          <Route path="/admin/chats" element={<ChatManagment />} />
          <Route path="/admin/messages" element={<MessageManagment />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  )
}

export default App