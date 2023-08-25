import React, { useState } from "react";
import useChatLogs from "./useChatLogs";

interface Subject {
  id: string;
  name: string;
}

const subjects: Subject[] = [
  { id: "1", name: "English Language" },
  { id: "2", name: "Statistics" },
  { id: "3", name: "Physics" },
  { id: "4", name: "Mathematics" },
];

interface SubjectProps {
  setSelectedSubject: (subject: string | null) => void;
}

const SubjectComponent: React.FC<SubjectProps> = ({ setSelectedSubject }) => {
  const [selectedSubjectState, setSelectedSubjectState] =
    useState<Subject | null>(null);
  const { chatLogs, setChatLogs } = useChatLogs(
    selectedSubjectState ? selectedSubjectState.name : null
  );

  const handleClick = (subject: Subject) => {
    setSelectedSubjectState(subject);
    setSelectedSubject(subject.name);
  };

  return (
    <div className="overflow-y-auto flex flex-col h-[90%] bg-slate-500 rounded-2xl px-4 py-4 shadow-md shadow-black">
      {subjects.map((subject, index) => (
        <button
          key={index}
          className={`text-sm font-semibold text-slate-800 w-full p-1 flex items-center bg-slate-300 shadow-md shadow-slate-900 hover:text-white hover:bg-slate-800 hover:shadow-md hover:shadow-black rounded-lg my-1 transition-all transition-duration-100 ${
            selectedSubjectState && selectedSubjectState.id === subject.id
              ? "bg-gray-900"
              : ""
          }`}
          onClick={() => handleClick(subject)}
        >
          <p className="p-2" id={`${subject.name}`}>
            {subject.name}
          </p>
        </button>
      ))}
    </div>
  );
};

export default SubjectComponent;

// import axios from "axios";
// import { useState } from "react";

// interface Subject {
//   id: string;
//   name: string;
// }

// const subjects: Subject[] = [
//   { id: "1", name: "English Language" },
//   { id: "2", name: "Statistics" },
//   { id: "3", name: "Physics" },
//   { id: "4", name: "Mathematics" },
// ];

// interface SubjectProps {
//   setSelectedSubject: (subject: string | null) => void;
// }

// const Subject: React.FC<SubjectProps> = ({ setSelectedSubject }) => {
//   const [selectedSubject, setSelectedSubjectState] = useState<Subject | null>(
//     null
//   );

//   const handleClick = (subject: Subject) => {
//     console.log(`Subject: ${subject.name}`);
//     setSelectedSubjectState(subject);
//     setSelectedSubject(subject.name);
//     axios
//       .post(`/api/app/conversation/${subject.name}`)
//       .then((response) => {
//         console.log(response.data.response);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <>
//       <div className="overflow-y-auto flex flex-col h-[90%] bg-slate-500 rounded-2xl px-4 py-4 shadow-md shadow-black">
//         {subjects.map((subject, index) => (
//           <button
//             key={index}
//             className={`text-sm font-semibold text-slate-800 w-full p-1 flex items-center bg-slate-300 shadow-md shadow-slate-900 hover:text-white hover:bg-slate-800 hover:shadow-md hover:shadow-black rounded-lg my-1 transition-all transition-duration-100 ${
//               selectedSubject && selectedSubject.id === subject.id
//                 ? "bg-gray-900"
//                 : ""
//             }`}
//             onClick={() => handleClick(subject)}
//           >
//             <p className="p-2" id={`${subject.name}`}>
//               {subject.name}
//             </p>
//           </button>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Subject;
