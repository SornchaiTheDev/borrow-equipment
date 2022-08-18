import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <button
      className="w-16 rounded-full overflow-hidden shadow-md border-4 border-white"
      onClick={() => navigate("/profile")}
    >
      <img
        src="https://randomuser.me/api/portraits/men/21.jpg"
        className="w-full"
      />
    </button>
  );
}

export default Profile;
