import { useAllPostsQuery } from "../redux/api/api";
import PostCard from "../Components/PostCard";
import Layout from "../Layout/Layout";
import ContentDisplay from "../Components/ContentDisplay";

const Search = () => {
  const { data } = useAllPostsQuery();
  const filterPostsByLikes = (posts) => {
    return posts?.filter((post) => post.likes.length < 1);
  };
  const posts = data?.posts;
  return (
    <Layout>
      <div className="w-full h-full lg:p-10 md:p-10 sm:p-8">
        <div className="w-full p-5 h-full lg:rounded-2xl md:rounded-2xl lg:bg-white md:bg-white sm:bg-white shadow-sm">
          <h1 className="text-xl font-semibold">Browse All</h1>
          <div className="w-full h-12 border-b">
            <input
              type="text"
              className="w-full h-full p-2 outline-none bg-transparent"
              placeholder="Search..."
            />
          </div>
          <div className="w-full lg:flex md:flex grid grid-cols-2 gap-5 mt-10 h-[calc(100vh-15rem)] overflow-y-scroll">
            {posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

const Post = ({ post }) => {
  return (
    <div className="lg:w-[14rem] md:w-[14rem] w-full lg:h-[40vh] md:h-[40vh]">
      <ContentDisplay
        src={post.attachMent}
        icon={true}
        autoPlay={true}
        muted={true}
      />
    </div>
  );
};
