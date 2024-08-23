import { useSelector } from "react-redux";
import NewPost from "../Components/Creation/NewPost";
import Stories from "../Components/Home/Stories";
import PostCard from "../Components/PostCard";
import Layout from "../Layout/Layout";
import { useGetStoriesQuery } from "../redux/api/api";
import { useGetAllPosts } from "../Requests/GetRequest";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, refetch } = useGetAllPosts()
  const { data: storyData } = useGetStoriesQuery();
  const stories = storyData?.stories;
  return (
    <Layout>
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-full bg-white overflow-hidden overflow-y-scroll">
          <Stories stories={stories} user={user} />
          <div className="p-10 lg:px-10 md:px-8 sm:px-6 px-4">
            <NewPost />
          </div>
          <div className="w-full h-full flex justify-center">
            <div className="pt-4 bg-white w-full lg:px-10 md:px-8 sm:px-6 pb-72 flex flex-col gap-4">
              <div className="w-full py-5">
                <div className="w-full rounded-xl overflow-hidden h-[30rem]">
                  <img src="https://cdn.prod.website-files.com/66015f733bbb59672132aee2/66016301256cc8095aeca1fb_64703481041bb767ea996fe6_Startbucks%2520logo%2520on%2520product%2520gif%2520example.gif" className="w-full h-full object-cover" alt="" />
                </div>
              </div>
              {posts?.map((post, index) => (
                <PostCard key={post?._id} post={post} />
              ))}
              <div className="w-full h-screen flex items-center justify-center">
                No more posts are available now
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
