import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {useRouter} from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function signup(){
    const cancelButtonRef = useRef(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sending, setSending] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSending(true);
  
      // Make API request to authenticate
        axios.post('/api/auth/register', {email, password, firstName, lastName}, {headers:{ 'Content-Type': 'application/json'}})
        .then(function (response){
          const { access_token, refresh_token } = response.data;
          Cookies.set('access_token', access_token)
          Cookies.set('refresh_token', refresh_token)
          setSending(false)
          router.push('/profile');
        })
        .catch(function (error){
          setSending(false);
          console.error('Error:', error);
        })
        
    };
    return(
        <>
        <div className="bg-primary-30 flex flex-row mt-5">
            <img src='/CinemaScreen.png' alt="" className="h-[45rem] w-auto"/>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-center ">
                    <img className="h-28 w-auto"src="/DHBWKino.png"alt="DHBW Kino Icon"/>
                </div>
                <div className="">
                      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Create your own Account!
                      </h2>
                </div>
                <div className='mx-10'>
                    <form className="space-y-6">
                        <div>
                          <label htmlFor="fname" className="block text-sm font-medium leading-6 text-white">
                            First Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="fname"
                              name="fname"
                              type="text"
                              placeholder='First Name'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              autoComplete="given-name"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lname" className="block text-sm font-medium leading-6 text-white">
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="lname"
                              name="lname"
                              type="text"
                              placeholder='Last Name'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              autoComplete="family-name"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            E-Mail address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder='E-Mail'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="email"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              placeholder='Password'
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
                            Sign up!
                          </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
        </>
    )}