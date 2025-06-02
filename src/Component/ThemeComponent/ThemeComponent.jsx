import { useDispatch, useSelector } from "react-redux";
import darkCloud from "../../Assets/Logo/dark-cloud.svg";
import whiteCloud from "../../Assets/Logo/white-cloud.svg";
import { setTheme } from "../../data/ThemeSlice";
import { CloudImage } from "../../Pages/WelcomePage/styled.components";

export default function ThemeComponent() {
  const dispatch = useDispatch();
  const { themeDark } = useSelector((s) => s.theme);

  return (
    <CloudImage
      onClick={() => dispatch(setTheme())}
      src={themeDark ? darkCloud : whiteCloud}
      alt="img"
    />
  );
}
