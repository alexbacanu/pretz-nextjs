"use client";

import { Popover, Transition } from "@headlessui/react";
import { IconMenu2, IconSearch, IconX, TablerIcon } from "@tabler/icons";
import { HEADER_ITEMS } from "lib/data/navItems";
import Link from "next/link";
import { Fragment } from "react";
import UILogo from "./UILogo";

type UIHeaderProps = {};

const UIHeader = (props: UIHeaderProps) => {
  return (
    <Popover as="header" className="sticky top-0 z-40 bg-gray-50">
      {/* Desktop */}
      <div className="mx-auto flex max-w-[1920px] items-center justify-between space-x-6 p-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div>
          <UILogo />
        </div>

        {/* Navigation menu */}
        <Popover.Group as="nav" className="hidden space-x-3 md:flex">
          {HEADER_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              <span className="sr-only">{item.arialabel}</span>
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          ))}
        </Popover.Group>

        {/* Search */}
        <div className="grow text-indigo-400 focus-within:text-indigo-600">
          <span className="sr-only">Search</span>
          <IconSearch
            className="pointer-events-none absolute top-1/2 h-8 w-8 -translate-y-1/2 pl-2"
            aria-hidden="true"
          />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search any product"
            className="h-10 w-full rounded-2xl pl-10 shadow"
          />
        </div>

        {/* Sign in / Sign up */}
        <div className="hidden items-center justify-center space-x-4 md:flex">
          <Link
            href="#"
            className="whitespace-nowrap rounded-md px-4 py-2 text-base font-medium text-gray-500 shadow-md hover:text-gray-900"
          >
            <span className="sr-only">Sign in button</span>
            Sign in
          </Link>

          <Link
            href="#"
            className="whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-indigo-700"
          >
            <span className="sr-only">Sign up button</span>
            Sign up
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <Popover.Button className="rounded-md bg-white p-1 text-gray-400 shadow-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <IconMenu2 className="h-8 w-8" aria-hidden="true" />
          </Popover.Button>
        </div>
      </div>

      {/* Modal */}
      <div className="md:hidden">
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-50 origin-top-right p-2 transition"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
              <div className="space-y-6 px-4 pt-4 pb-6">
                {/* Logo and close button */}
                <div className="flex items-center justify-between">
                  <div className="pl-3">
                    <UILogo />
                  </div>
                  <div>
                    <Popover.Button className="rounded-md bg-white p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <IconX className="h-8 w-8" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>

                {/* Navigation menu */}
                <Popover.Group as="nav" className="grid gap-y-2">
                  {HEADER_ITEMS.map((item) => {
                    const Icon: TablerIcon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        <Icon className="h-6 w-6 shrink-0 text-indigo-600" aria-hidden="true" />
                        <span className="sr-only">{item.arialabel}</span>
                        <span className="pl-3 text-base font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </Popover.Group>

                {/* Sign in / Sign up */}
                <div className="space-y-6 px-3">
                  <Link
                    href="#"
                    className="flex w-full items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-indigo-700"
                  >
                    <span className="sr-only">Sign up button</span>
                    Sign up
                  </Link>

                  <p className="text-center text-base font-medium text-gray-600">
                    Existing customer?
                    <Link href="#" className="px-2 text-indigo-600 hover:text-indigo-700">
                      <span className="sr-only">Sign in button</span>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </div>

      {/* Android buttons */}
      <Popover.Group
        as="nav"
        className="fixed bottom-0 z-40 flex w-screen flex-col justify-end md:hidden"
      >
        <div className="flex w-full items-stretch justify-between rounded-t-xl bg-white py-2 px-10 shadow-md">
          {HEADER_ITEMS.map((item) => {
            const Icon: TablerIcon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-between p-2 text-xs"
              >
                <Icon className="h-8 w-8 shrink-0 text-indigo-600" aria-hidden="true" />
                <span className="sr-only">{item.arialabel}</span>
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Popover.Group>
    </Popover>
  );
};

export default UIHeader;
