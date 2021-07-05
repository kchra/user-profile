import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const VALIDATION_MIN_LENGTH = 3;

/** Custom validation messages for rules */
const vCustomRequired = () =>
  helpers.withMessage(() => `This field cannot be empty`, required);

const vCustonMinLength = (min = VALIDATION_MIN_LENGTH) =>
  helpers.withMessage(
    ({ $params }) => `This field must have a min length of ${$params.min}`,
    minLength(min)
  );

const vCustonPhone = () =>
  helpers.withMessage(
    () => `Wrong phone number`,
    helpers.regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/)
  );

/** Validation rules for defined models  */
const validationRules = {
  firstName: {
    required: vCustomRequired(),
    minLength: vCustonMinLength(),
  },
  lastName: {
    required: vCustomRequired(),
    minLength: vCustonMinLength(),
  },
  email: { required: vCustomRequired(), email },
  phone: { required: vCustomRequired(), regex: vCustonPhone() },
};

/** Inicialize of validation */
export const initVuelidate = (models) => useVuelidate(validationRules, models);
