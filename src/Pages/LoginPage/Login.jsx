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
  const API_URL = String(process.env.REACT_APP_USER_API_URL);
  const handleSubmit = (event) => {
    event.stopPropagation();
    const formdata = new FormData(event.target);
    axios
      .post(`${API_URL}/users`, {
        user: formdata.get("username"),
        password: formdata.get("password")
      })
      .then((res) => dispatch(storeUser(res.data)));

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
