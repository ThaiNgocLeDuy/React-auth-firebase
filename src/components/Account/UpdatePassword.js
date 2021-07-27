import React, { useRef, useState } from "react";
import { Form, Card, Button, Input, Row, Col, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const { Item } = Form;
const { Password } = Input;

const UpdatePassword = () => {
  const { updateEmail, UpdatePassword, currentUser } = useAuth();
  const history = useHistory();
  const [errors, setErrors] = useState("");

  const [form] = Form.useForm();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const promise = [];
    setErrors("");

    if (emailRef.current.state.value !== currentUser.email) {
      promise.push(updateEmail(emailRef.current.state.value));
    }
    if (passwordRef.current.state.value) {
      promise.push(UpdatePassword(passwordRef.current.state.value));
    }

    Promise.all(promise)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setErrors("Failed to update password!");
        history.push("/reset-password");
      });
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
                onSubmit={handleUpdatePassword}
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
                  <Input
                    ref={emailRef}
                    disabled
                    defaultValue={currentUser.email}
                  />
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
                <Button
                  onClick={handleUpdatePassword}
                  type="primary"
                  htmlType="submit"
                >
                  Update Password
                </Button>
                
              </Form>
              <div className="already">
                <Link to="/">Cancel</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UpdatePassword;
