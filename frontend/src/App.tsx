import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Blog from "./pages/blog";
import Search from "./pages/search";
import Stories from "./pages/stories";
import NewBlog from "./pages/newBlog";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/:username" element={<Profile />}/>
      <Route path="/:username/:blogId" element={<Blog />} />
      <Route path="/search" element={<Search />}/>
      <Route path="/me/stories/:type" element={<Stories />} />
      <Route path="/new-blog" element={<NewBlog />} />
      <Route path="*" element={<NotFoundPage />} />
     </Routes>
     </BrowserRouter>     
    </>
  );
}

export default App;
