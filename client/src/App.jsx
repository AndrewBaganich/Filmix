import {Routes, Route }  from "react-router-dom";
import "@/pages/Welcome/welcome.css";
import HomeLayout from "@/pages/Home/HomeLayout.jsx";
import Welcome from "@/pages/Welcome/welcome.jsx";

import AdminLayout from "@/pages/AdminPanel/AdminLayout.jsx";

import Dashboard from "@/pages/AdminPanel/pages/Dashboard.jsx";
import AdminPanelCRUD from "@/pages/AdminPanel/pages/CrudAdmin/CRUDtable.jsx";
import AddMovieToDB from "@/pages/AdminPanel/pages/CrudAdmin/AddMovieToDB"
import AdminPanelUsers from "@/pages/AdminPanel/pages/Users.jsx";

import SerialsPage from "@/pages/Home/pages/SerialsPage.jsx";
import NewsPage from "@/pages/Home/pages/NewsPage.jsx";
import MainPage from "@/pages/Home/pages/MainPage.jsx"
import MoviePage from "@/pages/Home/pages/MoviePage.jsx"
import EditMovie from "./pages/AdminPanel/pages/CrudAdmin/EditMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} /> 

      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<MainPage />} />
        <Route path="movies" element={<MoviePage/>}/>
        <Route path="movies/:id" element={<MoviePage />} />
        <Route path="serials" element={<SerialsPage/>}/>
        <Route path="news" element={<NewsPage/>}/>
      </Route>

      <Route path="/adminPanel" element={<AdminLayout/>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="crud" element={<AdminPanelCRUD />}/>
        <Route path="addMovie" element={<AddMovieToDB />} />
        <Route path="users" element={<AdminPanelUsers />} />
        <Route path="editMovie/:id" element={<EditMovie />} />
      </Route>

    </Routes>
  );
}

export default App;
