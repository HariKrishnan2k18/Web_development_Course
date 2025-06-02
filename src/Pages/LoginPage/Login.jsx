import {
  Username,
  Password,
  LoginButton,
  Container,
  LoginForm,
  InnerForm,
} from "./styled.components";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../data/CurrentCourse";

import { useEffect } from "react";

function LoginPage({ setLogin }) {
  const dispatch = useDispatch();
  const { user, errorUser } = useSelector((s) => s.currentCourse);

  const handleSubmit = (event) => {
    event.stopPropagation();
    const formdata = new FormData(event.target);
    dispatch(
      loadUser({
        user: formdata.get("username"),
        password: formdata.get("password"),
      })
    );
  };
  console.log({ user });
  useEffect(() => {
    if (user?.id) {
      setLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
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
          {errorUser && <h3 style={{ color: "red" }}>Login failed</h3>}
        </InnerForm>
      </LoginForm>
    </Container>
  );
}

export default LoginPage;
