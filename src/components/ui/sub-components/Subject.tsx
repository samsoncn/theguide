import React from "react";

const subject = ["Physics", "Chemistry", "Mathematics", "Economics", "Finance", "English Literature", "English Language", "Biology", "Computer Science", "History", "Geography", "Business Studies", "Accounting", "Psychology", "Sociology", "Politics", "Law", "Philosophy", "Religious Studies", "Art", "Design and Technology", "Music", "Physical Education", "Health and Social Care", "Media Studies", "Film Studies", "Drama", "Theatre Studies", "Modern Foreign Languages", "Classical Languages"]

const Subject = () => {

  return (
    <>
      <div className="overflow-y-auto flex flex-col h-[75%]">
        {subject.map((subject, index) => (
          <button className="text-sm w-full text-white flex items-center border-b-2 ">
            <p className="p-2" id={`${subject}`}>{subject}</p>
          </button>
        ))}
      </div>
    </>
  )
}

export default Subject