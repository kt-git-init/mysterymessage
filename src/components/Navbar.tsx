"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="p-4 shadow-md bg-transparent">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a
          href="#"
          className="text-lg text-center sm:text-2xl font-bold mb-4 md:mb-0 text-white "
        >
          Mystery Message : World of Anonymous Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4 bg-transparent text-white/90 px-10 text-lg">Welcome, {user.username || user.email}</span>
            <Button
              onClick={() => signOut()}
              className="w-full  md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-transparent text-white/90 px-10 text-lg"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
