import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {useRouter} from 'next/router'

export default function LoginDialouge({ open, setOpen }) {
  const cancelButtonRef = useRef(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState(true);
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const close = () =>{
    setCredentials(true);
    setOpen();
    setSending(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setCredentials(true);
    // Make API request to authenticate
    try {
      const response = await fetch('api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        var data = await response.json();
        // Store authentication data and redirect
        localStorage.setItem('access_token', data.access_token);
        setOpen(false)
        setCredentials(true)
        setSending(false)
        router.push('/information'); // Redirect to dashboard
      } else {
        setCredentials(false);
        setSending(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 "
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-primary-40 text-left shadow-xl transition-all px-6 py-3 lg:px-20 lg:pt-5 lg:pb-10 sm:px-10 sm:pb-5 sm:pt-2">
                <div className='flex items-center justify-center'>
                  <img
                      className="h-28 w-auto "
                      src="/DHBWKino.png"
                      alt="DHBW Kino Icon"
                    />
                </div>
                  
                  <div className="sm:flex sm:items-start">
                      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="email"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                              Password
                            </label>
                            <div className="text-sm">
                              <a href="#" className="font-semibold text-accent-40 hover:text-accent-50">
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="current-password"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            disabled={sending}
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md bg-accent-40 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-40"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                      <p className='mt-10 text-center text-md font-bold text-red-600 ' hidden={credentials}>
                        Wrong Email or Password!
                      </p>
                      <p className="mt-10 text-center text-sm text-gray-300" >
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-accent-40 hover:text-accent-50">
                          Sign up now!
                        </a>
                      </p>
                    </div>

                  
                
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
