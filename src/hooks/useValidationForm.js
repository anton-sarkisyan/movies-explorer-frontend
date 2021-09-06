import { useState, useCallback } from 'react';
import { validate } from 'react-email-validator';

const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const updateValue = (name, value) => setValues((values) => ({ ...values, [name]: value }));

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    let messageErrEmail;

    setValues({ ...values, [name]: value });
    if (name !== 'email') {
      setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      const isValidEmail = validate(value);
      messageErrEmail = value
        ? isValidEmail
          ? ''
          : 'Введён неверный формат почты'
        : 'Вы пропустили это поле';
      setErrors({ ...errors, [name]: messageErrEmail });
    }
    setIsValid(target.closest('form').checkValidity() && !messageErrEmail);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, handleChange, errors, isValid, resetForm, updateValue,
  };
};

export default useFormWithValidation;
