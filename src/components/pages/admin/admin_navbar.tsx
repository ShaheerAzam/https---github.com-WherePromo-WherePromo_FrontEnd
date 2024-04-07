import { Link } from 'react-router-dom';

const Admin_Navbar = () => {




  return (
    <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl text-sky-500 font-bold mr-4">WherePromo</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <div className="text-gray-700 hover:text-blue-500" >Pricing</div>
        <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
        <Link to="/articles" className="text-gray-700 hover:text-blue-500">Articles</Link>
        <Link to="/maps" className="text-gray-700 hover:text-blue-500">Maps</Link>
        <Link to="/scrappedsites" className="text-gray-700 hover:text-blue-500">Scrapped Sites</Link>
        <Link to="/ApproveArticles" className="text-gray-700 hover:text-blue-500">Articles</Link>
        <Link to="/contributions" className="text-gray-700 hover:text-blue-500">Contributions</Link>
              
      </div>

      <div>
          <button className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2 mr-4" >
          +
        </button>
        <button className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2" >
          Logout
        </button>
      </div>

  

     

    </nav>
  );
};

export default Admin_Navbar;
