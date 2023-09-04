import { useState } from 'react';

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="bg-primary-30 min-h-screen">
   
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-indigo-600 text-white px-6 py-8 sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h2>
              <p className="text-lg">Feel free to reach out to us!</p>
            </div>
          </div>
          <div className="px-6 py-8">
            <form>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" required />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    autoComplete="topic"
                    className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
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
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                  <textarea name="message" id="message" autoComplete="message" rows="4" className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" required></textarea>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input id="comments" name="comments" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                  <label htmlFor="comments" className="ml-2 font-medium text-gray-700">Accept Privacy Policy</label>
                </div>
                <p className="text-gray-500">This can be revoked at any time</p>
                <div className="flex items-center">
                  <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                  <label htmlFor="candidates" className="ml-2 font-medium text-gray-700">Receive Offers via Email</label>
                </div>
                <p className="text-gray-500">You will receive exciting offers for free via email</p>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
   
  );
}
