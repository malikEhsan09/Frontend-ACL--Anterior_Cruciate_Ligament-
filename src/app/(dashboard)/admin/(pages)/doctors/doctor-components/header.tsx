interface HeaderProps {
  sortOrder: string;
  setSortOrder: (value: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sortOrder, setSortOrder, setIsModalOpen }) => (
    <div className="flex justify-between items-start mb-3 bg-[#F0F0F0] p-2 rounded-t-2xl">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <div className="w-3 h-8 bg-[#152f86b2] rounded-md mr-3"></div>
          <h2 className="text-xl font-bold text-gray-800">Doctors</h2>
        </div>
        <button
          className="text-md font-semibold px-2 p-1 rounded-md text-white bg-buttonColor mt-1 ml-3 hover:cursor-pointer hover:bg-primary/90"
          onClick={() => setIsModalOpen(true)}
        >
          Add Doctor
        </button>
      </div>
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-600 mr-2">Sort by:</label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="MostViewed">Most Viewed</option>
          <option value="HighestRated">Highest Rated</option>
        </select>
      </div>
    </div>
  );
  
  export default Header;
  