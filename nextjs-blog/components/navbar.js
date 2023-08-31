import { useState, useEffect } from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import Link from 'next/link'
import LoginDialouge from './loginDialogue';

const navigation = [
  { name: 'Program', href: '/', current: false },
  { name: 'Information', href: '/information', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const router = useRouter(); // Get the router object
  const [currentPath, setCurrentPath] = useState('/');
  useEffect(() => {
    // This code will run only on the client side
    setCurrentPath(router.pathname);
  }, [router.pathname]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Disclosure as="nav" className="bg-primary-20">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button
                className="p-2 rounded-md text-secondary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
                          : 'text-gray-300 hover:bg-primary-30 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <button className='relative ml-2' onClick={() => setIsOpen(true)}>
              <UserCircleIcon className='h-8 w-8 text-white'/>
            </button>
          </div>
        </div>
        <LoginDialouge open={isOpen} setOpen={setIsOpen}/>
      </>
    )}
  </Disclosure>
  );
}
