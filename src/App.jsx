import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { userExists, userNotExists } from "./redux/reducers/userReducer";
import { server } from "./redux/api/api";
import axios from "axios";
import ProtectedRoute from "./Components/ProtectedRoute";
const Home = lazy(() => import("./Pages/Home"));
const Posts = lazy(() => import("./Pages/Posts"));
const Search = lazy(() => import("./Pages/Search"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const Reels = lazy(() => import("./Pages/Reels"));
const Chat = lazy(() => import("./Pages/Chat"));
const Profile = lazy(() => import("./Pages/Profile"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Followers = lazy(() => import("./Pages/Followers"));
const Following = lazy(() => import("./Pages/Following"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const NewPost = lazy(() => import("./Pages/NewPost"));
const OtherUser = lazy(() => import("./Pages/OtherUser"));
const OtherUserFollowers = lazy(() => import("./Pages/OtherUserFollowers"));
const OtherUserFollowing = lazy(() => import("./Pages/OtherUserFollowing"));
const CreateStory = lazy(() => import("./Pages/CreateStory"));
const Story = lazy(() => import("./Pages/Story"));
const Test = lazy(() => import("./Test"))
const NewReel = lazy(() => import("./Pages/NewReel"));
const GetChat = lazy(() => import("./Pages/GetChat"));
const NewChat = lazy(() => import("./Pages/NewChat"));
const GetReel = lazy(() => import("./Pages/GetReel"));
import LandPage from "./Layout/LandPage";
import { LuLoader } from "react-icons/lu";
import { Toaster } from "react-hot-toast";
import Loader from "./Components/Loader";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, {
        withCredentials: true,
        headers: {
          "token": localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        dispatch(userExists(data?.user));
      })
      .catch((err) => dispatch(userNotExists(true)));
  }, [dispatch, user]);

  return loader ? <Loader /> : (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <LandPage />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/feeds" element={<Posts />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/post/new" element={<NewPost />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/story/upload" element={<CreateStory />} />
            <Route path="/user/:id" element={<OtherUser />} />
            <Route path="/user/story/:id" element={<Story />} />
            <Route path="/user/followers" element={<Followers />} />
            <Route path="/user/following" element={<Following />} />
            <Route path="/reel/new" element={<NewReel />} />
            <Route path="/user/:id/chat/create" element={<NewChat />} />
            <Route path="/chat/:id" element={<GetChat />} />
            <Route path="/reel/:id" element={<GetReel />} />
            <Route
              path="/other/user/:id/followers"
              element={<OtherUserFollowers />}
            />
            <Route
              path="/other/user/:id/following"
              element={<OtherUserFollowing />}
            />
          </Route>
          <Route element={<ProtectedRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
