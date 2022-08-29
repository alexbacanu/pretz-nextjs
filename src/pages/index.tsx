import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div className="m-4">
      <div className="flex items-center justify-center border-4 border-gray-200 border-dashed rounded-lg h-96">
        <p className="text-3xl text-red-300">{/* <Search /> */}</p>
      </div>
    </div>
  );
};

export default HomePage;
