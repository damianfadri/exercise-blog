import { useState } from 'react';
import utils from 'utils';

const useValidator = (defaultValue, validatorFunc) => {
  const [ value, setValue ] = useState(defaultValue);
  const [ error, setError ] = useState('');
  const [ isDirty, setDirty ] = useState(
      !utils.isNullOrWhiteSpace(defaultValue));

  const beforeSetValue = (v) => {
    setDirty(true);
    setError(validatorFunc(v));
    setValue(v);
  };

  return [ value, beforeSetValue, isDirty, error ];
};

export default useValidator;