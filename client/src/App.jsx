import "./app.css";
import Layout from "./Layout";
import IndexPage from "./pages/indexPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./CreatePost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path={"/login"} element={<LoginPage></LoginPage>} />
          <Route path={"/register"} element={<RegisterPage></RegisterPage>} />
          <Route path="/create" element={<CreatePost></CreatePost>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
