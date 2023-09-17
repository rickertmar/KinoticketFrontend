import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className='text-white py-5'>
      <Head>
        <title>Privacy Policy - DHBW Kino</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1 className='text-4xl'>Privacy Policy</h1>

      <p className='pt-2'>
        <strong>Effective Date:</strong> 17.09.2023
      </p>

      <h2 className='text-2xl pt-3'>1. Introduction</h2>
      <p>
        Thank you for visiting DHBW Kino. At DHBW Kino, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.
      </p>

      <h2 className='text-2xl pt-3'>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> This may include your name, email address, postal address, phone number, and other identifiers when you provide them voluntarily.</li>
        <li><strong>Non-Personal Information:</strong> We may collect non-personal information, such as browser type, device information, and IP address, to enhance your experience and for analytical purposes.</li>
      </ul>

      <h2 className='text-2xl pt-3'>3. How We Use Your Information</h2>
      <p>We may use your information for the following purposes:</p>
      <ul className=' list-disc list-inside'>
        <li>To provide and maintain our services.</li>
        <li>To communicate with you, including responding to your inquiries.</li>
        <li>To improve our website and services.</li>
        <li>To personalize your experience.</li>
        <li>To analyze and monitor website usage.</li>
      </ul>

      <h2 className='text-2xl pt-3'>4. Data Sharing</h2>
      <p>We may share your information with:</p>
      <ul className=' list-disc list-inside'>
        <li>Service providers and partners necessary for the operation of our website.</li>
        <li>Legal authorities when required by law or to protect our rights.</li>
        <li>Third parties with your consent.</li>
      </ul>

      <h2 className='text-2xl pt-3'>5. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar tracking technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings.</p>

      <h2 className='text-2xl pt-3'>6. Your Rights</h2>
      <p>You have the following rights concerning your personal information:</p>
      <ul className=' list-disc list-inside'>
        <li>The right to access your data.</li>
        <li>The right to rectify inaccuracies in your data.</li>
        <li>The right to erase your data.</li>
        <li>The right to object to processing.</li>
        <li>The right to data portability.</li>
      </ul>
      <p>To exercise these rights, please contact us at:</p>
      <ul className=' list-disc list-inside'>
        <li>Email: <a href="mailto:Konrad-Lorenz@outlook.com">Konrad-Lorenz@outlook.com</a></li>
        <li>Phone: +49 15231883345</li>
        <li>Postal Address: Gerhard-Marcks-Str. 6a<br />68163 Mannheim<br />Germany</li>
      </ul>

      <h2 className='text-2xl pt-3'>7. Data Security</h2>
      <p>We take data security seriously and employ measures to protect your information. However, no method of transmission over the internet or electronic storage is entirely secure.</p>

      <h2 className='text-2xl pt-3'>8. Changes to this Privacy Policy</h2>
      <p>We may update this Privacy Policy to reflect changes to our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.</p>

      <h2 className='text-2xl pt-3'>9. Contact Us</h2>
      <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at the provided contact information above.</p>
    </div>
  );
}
