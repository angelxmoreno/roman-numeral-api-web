import React, { FC } from 'react';
import { Col, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';
import { connect, useField } from 'formik';

interface Props {
  type?: InputType;
  label?: string;
  name: string;
  placeholder?: string;
}

const InputRow: FC<Props> = ({ type, name, placeholder, label }) => {
  const labelText = label || name;
  const inputProps = {
    id: `${name}field`,
    name,
    type: type || `text`,
    placeholder,
  };
  const [field, meta] = useField(inputProps);
  const invalid = meta.touched && !!meta.error;

  return (
    <FormGroup row>
      <Label for={inputProps.id} sm={2}>
        {labelText}
      </Label>
      <Col sm={10}>
        <Input {...field} {...inputProps} invalid={invalid} />
        <FormFeedback>{meta.error}</FormFeedback>
      </Col>
    </FormGroup>
  );
};

export default connect(InputRow);
