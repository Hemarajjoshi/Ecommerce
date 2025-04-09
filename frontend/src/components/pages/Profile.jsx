import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser} from "../redux/authSlice"

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = (e)=>{
    e.preventDefault();
    dispatch(
        logoutUser()
    )

  }


  
  
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate,]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1> Welcome to our store {user.username}</h1>
      {user && (
        <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {" "}
          Logout{" "}
        </button>
      )}

      {user && !user.is_superuser && (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"> delete account</button>
      )}
    </div>
  );
}
