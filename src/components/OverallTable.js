import React from "react";

const OverallTable = ({ data }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Overall Championship Points
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{`${item.firstName} "${item.nickname}" ${item.lastName}`}</td>
              <td className="px-6 py-4">{item.championshipPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverallTable;
