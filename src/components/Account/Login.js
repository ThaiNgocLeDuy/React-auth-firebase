import React, { useRef, useState } from "react";
import { Form, Card, Button, Input, Row, Col, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const { Item } = Form;
const { Password } = Input;

const Login = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [errors, setErrors] = useState("");

  const [form] = Form.useForm();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrors("");
      await login(
        emailRef.current.state.value,
        passwordRef.current.state.value
      );
      history.push("/");
    } catch {
      setErrors("Something went wrong! Login failed");
    }
  };

  return (
    <>
      <div className="wrapper">
        <Row>
          <Col span={24}>
            <Card title="Sign In">
              {errors && (
                <Alert
                  message="Error"
                  description={errors}
                  type="warning"
                  showIcon
                  closable
                />
              )}
              <Form
                onSubmit={handleLogin}
                form={form}
                name="sign-up"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                <Item
                  label="Email"
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Your email is invalid",
                    },
                  ]}
                >
                  <Input autoComplete="off" ref={emailRef} />
                </Item>
                <Item
                  label="Password"
                  name="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                    {
                      min: 8,
                      message: "Password must have at least 8 characters!",
                    },
                  ]}
                >
                  <Password ref={passwordRef} />
                </Item>
                <Button onClick={handleLogin} type="primary" htmlType="submit">
                  Sign In
                </Button>
                <p>or</p>
                <Button type="danger">Sign in with Google</Button>
              </Form>
              <div className="already">
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </div>
              <Link to="/reset-password">Forgot Password?</Link>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
