// Using lazy loader for fast loading
import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './Components/auth/ProtectRoute';

const Login = lazy(() => import("./Pages/Login"));
const Chats = lazy(() => import("./Pages/Chat"));
const Groups = lazy(() => import("./Pages/Groups"));
const Home = lazy(() => import("./Pages/Home"))

let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chats />} />
          <Route path="/group" element={<Groups />} />
        </Route>

        <Route path="/" element={<ProtectRoute user={!user}><Login /></ProtectRoute>} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App