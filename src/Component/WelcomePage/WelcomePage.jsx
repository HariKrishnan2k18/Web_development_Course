import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDataRequest } from "../../data/SubFolderSlice";

const FOLDER_ID = "1-1Q8yNbknFn-CMzFik1xp1bI5r9GaNMX";
const API_KEY = "AIzaSyDoNuBE0rTDp_IIRaklAaibErtalhb3mN4";

function WelcomePage({ title }) {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%"
      }}
    >
      <h1>{title}</h1>
      <Link
        to="/course"
        onClick={() => dispatch(fetchDataRequest({ FOLDER_ID, API_KEY }))}
      >
        Start Course
      </Link>
    </div>
  );
}

export default WelcomePage;
