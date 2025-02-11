import axios from "axios";
import {
  Username,
  Password,
  LoginButton,
  Container,
  LoginForm,
  InnerForm
} from "./styled.components";
import { useDispatch } from "react-redux";
import { storeUser } from "../../data/CurrentCourse";

function LoginPage({ setLogin }) {
  const dispatch = useDispatch();
  // const { user } = useSelector((s) => s.currentCourse);
  const handleSubmit = (event) => {
    event.stopPropagation();
    const formdata = new FormData(event.target);
    console.log(formdata.get("username"), formdata.get("password"));
    axios
      .get("http://localhost:8000/users")
      .then((res) => res.data)
      .then((res) =>
        res.find(
          (e) =>
            e.user === formdata.get("username") &&
            e.password === formdata.get("password")
        )
      )
      .then((res) => {
        dispatch(storeUser(res));
      });
    setLogin(false);
  };
  return (
    <Container>
      <LoginForm onClick={() => setLogin(false)} onSubmit={handleSubmit}>
        <InnerForm onClick={(e) => e.stopPropagation()}>
          <h2 style={{ color: "#8C55AA" }}> Sign In</h2>
          <Username
            placeholder="username"
            type="text"
            name="username"
          ></Username>
          <Password
            placeholder="password"
            type="password"
            name="password"
          ></Password>
          <LoginButton type="submit">Login</LoginButton>
        </InnerForm>
      </LoginForm>
    </Container>
  );
}

export default LoginPage;
