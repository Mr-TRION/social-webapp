import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  Divider,
  Icon,
} from "semantic-ui-react";
import Link from "next/link";
import { loginUser } from "../utils/authUser";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import cookie from "js-cookie";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(user, setErrorMsg, setFormLoading);
  };

  useEffect(() => {
    document.title = "Social App";
    const userEmail = cookie.get("userEmail");
    if (userEmail) setUser((prev) => ({ ...prev, email: userEmail }));
  }, []);

  return (
    <>
      {/* <HeaderMessage /> */}
      <Segment id="form-segment">
        <h3 id="form-title">Login</h3>
        <Form
          loading={formLoading}
          error={errorMsg !== null}
          onSubmit={handleSubmit}
        >
          <Message
            error
            header="Oops!"
            content={errorMsg}
            onDismiss={() => setErrorMsg(null)}
          />

          <Form.Input
            id="form-input"
            required
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
          />

          <Form.Input
            id="form-input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? "text" : "password"}
            required
          />

          <Divider hidden />
          <Button
            id="form-button"
            icon="signup"
            content="Login"
            type="submit"
            color="linkedin"
            disabled={submitDisabled}
          />
          <Icon name="lock" />
          <Link href="/reset">Forgot Password?</Link>
        </Form>
        <br />

        <FooterMessage />
      </Segment>
    </>
  );
}

export default Login;
