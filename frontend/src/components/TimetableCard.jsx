// components/TimetableCard.js

import React from 'react';

const TimetableCard = ({ subject, classroom, periods, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{subject}</h2>
      <p className="text-gray-700 mb-4">Classroom: {classroom}</p>
      <div>
        {periods.map((period, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{period.day}</p>
            <p className="text-gray-600">
              {period.startTime} - {period.endTime}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={onEdit} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default TimetableCard;
