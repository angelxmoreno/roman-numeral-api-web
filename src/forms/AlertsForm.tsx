import React, { FC } from 'react';
import * as Yup from 'yup';
import { FormikConfig, FormikHelpers } from 'formik/dist/types';
import { Button, Form, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import { AlertEntity, useAlerts } from '@/alerts';
import SelectRow from '@/forms/elements/SelectRow';
import InputRow from './elements/InputRow';

const AlertsForm: FC = () => {
  const { push } = useAlerts();
  const initialValues: AlertEntity = {
    id: Date.now().toString(10),
    type: `error`,
    message: `hello`,
  };

  const validationSchema = Yup.object({
    type: Yup.string().required(),
    message: Yup.string().required(),
  });

  const onSubmit = async (
    values: AlertEntity,
    actions: FormikHelpers<AlertEntity>,
  ) => {
    const { id, type, message } = values;
    push({ id, type, message });
    actions.setSubmitting(false);
  };
  const formikProps: FormikConfig<AlertEntity> = {
    validationSchema,
    initialValues,
    onSubmit,
  };
  return (
    <Formik {...formikProps}>
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <SelectRow
            name="type"
            label="Type"
            data={[`success`, `error`, `warning`]}
          />
          <InputRow
            name="message"
            label="Message"
            placeholder="Alert Message"
            type="text"
          />

          <Button color="success" block type="submit" disabled={isSubmitting}>
            Push {isSubmitting && <Spinner size="sm" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AlertsForm;
