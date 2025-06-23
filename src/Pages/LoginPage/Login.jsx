/* eslint-disable react-hooks/exhaustive-deps */
import {
  Username,
  Password,
  LoginButton,
  Container,
  LoginForm,
  InnerForm,
} from "./styled.components";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, resetUser } from "../../data/CurrentCourse";

import { useEffect } from "react";
import { isEmpty } from "lodash";
import { fetchDataRequest } from "../../data/SubFolderSlice";
import { useNavigate } from "react-router-dom";

function LoginPage({ setLogin }) {
  const dispatch = useDispatch();
  const { user, errorUser, course } = useSelector((s) => s.currentCourse);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (user?.id) {
      if (!isEmpty(course) && course.availability) {
        dispatch(
          fetchDataRequest({
            FOLDER_ID: course.folderid,
            API_KEY: course.apikey,
          })
        );
        navigate("/course");
      } else if (!isEmpty(course)) {
        alert("course unavailable");
        setLogin(false);
      } else {
        setLogin(false);
      }
    }
  }, [user, course, errorUser, dispatch]);
  return (
    <Container>
      <LoginForm
        onClick={() => {
          setLogin(false);
          dispatch(resetUser());
        }}
        onSubmit={handleSubmit}
      >
        <InnerForm onClick={(e) => e.stopPropagation()}>
          <h2 style={{ color: "#8C55AA" }}> Sign In</h2>
          <Username
            placeholder="username"
            type="text"
            name="username"
            autoComplete="username"
          />
          <Password
            placeholder="password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
          <LoginButton type="submit">Login</LoginButton>
          {user?.message ? (
            <h4 style={{ color: "red" }}>UserName or Password is Invalid</h4>
          ) : (
            errorUser && <h3 style={{ color: "red" }}>Login failed</h3>
          )}
        </InnerForm>
      </LoginForm>
    </Container>
  );
}

export default LoginPage;
