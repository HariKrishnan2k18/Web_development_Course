import { useDispatch } from "react-redux";
import {
  Container,
  InnerForm,
  LoginButton,
  LoginForm,
  Username,
} from "../LoginPage/styled.components";
import { isMobile } from "react-device-detect";

import { useForm } from "react-hook-form";
import { loadUserRegister } from "../../data/CurrentCourse";

function RegisterPage({ setRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(loadUserRegister(data));
    setRegister(false);
  };

  const password = watch("password");

  const userInputs = [
    { name: "first_name", placeholder: "First Name", type: "text" },
    { name: "last_name", placeholder: "Last Name", type: "text" },
    { name: "user_name", placeholder: "User Name", type: "text" },
    { name: "email", placeholder: "yourname@gmail.com", type: "email" },
    { name: "country", placeholder: "Country", type: "text" },
    { name: "number", placeholder: "Mobile Number", type: "number" },
    { name: "password", placeholder: "Password", type: "password" },
    {
      name: "confirm_password",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  const getValidationRules = (field) => {
    switch (field.name) {
      case "first_name":
      case "last_name":
        return { required: true, minLength: 4 };
      case "user_name":
        return { required: true, minLength: 4 };
      case "email":
        return {
          required: true,
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email",
          },
        };
      case "country":
        return { required: true, minLength: 4 };
      case "number":
        return {
          required: true,
          pattern: {
            value: /^\d{10}$/,
            message: "Mobile number must be 10 digits",
          },
        };
      case "password":
        return { required: true, minLength: 5, maxLength: 15 };
      case "confirm_password":
        return {
          required: true,
          validate: (value) => value === password || "Passwords do not match",
        };
      default:
        return { required: true };
    }
  };

  return (
    <Container>
      <LoginForm
        onClick={() => {
          setRegister(false);
        }}
        style={isMobile && { justifyContent: "unset", paddingTop: "80px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InnerForm onClick={(event) => event.stopPropagation()}>
          <h3 style={{ color: "#8C55AA" }}>Register Page</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: !isMobile && "repeat(2, 1fr)",
              gap: isMobile ? "12px" : "20px",
            }}
          >
            {userInputs.map((e) => (
              <div
                key={e.name}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Username
                  type={e.type}
                  placeholder={e.placeholder}
                  {...register(e.name, getValidationRules(e))}
                />
                {errors[e.name] && (
                  <small style={{ color: "red" }}>
                    {errors[e.name].message || `${e.placeholder} is required`}
                  </small>
                )}
              </div>
            ))}
          </div>
          <LoginButton type="submit">Submit</LoginButton>
        </InnerForm>
      </LoginForm>
    </Container>
  );
}

export default RegisterPage;
