"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_input_validator_1 = require("node-input-validator");
const formatValidationError = (error) => {
    const formatted = Object.entries(error).map(([key, value]) => ({
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
exports.default = {
    /**
     * Input Validator middleware for controller
     * @param {object} validationObject object defining body fields and its validation types eg:{email:required|email}
     * @param {object} _extendMessages object defining message to throw on validation error eg: {"email.required":"Email is required","email.email":"Invalid email"}
     *
     */
    validateInput: (validationObject = {}, _extendMessages = {}) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const validation = new node_input_validator_1.Validator(req.body, validationObject);
        (0, node_input_validator_1.addCustomMessages)(_extendMessages);
        try {
            const isValid = yield validation.check();
            if (!isValid) {
                req.validationError = formatValidationError(validation.errors);
            }
            return next();
        }
        catch (error) {
            req.validationError = error.message;
            return next();
        }
    }),
    handleValidationErrorForViews: (req, res, viewModel, viewPath = "/", fieldsStoreKey, defaultValue = {}) => {
        const validationError = req.validationError;
        if (validationError) {
            // Remembers fields if validation error occurs
            Object.entries(defaultValue).forEach(([key, value]) => {
                viewModel[fieldsStoreKey][key] = value;
            });
            if (typeof validationError === "string") {
                viewModel.error = validationError;
            }
            else {
                viewModel.validationError = req.validationError;
            }
            return res.render(viewPath, viewModel);
        }
    },
    handleValidationErrorForAPI: (req, res, next) => {
        const validationError = req.validationError;
        if (validationError) {
            let error;
            if (typeof validationError === "string") {
                error = validationError;
            }
            else {
                error = req.validationError;
            }
            return res.json({ success: false, error });
        }
        next();
    },
    validateInputMethod: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (validationObject = {}, _extendMessages = {}, req) {
        const validation = new node_input_validator_1.Validator(req.body, validationObject);
        (0, node_input_validator_1.addCustomMessages)(_extendMessages);
        try {
            const isValid = yield validation.check();
            let error;
            if (!isValid) {
                error = formatValidationError(validation.errors);
                return { error: true, message: "Validation Error", validation: error };
            }
            return { error: false };
        }
        catch (error) {
            return { error: true, message: "Validation Error", validation: error };
        }
    }),
    validateObject: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (validationObject = {}, body) {
        const validation = new node_input_validator_1.Validator(body, validationObject);
        // addCustomMessages(_extendMessages);
        try {
            const isValid = yield validation.check();
            let error;
            if (!isValid) {
                error = formatValidationError(validation.errors);
                return { error: true, message: "Validation Error", validation: error };
            }
            return { error: false };
        }
        catch (error) {
            return { error: true, message: "Validation Error", validation: error };
        }
    }),
};
//# sourceMappingURL=validationService.js.map