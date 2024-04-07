import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Paid_Navbar = () => {



  const [showPricing, setShowPricing] = useState(false);
  const [showContributionPopup, setShowContributionPopup] = useState(false);
  const [contributionName, setContributionName] = useState('');
  const [contributionDetail, setContributionDetail] = useState('');
  const [picture, setPicture] = useState(null);

  const togglePricing = () => {
    setShowPricing(!showPricing);
  };

  const toggleContributionPopup = () => {
    setShowContributionPopup(!showContributionPopup);
  };

  const handleContributionNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setContributionName(e.target.value);
  };

  const handleContributionDetailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setContributionDetail(e.target.value);
  };

  // const handlePictureChange = (e: { target: { files: React.SetStateAction<null>[]; }; }) => {
  //   setPicture(e.target.files[0]);
  // };

  const handleSubmitContribution = () => {
    // Handle contribution submission logic here
    console.log('Contribution Name:', contributionName);
    console.log('Contribution Detail:', contributionDetail);
    console.log('Picture:', picture);
    // Clear form fields after submission
    setContributionName('');
    setContributionDetail('');
    setPicture(null);
    // Close contribution popup
    setShowContributionPopup(false);
  };


  return (
    <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl text-sky-500 font-bold mr-4">WherePromo</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <div className="text-gray-700 hover:text-blue-500" onClick={togglePricing}>Pricing</div>
        <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
        <Link to="/articles" className="text-gray-700 hover:text-blue-500">Articles</Link>
        <Link to="/maps" className="text-gray-700 hover:text-blue-500">Maps</Link>
      </div>

      <div>
          <button className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2 mr-4"  onClick={toggleContributionPopup}>
          +
        </button>
        <button className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2" >
          Logout
        </button>
      </div>

      {showPricing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center px-8 py-6 max-w-lg text-base bg-white rounded-3xl max-md:px-5 relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={togglePricing}>
              x
            </button>
            <div className="mt-2 text-2xl font-bold tracking-tighter text-sky-500 leading-[30px]">
              Get Premium Today!
            </div>
            <div className="mt-4 w-full text-base tracking-wider leading-6 text-stone-500">
              Join today to get some amazing features like:
            </div>
            <div className="flex flex-col px-4 mt-4 w-full">
              <div className="text-base tracking-wider leading-6 text-black">
                Advanced AI assistance
              </div>
              <div className="mt-2 text-base tracking-wider leading-6 text-black">
                Tailored Grocery Shop Lists
              </div>
              <div className="mt-2 text-base tracking-wider leading-6 text-black">
                User-Driven Contribution Rewards
              </div>
              <div className="flex justify-between mt-6 w-full">
                <div className="text-xl font-bold tracking-tighter text-right text-blue-500">
                  €9.90
                </div>
                <div className="text-lg tracking-wider text-gray-700">/mon</div>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2">
                Get Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {showContributionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center px-8 py-6 max-w-lg text-base bg-white rounded-3xl max-md:px-5 relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={toggleContributionPopup}>
              x
            </button>
            <div className="mt-2 text-2xl font-bold tracking-tighter text-sky-500 leading-[30px]">
              Add Contribution
            </div>
            <div className="mt-4 w-full">
              <input
                type="text"
                value={contributionName}
                onChange={handleContributionNameChange}
                placeholder="Contribution Name"
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 w-full">
              <textarea
                value={contributionDetail}
                onChange={handleContributionDetailChange}
                placeholder="Contribution Detail"
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 w-full">
              <input
                type="file"
           //     onChange={handlePictureChange}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6">
              <button className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2" onClick={handleSubmitContribution}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Paid_Navbar;
