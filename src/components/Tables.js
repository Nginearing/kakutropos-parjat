import React from "react";
import OverallTable from "./OverallTable"; // Adjust the path as necessary
import MonthlyTable from "./MonthlyTable"; // Adjust the path as necessary

const overallData = [
  {
    firstName: "John",
    nickname: "Speedy",
    lastName: "Doe",
    championshipPoints: 8,
  },
  {
    firstName: "Jane",
    nickname: "Smarty",
    lastName: "Smith",
    championshipPoints: 5,
  },
  {
    firstName: "Alice",
    nickname: "Eagle",
    lastName: "Brown",
    championshipPoints: 7,
  },
  {
    firstName: "Bob",
    nickname: "Rocket",
    lastName: "Jones",
    championshipPoints: 6,
  },
  {
    firstName: "Charlie",
    nickname: "Blitz",
    lastName: "Davis",
    championshipPoints: 4,
  },
  {
    firstName: "Diana",
    nickname: "Ace",
    lastName: "Taylor",
    championshipPoints: 9,
  },
  {
    firstName: "Ethan",
    nickname: "Shadow",
    lastName: "Miller",
    championshipPoints: 3,
  },
  {
    firstName: "Fiona",
    nickname: "Flash",
    lastName: "Wilson",
    championshipPoints: 2,
  },
  {
    firstName: "George",
    nickname: "Hawk",
    lastName: "Moore",
    championshipPoints: 1,
  },
  {
    firstName: "Hannah",
    nickname: "Star",
    lastName: "Jackson",
    championshipPoints: 10,
  },
];

const monthlyData = [
  {
    firstName: "John",
    nickname: "Speedy",
    lastName: "Doe",
    totalPoints: 220,
    miniPoints: 120,
    connectionPoints: 100,
  },
  {
    firstName: "Jane",
    nickname: "Smarty",
    lastName: "Smith",
    totalPoints: 180,
    miniPoints: 90,
    connectionPoints: 90,
  },
  {
    firstName: "Alice",
    nickname: "Eagle",
    lastName: "Brown",
    totalPoints: 200,
    miniPoints: 110,
    connectionPoints: 90,
  },
  {
    firstName: "Bob",
    nickname: "Rocket",
    lastName: "Jones",
    totalPoints: 150,
    miniPoints: 75,
    connectionPoints: 75,
  },
  {
    firstName: "Charlie",
    nickname: "Blitz",
    lastName: "Davis",
    totalPoints: 140,
    miniPoints: 70,
    connectionPoints: 70,
  },
  {
    firstName: "Diana",
    nickname: "Ace",
    lastName: "Taylor",
    totalPoints: 230,
    miniPoints: 130,
    connectionPoints: 100,
  },
  {
    firstName: "Ethan",
    nickname: "Shadow",
    lastName: "Miller",
    totalPoints: 120,
    miniPoints: 60,
    connectionPoints: 60,
  },
  {
    firstName: "Fiona",
    nickname: "Flash",
    lastName: "Wilson",
    totalPoints: 110,
    miniPoints: 55,
    connectionPoints: 55,
  },
  {
    firstName: "George",
    nickname: "Hawk",
    lastName: "Moore",
    totalPoints: 100,
    miniPoints: 50,
    connectionPoints: 50,
  },
  {
    firstName: "Hannah",
    nickname: "Star",
    lastName: "Jackson",
    totalPoints: 250,
    miniPoints: 150,
    connectionPoints: 100,
  },
];

const Tables = () => {
  // Assuming overallData and monthlyData are imported or defined here

  const sortedOverallData = [...overallData].sort(
    (a, b) => b.championshipPoints - a.championshipPoints
  );
  const sortedMonthlyData = [...monthlyData].sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen py-5">
      <div className="w-full md:max-w-2xl mx-auto mb-8">
        <h2 className="text-center text-2xl font-bold mb-4">
          Championship Table
        </h2>
        <OverallTable data={sortedOverallData} />
      </div>

      <div className="w-full md:max-w-2xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-4">Monthly Table</h2>
        <MonthlyTable data={sortedMonthlyData} />
      </div>
    </div>
  );
};

export default Tables;
