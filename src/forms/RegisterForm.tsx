import React, { FC } from 'react';
import * as Yup from 'yup';
import { FormikConfig, FormikHelpers } from 'formik/dist/types';
import { Button, Form, Spinner } from 'reactstrap';
import InputRow from '@/forms/elements/InputRow';
import { Formik } from 'formik';
import axios from 'axios';
import { AuthFormResponse } from '@/client';
import { useRouter } from 'next/router';
import { useAlerts } from '@/alerts';

interface FormValues {
  name: string;
  email: string;
  email2: string;
  password: string;
  password2: string;
}

const RegisterForm: FC = () => {
  const router = useRouter();
  const Alerts = useAlerts();

  const initialValues: FormValues = {
    name: ``,
    email: ``,
    email2: ``,
    password: ``,
    password2: ``,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, `Must be 2 characters or more`)
      .required(`Required`),
    email: Yup.string().email(`Invalid email address`).required(`Required`),
    password: Yup.string().required(`Required`),
    email2: Yup.string()
      .required(`Required`)
      .oneOf([Yup.ref(`email`), null], `Emails must match`),
    password2: Yup.string()
      .required(`Required`)
      .oneOf([Yup.ref(`password`), null], `Passwords must match`),
  });
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    const { name, email, password } = values;
    const { data } = await axios.post<AuthFormResponse>(`/api/register`, {
      name,
      email,
      password,
    });
    const { isValid, errors } = data;
    if (!isValid && errors) {
      errors.forEach((error) => {
        actions.setFieldError(error.property, error.messages[0]);
      });
    } else {
      Alerts.auth(`Successfully logged in`);

      await router.push(`/`);
    }
    actions.setSubmitting(false);
  };
  const formikProps: FormikConfig<FormValues> = {
    validationSchema,
    initialValues,
    onSubmit,
  };
  return (
    <Formik {...formikProps}>
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <InputRow
            name="name"
            label="Full Name"
            placeholder="your name"
            type="text"
          />
          <InputRow
            name="email"
            label="Email Address"
            placeholder="email address"
            type="email"
          />
          <InputRow
            name="email2"
            label="Confirm Email"
            placeholder="repeat email address"
            type="email"
          />
          <InputRow name="password" label="Password" type="password" />
          <InputRow name="password2" label="Confirm Password" type="password" />
          <Button color="success" block type="submit" disabled={isSubmitting}>
            Register {isSubmitting && <Spinner size="sm" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
