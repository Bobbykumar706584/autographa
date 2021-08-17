/* eslint-disable no-unused-vars */
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import {
  Disclosure, Menu, Popover, Transition,
} from '@headlessui/react';

import EditorSideBar from '@/modules/editorsidebar/EditorSideBar';

import {
  SunIcon,
  SearchIcon,
} from '@heroicons/react/outline';

import AppsIcon from '@/icons/basil/Outline/Interface/Apps.svg';
import LayoutIcon from '@/icons/basil/Outline/Interface/Layout.svg';
import BullhornIcon from '@/icons/basil/Outline/Communication/Bullhorn.svg';
import ProcessorIcon from '@/icons/basil/Outline/Devices/Processor.svg';
import CheckIcon from '@/icons/basil/Outline/Interface/Check.svg';
import ExpandIcon from '@/icons/basil/Outline/Interface/Expand.svg';

import { ReferenceContext } from '@/components/context/ReferenceContext';
import { ProjectContext } from '@/components/context/ProjectContext';
import styles from './MenuBar.module.css';

const profile = ['Your Profile', 'Settings', 'Sign out'];

const solutions = [
  {
    name: 'Translation',
    href: '##',
    icon: LayoutIcon,
  },
  {
    name: 'Audio',
    href: '##',
    icon: BullhornIcon,
  },
  {
    name: 'MT',
    href: '##',
    icon: ProcessorIcon,
  },
  {
    name: 'Check',
    href: '##',
    icon: CheckIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TopMenuBar() {
  const [openSideBar, setOpenSideBar] = useState(false);

  const {
    states: {
      selectedProject,
    },
  } = useContext(ProjectContext);

  const {
    state: {
      fontSize,
    },
    actions: {
      setFontsize,
    },
  } = useContext(ReferenceContext);

  function openSideBars() {
    setOpenSideBar(true);
  }

  function closeSideBars() {
    setOpenSideBar(false);
  }

  function closeSideBar(open) {
    setOpenSideBar(open);
  }
  const handleFontSize = (status) => {
    if (status === 'dec' && fontSize > 0.70) {
      setFontsize(fontSize - 0.2);
    }
    if (status === 'inc' && fontSize < 2) {
      setFontsize(fontSize + 0.2);
    }
  };

  return (
    <>

      <EditorSideBar isOpen={openSideBar} closeSideBar={closeSideBar} />

      <Disclosure
        as="nav"
        className="flex items-center h-16 border-b border-gray-200"
      >
        {({ open }) => (
          <>

            <div className="h-full w-40 grid justify-items-center items-center border-r border-gray-200">
              <img
                className="h-8 w-8"
                src="/logo.svg"
                alt="Workflow"
              />
            </div>

            <div>
              <span className="text-primary px-10 py-2 text-lg tracking-wide font-extrabold uppercase">
                {selectedProject}
              </span>
            </div>

            <div className="flex-grow">
              <div className="mt-1 relative w-2/5 m-auto focus:ring-primary focus:border-primary bg-gray-100 block rounded-md sm:text-sm border-none placeholder-gray-700">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-300 sm:text-sm">
                    <SearchIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="bg-gray-100 focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-none rounded-md"
                  placeholder="Search"
                  onClick={openSideBars}
                />
              </div>

            </div>

            <div className="flex justify-end">

              <div className="mr-4 flex items-center">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className={styles.btn}>
                        <AppsIcon
                            // stroke="currentColor"
                          fill="currentColor"
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 w-screen max-w-xs mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-0 bg-black p-4 grid-cols-2">
                              {solutions.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex text-white hover:text-primary items-center justify-center flex-col py-3 transition duration-150 ease-in-out rounded-lg hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                >

                                  <item.icon
                                      // stroke="currentColor"
                                    fill="currentColor"
                                      // viewBox="0 0 24 24"
                                      // width="24"
                                      // height="24"
                                    className="w-6 h-6 "
                                    aria-hidden="true"
                                  />

                                  <p className="mt-3 text-sm tracking-wider">
                                    {item.name}
                                  </p>

                                </a>
                                ))}
                            </div>

                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                    )}
                </Popover>

                <button type="button" className={styles.btn}>

                  <div
                    onClick={() => { handleFontSize('dec'); }}
                    role="button"
                    tabIndex="0"
                    className="h6 w-6 hover:text-black font-bold border-r border-gray-200 text-center"
                  >
                    A
                  </div>
                  <div
                    className="h6 w-6 hover:text-black font-bold text-lg text-center"
                    onClick={() => { handleFontSize('inc'); }}
                    role="button"
                    tabIndex="0"
                  >
                    A
                  </div>

                </button>

                <button type="button" className={styles.btn}>
                  <ExpandIcon fill="currentColor" className="h-6 w-6" aria-hidden="true" />
                </button>

                <button type="button" className={styles.btnDark}>
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 border-4 border-gray-300 rounded-full flex items-center text-sm
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-700"
                        >
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {profile.map((item) => (
                            <Menu.Item key={item}>
                              {({ active }) => (
                                <Link href="/profile">
                                  <a
                                    href="#profile"
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700',
                                      )}
                                  >
                                    {item}
                                  </a>
                                </Link>
                                )}
                            </Menu.Item>
                            ))}
                        </Menu.Items>
                      </Transition>
                    </>
                    )}
                </Menu>

              </div>
            </div>

          </>
        )}
      </Disclosure>

    </>

  );
}
