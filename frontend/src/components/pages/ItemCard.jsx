export default function ItemCard({ image, name, price, category }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="text-sm text-green-600 font-semibold">{category}</span>
        <h3 className="text-xl font-bold text-gray-800 mt-2">{name}</h3>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${price}</span>
          <button className=" cursor-pointer bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
