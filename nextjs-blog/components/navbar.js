import { useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import Link from 'next/link'
import LoginDialouge from './loginDialogue';
import { Fragment } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const navigation = [
  { name: 'Program', href: '/', current: false },
  { name: 'Information', href: '/information', current: false },
  { name: 'Contact', href: '/information/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({isAuthenticated}) {
  const router = useRouter(); // Get the router object
  const [currentPath, setCurrentPath] = useState('/');
  useEffect(() => {
    // This code will run only on the client side
    setCurrentPath(router.pathname);
  }, [router.pathname]);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
    <Disclosure as="nav" className="dark:bg-primary-20 bg-primary-30">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-5">
          <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link href="/">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="/DHBWKino.png"
                  alt="DHBW Kino Icon"
                />
              </div>
              </Link>
              
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.href === currentPath
                          ? 'bg-primary-10 text-white'
                          : 'dark:text-neutral-300 text-white dark:hover:bg-primary-30 hover:bg-primary-20 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {!isAuthenticated?
              <button className='relative ml-2 p-1' onClick={() => setIsOpen(true)}>
                <UserCircleIcon className='h-8 w-8 text-white'/>
              </button>
              :
              <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative mt-[4px] p-1 bg-primary-40 rounded-xl">
                      <UserCircleIcon className='h-8 w-8 text-accent-50  '/>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/user/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href=""
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={() => {axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`; axios.post(process.env.API_URL + '/auth/logout', {headers:{ 'Content-Type': 'application/json'}})
                            .then(function (){
                              console.log("test")
                              Cookies.remove('access_token')
                              Cookies.remove('refresh_token')
                              router.push("/")
                            })
                          }}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
            }
            
          </div>
        </div>
        <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  as={Link}
                  key={item.name}
                  href={item.href}
                  onClick={() =>close()}
                  className={classNames(
                        item.href === currentPath
                          ? 'bg-primary-10 text-white'
                          : 'dark:text-neutral-300 text-white dark:hover:bg-primary-30 hover:bg-primary-20 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium block'
                      )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
      </>
    )}
  </Disclosure>
  <LoginDialouge open={isOpen} setOpen={setIsOpen}/>
    </>
    
  );
}


