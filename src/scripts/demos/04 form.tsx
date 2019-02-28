/** React + MUI + mobx*/
import * as React from 'react';
import { render, Button, vertical } from './mui';
import { observer } from 'mobx-react';

/** Field */
import { Field } from './field';

/** FieldState */
import { FieldState } from '../../index';
const fieldState = new FieldState('').disableAutoValidation().validators((val) => val !== 'foo' && "I only allow 'foo'");

render(() => <form className={vertical} onSubmit={async (e) => {
  e.preventDefault();
  const res = await fieldState.validate();
  if (res.hasError) {
    fieldState.enableAutoValidation();
    return;
  }
  console.log('Validated Value:', fieldState.$);
}}>
  <Field
    id="first"
    label="foo is the value you are looking for"
    fieldState={fieldState} />
  <br />
  <Button
    type="submit">
    Click me to validate, or press enter in the input field
  </Button>
</form>);
