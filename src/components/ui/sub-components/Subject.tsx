// import React from "react";
// import axios from "axios";

// const subject = [
//   "Physics",
//   "Chemistry",
//   "Mathematics",
//   "Economics",
//   "Finance",
//   "English Literature",
//   "English Language",
//   "Biology",
//   "Computer Science",
//   "History",
//   "Geography",
//   "Business Studies",
//   "Accounting",
//   "Psychology",
//   "Sociology",
//   "Politics",
//   "Law",
//   "Philosophy",
//   "Religious Studies",
//   "Art",
//   "Design and Technology",
//   "Music",
//   "Physical Education",
//   "Health and Social Care",
//   "Media Studies",
//   "Film Studies",
//   "Drama",
//   "Theatre Studies",
//   "Modern Foreign Languages",
//   "Classical Languages",
// ];

// function Subject() {

//   axios(`http://localhost:3000/api/app/conversation?id=${subject}`)
//   .then((response) => response.data)
//   .then((data) => {
//     console.log(data);
//   });

//   return (
//     <>
//       <div className="overflow-y-auto flex flex-col h-[75%]">
//         {subject.map((subject, index) => (
//           <button
//             key={index}
//             className="text-sm w-full text-white flex items-center border-b-2 "
//           >
//             <p className="p-2" id={`${subject}`}>
//               {subject}
//             </p>
//           </button>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Subject;


import axios from 'axios';
import { useState } from 'react';

const subjects = [
  "Mathematics",
  "English Language",
  "Science",
  "History",
  "Geography",
  "Religious Studies",
  "Art and Design",
  "Music",
  "Physical Education",
  "Design and Technology",
  "Computer Science",
  "Business Studies",
  "Film Studies",
  "Drama",
  "Theatre Studies",
  "Modern Foreign Languages",
  "Classical Languages",
];

function Subject() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleClick = (subject) => {
    console.log(`Clicked subject ${subject}`);
    setSelectedSubject(subject);
    axios.get(`http://localhost:3000/api/app/conversation?id=${subject}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="overflow-y-auto flex flex-col h-[75%]">
        {subjects.map((subject, index) => (
          <button
            key={subject}
            className={`text-sm w-full text-white flex items-center border-b-2 ${selectedSubject === subject ? 'bg-gray-700' : ''}`}
            onClick={() => handleClick(subject)}
          >
            <p className="p-2" id={`${subject}`}>
              {subject}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export default Subject;