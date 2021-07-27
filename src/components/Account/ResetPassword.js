import React, { useRef, useState } from "react";
import { Form, Card, Button, Input, Row, Col, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const { Item } = Form;

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const [form] = Form.useForm();
  const emailRef = useRef();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setErrors("");
      await resetPassword(emailRef.current.state.value);
      setMessage(
        "Your reset password link have been sent to your email. Please check your email's inbox for further instructions"
      );
    } catch {
      setErrors("Something went wrong! Cannot reset pasword");
      history.push("/reset-password");
    }
  };

  return (
    <>
      <div className="wrapper">
        <Row>
          <Col span={24}>
          {message && (
                <Alert
                  message="Error"
                  description={message}
                  type="info"
                  showIcon
                  closable
                />
              )}
            <Card title="Reset Password">
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
                onSubmit={handleResetPassword}
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
                      message: "Please enter your Email!",
                    },
                    {
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Your email is invalid",
                    },
                  ]}
                >
                  <Input autoComplete="off" ref={emailRef} />
                </Item>

                <Button
                  onClick={handleResetPassword}
                  type="primary"
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </Form>
              <div className="already">
                Already have an account? <Link to="/login">Sign in here</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ResetPassword;
