import React, { FC } from 'react';
import { Col, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { connect, useField } from 'formik';

interface Props {
  label?: string;
  name: string;
  data: string[];
}

const SelectRow: FC<Props> = ({ name, data, label }) => {
  const labelText = label || name;
  const inputProps = {
    id: `${name}field`,
    name,
    type: `select`,
  };
  const [field, meta] = useField(inputProps);
  const invalid = meta.touched && !!meta.error;

  return (
    <FormGroup row>
      <Label for={inputProps.id} sm={2}>
        {labelText}
      </Label>
      <Col sm={10}>
        <Input {...field} {...inputProps} invalid={invalid}>
          {data.map((datum) => (
            <option key={datum}>{datum}</option>
          ))}
        </Input>
        <FormFeedback>{meta.error}</FormFeedback>
      </Col>
    </FormGroup>
  );
};

export default connect(SelectRow);
