import React, { useRef, useState } from "react";
import { Form, Card, Button, Input, Row, Col, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const { Item } = Form;
const { Password } = Input;

const SignUp = () => {
  const { signUp } = useAuth();
  const history = useHistory();
  const [errors, setErrors] = useState("");

  const [form] = Form.useForm();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setErrors("");
      await signUp(
        emailRef.current.state.value,
        passwordRef.current.state.value
      );
      history.push("/");
    } catch {
      setErrors("Somthing went wrong. User registration failed!!!");
    }
  };

  return (
    <>
      <div className="wrapper">
        <Row>
          <Col span={24}>
            <Card title="Sign up">
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
                onSubmit={handleSignup}
                form={form}
                name="sign-up"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
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
                  <Input ref={emailRef} autoComplete="off" />
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
                <Item
                  label="Password Confirmation"
                  name="Password Confirmation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password Confirmation!",
                    },
                    {
                      min: 8,
                      message: "Password must have at least 8 characters!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("Password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Password />
                </Item>
                <Button onClick={handleSignup} type="primary" htmlType="submit">
                  Sign up
                </Button>
                <p>or</p>
                <Button
                  onClick={() => console.log(emailRef.current)}
                  type="danger"
                >
                  Sign in with Google
                </Button>
              </Form>
              <div className="already">
                Already have an account? <Link to="/login">Sign in here</Link>
              </div>
              <Link to="/reset-password">Forgot Password?</Link>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignUp;
