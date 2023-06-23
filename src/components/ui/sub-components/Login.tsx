import React from "react";
import Image from "next/image";
import PlaceHolder from "../../../../public/placeholder_userID.png";

const Login = () => {
  return (
    <>
      <div className="container mx-auto sm:px-4">
        <div className="bg-slate-500 w-fit h-fit p-2 rounded-3xl absolute right-0 mr-5 mt-5 flex my-auto items-center">
          username
          <Image
          src={PlaceHolder}
          alt="User Image"
          height={30}
          width={30}
          className="rounded-full ml-2"
          />
        </div>
      </div>
    </>
  );
}

export default Login