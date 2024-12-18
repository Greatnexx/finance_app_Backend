import { Validator, addCustomMessages } from "node-input-validator";

const formatValidationError = (
  error: { [s: string]: unknown } | ArrayLike<unknown>
) => {
  const formatted = Object.entries(error).map(([key, value]: any) => ({
    field: key,
    message: value.message,
  }));
  // .reduce((accumulator, currentValue) => {
  //   if (!accumulator[currentValue]) {
  //     accumulator[currentValue.field] = currentValue.message;
  //   }
  //   return accumulator;
  // }, {});
  return formatted;
};

export default {
  /**
   * Input Validator middleware for controller
   * @param {object} validationObject object defining body fields and its validation types eg:{email:required|email}
   * @param {object} _extendMessages object defining message to throw on validation error eg: {"email.required":"Email is required","email.email":"Invalid email"}
   *
   */
  validateInput:
    (validationObject: object = {}, _extendMessages: object = {}) =>
    async (
      req: { body: any; validationError: { field: string; message: any }[] },
      res: any,
      next: () => any
    ) => {
      const validation = new Validator(req.body, validationObject);
      addCustomMessages(_extendMessages);

      try {
        const isValid = await validation.check();
        if (!isValid) {
          req.validationError = formatValidationError(validation.errors);
        }
        return next();
      } catch (error: any) {
        req.validationError = error.message;
        return next();
      }
    },

  handleValidationErrorForViews: (
    req: { validationError: any },
    res: { render: (arg0: string, arg1: any) => any },
    viewModel: {
      [x: string]: { [x: string]: unknown };
      error: any;
      validationError: any;
    },
    viewPath = "/",
    fieldsStoreKey: string | number,
    defaultValue = {}
  ) => {
    const validationError = req.validationError;

    if (validationError) {
      // Remembers fields if validation error occurs
      Object.entries(defaultValue).forEach(([key, value]) => {
        viewModel[fieldsStoreKey][key] = value;
      });

      if (typeof validationError === "string") {
        viewModel.error = validationError;
      } else {
        viewModel.validationError = req.validationError;
      }
      return res.render(viewPath, viewModel);
    }
  },

  handleValidationErrorForAPI: (
    req: { validationError: any },
    res: { json: (arg0: { success: boolean; error: any }) => any },
    next: () => void
  ) => {
    const validationError = req.validationError;

    if (validationError) {
      let error;
      if (typeof validationError === "string") {
        error = validationError;
      } else {
        error = req.validationError;
      }
      return res.json({ success: false, error });
    }
    next();
  },

  validateInputMethod: async (
    validationObject = {},
    _extendMessages = {},
    req: { body: any }
  ) => {
    const validation = new Validator(req.body, validationObject);
    addCustomMessages(_extendMessages);

    try {
      const isValid = await validation.check();
      let error;

      if (!isValid) {
        error = formatValidationError(validation.errors);
        return { error: true, message: "Validation Error", validation: error };
      }
      return { error: false };
    } catch (error) {
      return { error: true, message: "Validation Error", validation: error };
    }
  },
  validateObject: async (validationObject = {}, body: any) => {
    const validation = new Validator(body, validationObject);
    // addCustomMessages(_extendMessages);

    try {
      const isValid = await validation.check();
      let error;

      if (!isValid) {
        error = formatValidationError(validation.errors);
        return { error: true, message: "Validation Error", validation: error };
      }
      return { error: false };
    } catch (error) {
      return { error: true, message: "Validation Error", validation: error };
    }
  },
};
