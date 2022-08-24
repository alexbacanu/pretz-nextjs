import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Image from "next/future/image";
import Link from "next/link";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import hLogov2 from "../../../public/hLogov2.svg";
import honestpriceLogo from "../../../public/honestpriceLogo.svg";
import placeholderAccount from "../../../public/placeholderAccount.svg";
import { authModalState } from "../../lib/atoms/authModalAtom";
import { auth } from "../../lib/firebase/clientApp";
import Auth from "../Auth/Auth";

const navigation = [
  { name: "Products", href: "/products", current: true },
  { name: "Deals", href: "#", current: false },
  { name: "Download", href: "#", current: false },
  // { name: "Pricing", href: "#", current: false },
  // { name: "Blog", href: "#", current: false },
  // { name: "About us", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  {
    name: "Sign out",
    href: "#",
    onClick: () => {
      toast.promise(signOut(auth), {
        loading: "Signing out...",
        success: <b>Signed out!</b>,
        error: <b>Could not sign out.</b>,
      });
    },
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Disclosure as="nav" className="min-h-full shadow-md bg-slate-800">
      {({ open }) => (
        <>
          {/* {console.log(user)} */}
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and nav buttons */}
              <div className="flex items-center">
                {/* Logo */}
                <div className="self-center flex-shrink-0 cursor-pointer">
                  <Link href="/">
                    <a>
                      <Image
                        src={honestpriceLogo}
                        alt="Logo"
                        className="hidden w-auto h-10 md:block"
                      />
                    </a>
                  </Link>
                  <Link href="/">
                    <a>
                      <Image src={hLogov2} alt="Mini logo" className="w-auto h-10 md:hidden" />
                    </a>
                  </Link>
                </div>

                {/* Navigation */}
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-5 space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-200 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative flex flex-grow text-gray-400 focus-within:text-gray-600">
                <SearchIcon className="absolute w-6 h-6 transform -translate-y-1/2 pointer-events-none top-1/2 right-5 " />
                <input
                  placeholder="Search any product"
                  className="mx-3 px-3 py-1.5 rounded-md flex flex-grow"
                />
              </div>

              {/* Profile buttons */}
              <div className="hidden md:block">
                {user ? (
                  // User is logged in
                  <div className="flex items-center ml-4 md:ml-6">
                    {/* Notifications button */}
                    <button
                      type="button"
                      className="p-1 text-gray-200 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        {/* Profile icon */}
                        <Menu.Button className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            src={user.photoURL ? (user.photoURL as string) : placeholderAccount}
                            alt="User profile image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    onClick={item.onClick}
                                    className={classNames(
                                      active ? "bg-gray-200" : "",
                                      "block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  // User is logged out
                  <div className="flex items-baseline ml-5 space-x-4">
                    <Link key="login" href="#">
                      <a
                        onClick={() =>
                          setAuthModalState({
                            open: true,
                            view: "login",
                          })
                        }
                        className="px-3 py-2 text-sm font-semibold text-gray-200 rounded-md from-slate-700 to-zinc-700 bg-gradient-to-tr hover:bg-gray-700 hover:text-white"
                      >
                        Log in
                      </a>
                    </Link>

                    <Link key="signup" href="#">
                      <a
                        onClick={() =>
                          setAuthModalState({
                            open: true,
                            view: "signup",
                          })
                        }
                        className="px-3 py-2 text-sm font-semibold text-gray-200 rounded-md from-indigo-600 to-fuchsia-600 bg-gradient-to-tr hover:bg-gray-700 hover:text-white"
                      >
                        Sign up
                      </a>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex -mr-2 md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-200 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            <div className="py-3 border-t border-gray-700">
              {user ? (
                // User is logged in
                <>
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        src={user.photoURL ? (user.photoURL as string) : placeholderAccount}
                        alt="User profile image"
                        width={35}
                        height={35}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.displayName}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-200">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 p-1 ml-auto text-gray-200 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="px-2 mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Disclosure.Button
                          as="a"
                          onClick={item.onClick}
                          className="block px-3 py-2 text-base font-medium text-gray-200 rounded-md hover:text-white hover:bg-gray-700"
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                // User is logged out
                <div className="px-2 space-y-1">
                  <Link key="login-sm" href="#">
                    <Disclosure.Button
                      as="a"
                      onClick={() =>
                        setAuthModalState({
                          open: true,
                          view: "login",
                        })
                      }
                      className="block px-3 py-2 text-base font-medium text-gray-200 rounded-md cursor-pointer hover:text-white hover:bg-gray-700"
                    >
                      Log in
                    </Disclosure.Button>
                  </Link>
                  <Link key="signup-sm" href="#">
                    <Disclosure.Button
                      as="a"
                      onClick={() =>
                        setAuthModalState({
                          open: true,
                          view: "signup",
                        })
                      }
                      className="block px-3 py-2 text-base font-medium text-gray-200 rounded-md cursor-pointer from-indigo-600 to-fuchsia-600 bg-gradient-to-r hover:text-white hover:bg-gray-100"
                    >
                      Sign up
                    </Disclosure.Button>
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
          <Auth />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
