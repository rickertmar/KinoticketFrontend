import { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    comments: false,
    candidates: false,
  });

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formValues.firstName === '' ||
      formValues.lastName === '' ||
      formValues.email === '' ||
      formValues.message === '' ||
      !formValues.comments
    ) {
      alert('Please fill in all required fields and accept the privacy policy.');
      return;
    }

      

    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      comments: false,
      candidates: false,
    });
    setSelectedTopic('');
  };

  return (

    <div className="flex justify-center items-center bg-primary-30">
      <Head>
        <title>Contact Us - DHBW Kino</title>
        <meta name="description" content="Contact us with your questions, feedback, or complaints. We're here to assist you!" />
      </Head>
      <div className='mt-10 px-20 py-5'>
        <div className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-accent-50">Contact Us</h2>
          <p className="text-lg">Feel free to reach out to us!</p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formValues.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-white" >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formValues.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="topic" className="block text-sm font-medium text-white">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                autoComplete="topic"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                onChange={handleTopicChange}
                value={selectedTopic}
                required
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                <option value="Feedback">Feedback</option>
                <option value="Question">Question</option>
                <option value="Complaint">Complaint</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                autoComplete="message"
                rows="4"
                className="mt-1 p-3 w-full rounded-md border border-gray-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                value={formValues.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="flex items-center">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={formValues.comments}
                onChange={handleChange}
                required
              />
              <label htmlFor="comments" className="ml-2 font-medium text-white">
                Accept Privacy Policy
              </label>
            </div>
            <p className="text-gray-500">This can be revoked at any time</p>
            <div className="flex items-center">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={formValues.candidates}
                onChange={handleChange}
              />
              <label htmlFor="candidates" className="ml-2 font-medium text-white">
                Receive Offers via Email
              </label>
            </div>
            <p className="text-gray-500">You will receive exciting offers for free via email</p>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      
      
    </div>
  );
}
