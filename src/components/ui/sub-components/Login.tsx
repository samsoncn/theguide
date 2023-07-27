import React from "react";
import Image from "next/image";
import { useState } from "react";
import PlaceHolder from "../../../../public/placeholder_userID.png";


const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="container mx-auto sm:px-4">
        <div className="backdrop-blur-md backdrop-brightness-50 w-fit h-fit p-2 rounded-3xl absolute right-0 mr-5 mt-5 flex my-auto items-center">
          <Image
          src={PlaceHolder}
          alt="User Image"
          height={30}
          width={30}
          className="rounded-full"
          />
        </div>
      </div>
    </>
  );
}

export default Login