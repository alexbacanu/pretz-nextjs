import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="m-4">
      <div className="flex items-center justify-center border-4 border-gray-200 border-dashed rounded-lg h-96">
        <p className="text-3xl text-gray-300">Content</p>
      </div>
    </div>
  );
};

export default Home;

