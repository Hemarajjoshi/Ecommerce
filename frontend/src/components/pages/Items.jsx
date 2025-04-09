import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { fetchProducts } from "../redux/productSlice";
import { useDispatch, useSelector} from "react-redux";

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const items = useSelector((state)=>state.products.items);
  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch, searchTerm])

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <ItemCard image={item.photo} name = {item.name} price = {item.price} category={item.category}  />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            No items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Items;
