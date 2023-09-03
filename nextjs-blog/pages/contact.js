import { useState } from 'react';

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#90DDF0" }}>Contact Form</h2>
      </div>

      <form>
        <p className="mt-4 text-white">Our service team is happy to assist you:
          <br />
          By phone at 0621 / xx xx xx (14 ct/min, max. 42 ct/min), daily from 2:00 PM to 8:00 PM
          <br />
          Via email at service@dhbwkino.de
          <br />
          Through the contact form below.
        </p>

        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-6">
              <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">First name</label>
                <div className="mt-2">
                  <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">Last name</label>
                <div className="mt-2">
                  <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">Phone</label>
                <div className="mt-2">
                  <input id="phone" name="phone" type="phone" autoComplete="tel" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                </div>
              </div>

              <div className="sm:col-span-3">
  <label htmlFor="topic" className="block text-sm font-medium leading-6 text-white">Topic</label>
  <div className="mt-2">
    <select
      id="topic"
      name="topic"
      autoComplete="topic"
      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      onChange={handleTopicChange}
      value={selectedTopic}
      required  
    >
      <option value="" disabled hidden>Select an option</option>
      <option value="Feedback">Feedback</option>
      <option value="Question">Question</option>
      <option value="Complaint">Complaint</option>
    </select>
  </div>
</div>


              <div className="col-span-full">
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-white">Your Message</label>
                <div className="mt-2">
                  <input type="text" name="message" id="message" autoComplete="message" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">Check Box</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                  <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" required />

                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-white">Accept Privacy Policy</label>
                    <p className="text-gray-500">This can be revoked at any time</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-white">Would you like to receive offers via email?</label>
                    <p className="text-gray-500">You will receive exciting offers for free via email</p>
                  </div>
                </div>
               
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">You will receive a response to your email shortly</legend>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </form>
    </>
  );
}
