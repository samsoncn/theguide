// import axios from "axios";
// import { useState } from "react";

// // const subjects = [
// //   // "Mathematics",
// //   "English Language",
// //   "Statistics",
// //   // "Science",
// //   // "History",
// //   // "Geography",
// //   // "Religious Studies",
// //   // "Art and Design",
// //   // "Music",
// //   // "Physical Education",
// //   // "Design and Technology",
// //   // "Computer Science",
// //   // "Business Studies",
// //   // "Film Studies",
// //   // "Drama",
// //   // "Theatre Studies",
// //   // "Modern Foreign Languages",
// //   // "Classical Languages",
// // ];
// interface Subject {
//   id: string;
//   name: string;
// }

// const subjects: Subject[] = [
//   { id: "1", name: "English Language" },
//   { id: "2", name: "Statistics" },
// ];

// function Subject() {
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   // const handleClick = (subject: any) => {
//   //   console.log(`Clicked subject ${subject}`);
//   //   setSelectedSubject(subject);
//   //   axios
//   //     .get(`http://localhost:3000/api/app/conversation?id=${subject}`)
//   //     .then((response) => {
//   //       console.log(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
//   // };

//   const handleClick = (subject: Subject) => {
//     console.log(`Clicked subject ${subject.name}`);
//     setSelectedSubject(subject.name);
//     axios
//       .get(
//         `http://localhost:3000/api/app/conversation?id=${subject.id}&name=${subject.name}`
//       )
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <>
//       <div className="overflow-y-auto flex flex-col h-[75%]">
//         {subjects.map((subject, index) => (
//           <button
//             key={index}
//             className={`text-sm w-full text-white flex items-center border-b-2 ${
//               selectedSubject === subject ? "bg-gray-700" : ""
//             }`}
//             onClick={() => handleClick(subject)}
//           >
//             <p className="p-2" id={`${subject}`}>
//               {subject}
//             </p>
//           </button>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Subject;
import axios from "axios";
import { useState } from "react";

interface Subject {
  id: string;
  name: string;
}

const subjects: Subject[] = [
  { id: "1", name: "English Language" },
  { id: "2", name: "Statistics" },
];

interface SubjectProps {
  setSelectedSubject: (subject: string) => void;
}

function Subject() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleClick = (subject: any) => {
    console.log(`Clicked subject ${subject}`);
    setSelectedSubject(subject);
    axios
      .get(`http://localhost:3000/api/app/conversation?id=${subject}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="overflow-y-auto flex flex-col h-[75%] bg-slate-500 rounded-2xl px-4 py-4 shadow-md shadow-black">
        {subjects.map((subject, index) => (
          <button
            key={index}
            className={`text-sm font-semibold text-slate-900 w-full p-1 flex items-center bg-slate-300 shadow-md shadow-slate-900 hover:text-white hover:bg-slate-900 hover:shadow-md hover:shadow-black rounded-lg my-1 transition-all transition-duration-100 ${
              selectedSubject === subject.name ? "bg-gray-900" : ""
            }`}
            onClick={() => handleClick(subject)}
          >
            <p className="p-2" id={`${subject.name}`}>
              {subject.name}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}

export default Subject;
