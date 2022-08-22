import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <button
      className="w-16 h-16 rounded-full overflow-hidden shadow-md border-4 border-white flex items-center"
      onClick={() => navigate("/profile")}
    >
      <img
        src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
        className="w-full"
      />
    </button>
  );
}

export default Profile;
