import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "./ItemCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";


const Home = () => {
  const sliderImages = [
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const { items, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchProducts());
  }
   , [dispatch]);

   console.log(error)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[90vh] flex items-center justify-center">
        <Slider {...sliderSettings} className="absolute inset-0 w-full h-full">
          {sliderImages.map((img, index) => (
            <div key={index} className="relative w-full h-[90vh]">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute w-full text-center text-white px-6 md:px-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-green-400">Organic Hub</span>
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            Discover Nature's Finest Produce
          </p>
          <NavLink
            to="/items"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 text-lg shadow-lg"
          >
            Shop Now
          </NavLink>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Fresh From Our Store
        </h2>

        {loading && <p className="text-center">Loading products...</p>}

        <div className="overflow-x-auto pb-8">
          <div className="flex space-x-8 px-4">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[300px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <ItemCard
                    image={item.photo}
                    name={item.name}
                    price={parseFloat(item.price)}
                    category={item.category || "N/A"}
                  />
                </div>
              ))
            ) : (
              <p className="text-center w-full">No products available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-green-600 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                100% Organic
              </h3>
              <p className="text-gray-600">
                Certified organic produce from Local farms of Farwest.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-green-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Delivery Within a Week (7 Days)
              </h3>
              <p className="text-gray-600">
                Freshness delivered to your doorstep
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-green-600 text-4xl mb-4">💚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Eco-Friendly
              </h3>
              <p className="text-gray-600">
                Sustainable packaging and practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;