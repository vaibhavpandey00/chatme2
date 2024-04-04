// Using lazy loader for fast loading
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './Components/auth/ProtectRoute';
import LayoutLoader from "./Components/layout/Loaders"

const Login = lazy(() => import("./Pages/Login"));
const Chats = lazy(() => import("./Pages/Chat"));
const Groups = lazy(() => import("./Pages/Groups"));
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chats />} />
            <Route path="/group" element={<Groups />} />
          </Route>

          <Route path="/" element={<ProtectRoute user={!user}><Login /></ProtectRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  )
}

export default App