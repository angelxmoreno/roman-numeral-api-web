import React, { FC } from 'react';
import * as Yup from 'yup';
import { FormikConfig, FormikHelpers } from 'formik/dist/types';
import { Button, Form, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import axios from 'axios';
import { AuthFormResponse, LogInPayload } from '@/client';
import { useRouter } from 'next/router';
import InputRow from './InputRow';

const LogInForm: FC = () => {
  const router = useRouter();

  const initialValues: LogInPayload = {
    email: ``,
    password: ``,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(`Invalid email address`).required(`Required`),
    password: Yup.string().required(`Required`),
  });

  const onSubmit = async (
    values: LogInPayload,
    actions: FormikHelpers<LogInPayload>,
  ) => {
    const { email, password } = values;
    const { data } = await axios.post<AuthFormResponse>(`/api/login`, {
      email,
      password,
    });
    const { isValid, errors } = data;
    if (!isValid && errors) {
      errors.forEach((error) => {
        actions.setFieldError(error.property, error.messages[0]);
      });
    } else {
      await router.push(`/`);
    }
    actions.setSubmitting(false);
  };
  const formikProps: FormikConfig<LogInPayload> = {
    validationSchema,
    initialValues,
    onSubmit,
  };
  return (
    <Formik {...formikProps}>
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <InputRow
            name="email"
            label="Email Address"
            placeholder="email address"
            type="email"
          />
          <InputRow name="password" label="Password" type="password" />
          <Button color="success" block type="submit" disabled={isSubmitting}>
            Log In {isSubmitting && <Spinner size="sm" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;
