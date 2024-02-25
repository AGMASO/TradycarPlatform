import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function CodersComp() {
  return (
    <div className="flex flex-col justify-center text-white bg-gradient-to-bl from-gradient-1-start to-gradient-4-end h-full w-full rounded-md pt-4">
      <div className="flex justify-center">
        <p className="text-3xl">Creator</p>
      </div>
      <div className="flex justify-around mt-6">
        <Link
          className="flex justify-between items-center w-24"
          href="https://github.com/agmaso"
          target="_blank"
        >
          Agmaso <FaGithub />
        </Link>
      </div>
    </div>
  );
}
