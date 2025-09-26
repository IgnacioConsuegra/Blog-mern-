import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import "./app.css";
import Layout from "./Layout";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./CreatePost";
import PostPage from "./pages/PostPage";
import { EditPost } from "./pages/EditPost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path={"/login"} element={<LoginPage></LoginPage>} />
          <Route path={"/register"} element={<RegisterPage></RegisterPage>} />
          <Route path="/create" element={<CreatePost></CreatePost>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
