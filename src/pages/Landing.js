import React from "react";
import Tables from "../components/Tables";
import Grid from "../components/Grid";

const Landing = () => {
  const currentDate = new Date();
  return (
    <div className="ml-5 mt-5">
      <h1 className="text-gray-300 text-4xl font-bold">
        Intellectuals McGill
      </h1>
      <h2 className="text-black-300 text-2xl font-bold">
        <span className="font-bold text-2xl mr-2">Connections</span>
        {' '}
        <span className="font-normal text-lg">
          {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </h2>
      <div>
        <Grid />
      </div>
    </div>
  );
};

export default Landing;
