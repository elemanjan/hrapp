import validatejs from 'validate.js';
import validation from './validation';

/**
 * @param {string} field - field name of constraints validate.js
 * @param {string | object} values - values for validate field
 * @return {string} return error message if values not correct
 */

export default function validate(field, values) {
  let formValues = {};

  if (typeof values === 'object') {
    for (let [key, value] of Object.entries(values)) {
      formValues[key] = value;
    }
  } else {
    formValues[field] = values;
  }
  let formFields = {};
  formFields[field] = validation[field];

  const result = validatejs(formValues, formFields);

  if (result) {
    return result[field][0];
  }

  return null;
}
