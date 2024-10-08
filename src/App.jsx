import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import Loader from "./Components/Loader";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { server } from "./redux/api/api";
import { userExists, userNotExists } from "./redux/reducers/userReducer";
import { SocketProvider } from "./socket";
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
const Friends = lazy(() => import("./Pages/Friends"));
const List = lazy(() => import("./Pages/List"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const OtherUser = lazy(() => import("./Pages/OtherUser"));
const OtherUserFollowers = lazy(() => import("./Pages/OtherUserFollowers"));
const OtherUserFollowing = lazy(() => import("./Pages/OtherUserFollowing"));
const CreateStory = lazy(() => import("./Pages/CreateStory"));
const Story = lazy(() => import("./Pages/Story"));
const Test = lazy(() => import("./Test"))
const GetChat = lazy(() => import("./Pages/GetChat"));
const NewChat = lazy(() => import("./Pages/NewChat"));
const GetReel = lazy(() => import("./Pages/GetReel"));
import { ToastContainer } from 'react-toastify'
import LandPage from "./Layout/LandPage"

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);
  const id = useParams().id

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
          <Route element={
            <SocketProvider>
              <ProtectedRoute user={user} redirect="/login" />
            </SocketProvider>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feeds" element={<Posts />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/story/upload" element={<CreateStory />} />
            <Route path="/user/:id" element={<OtherUser />} />
            <Route path="/user/story/:id" element={<Story />} />
            <Route path="/lists/list/followers" element={<Followers />} />
            <Route path="/user/friends" element={<Friends />} />
            <Route path="/user/lists" element={<List />} />
            <Route path="/lists/list/following" element={<Following />} />
            <Route path="/user/:id/chat/create" element={<NewChat />} />
            <Route path="/chat/:id" element={<GetChat user={user} chatId={id} />} />
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
          <Route path="/test" element={<LandPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
