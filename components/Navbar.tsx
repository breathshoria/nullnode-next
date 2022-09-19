import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import React, { useRef, Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import AnimatedToggle from "./helpers/AnimatedToggle";

const navigation = [
  { name: "Projects", href: "/projects", authRequired: false },
  { name: "Dashboard", href: "/dashboard", authRequired: true, role: "admin" },
  { name: "About", href: "/about", authRequired: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpened, setMenuOpened] = useState(false);
  const currentPath = router.pathname;
  const menuButton = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (isMenuOpened) {
      setTimeout(() => setMenuOpened(false), 100);
    }
    setMenuOpened(true);
  };

  return (
    <Disclosure as="nav" className="bg-gray-900 rounded-b-lg">
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
        <div
          className={
            isMenuOpened
              ? "fixed z-20 absolute top-14 left-1 sm:hidden"
              : "hidden"
          }
        >
          <div className="flex flex-col p-2 border w-56 h-56 shadow-black shadow-sm rounded-b-md border-gray-900 bg-gray-900 text-lg">
            {navigation
              .filter(
                (item) =>
                  !item.authRequired ||
                  (item.authRequired === (status === "authenticated") &&
                    session?.user.roles?.includes(item.role))
              )
              .map((item) => (
                <Link href={item.href} key={item.name}>
                  <span
                    className={classNames(
                      currentPath.includes(item.href)
                        ? "bg-sky-700 text-white"
                        : "text-gray-300 bg-gray-900 hover:text-white",
                      "px-2 py-2 inline-block hover:bg-sky-700 rounded-lg mb-2 cursor-pointer"
                    )}
                    aria-current={
                      currentPath === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            {status === "unauthenticated" && (
              <Link href={"/login"}>
                <span
                  className={
                    "text-gray-300 bg-gray-900 hover:text-white px-2 py-2 inline-block hover:bg-sky-700 rounded-lg cursor-pointer"
                  }
                >
                  Log In
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-between justify-items-center items-center h-14">
          <div className={"sm:hidden cursor-pointer"}>
            <div
              tabIndex={1}
              ref={menuButton}
              onClick={toggleMenu}
              onBlur={toggleMenu}
            >
              <AnimatedToggle trigger={isMenuOpened} />
            </div>
          </div>
          <div className="flex items-center justify-start pl-3 sm:pl-0 sm:items-stretch sm:justify-start grow">
            <div className="self-center">
              <Link href="/">
                <p className={"text-neutral-100 text-base font-mono"}>
                  nullnode
                </p>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation
                  .filter(
                    (item) =>
                      !item.authRequired ||
                      (item.authRequired === (status === "authenticated") &&
                        session?.user.roles?.includes(item.role))
                  )
                  .map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a
                        className={classNames(
                          currentPath.includes(item.href)
                            ? "bg-sky-700 text-white"
                            : "text-gray-300 bg-gray-800 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700"
                        )}
                        aria-current={
                          currentPath === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          {status === "unauthenticated" && (
            <div className={"hidden sm:flex sm:gap-2"}>
              <Link href={"/login"}>
                <span
                  className={
                    "text-sm hover:text-white hover:bg-sky-700 bg-gray-800 rounded-md p-2 cursor-pointer"
                  }
                >
                  Log In
                </span>
              </Link>
              <Link href={"/register"}>
                <span
                  className={
                    "text-sm hover:text-white hover:bg-sky-700 bg-gray-800 rounded-md p-2 cursor-pointer"
                  }
                >
                  Sign Up
                </span>
              </Link>
            </div>
          )}
          {status === "authenticated" && (
            <Menu as="div" className="relative z-10">
              <Menu.Button className="bg-gray-800 px-3 py-2 text-sm rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                {session.user?.username}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute p-2 right-0 mt-2 w-fit rounded-md shadow-lg bg-gray-900  focus:outline-none">
                  <Menu.Item>
                    <button
                      className={classNames(
                        "block w-20 py-2 text-sm text-white hover:bg-sky-700"
                      )}
                    >
                      <span className={"text-sm"}>Profile</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => signOut()}
                      className={classNames(
                        "block w-20 py-2 text-sm text-white hover:bg-sky-700"
                      )}
                    >
                      <span className={"text-sm"}>Sign out</span>
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </Disclosure>
  );
};

export default Nav;
