import { NextFunction,Response,Request } from 'express';
import { validationResult, body } from 'express-validator';

const handleValidationErrors = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);  // check validation errors from the request
    if (!errors.isEmpty()) {  // If there are errors return 422 response
       res.status(422).json({ errors: errors.array()});
       return;// Returns errors as a JSON response
    }
    next();  // If no errors, proceed to the next middleware or controller
  };
  



export const validateRegister = [
  body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
  handleValidationErrors,
];

export const validateBudget= [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('title must be a string'),
    body('total_amount').notEmpty().withMessage('Total amount is required').isNumeric().withMessage('total amount must be a number'),
    body('duration').notEmpty().withMessage('Duration is required').isString().withMessage('duration must be a string'),
    handleValidationErrors,
]


export const validateTransaction =[
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number'),
    body('category').notEmpty().withMessage('Category is required').isString().withMessage('Category must be a string'),
    body('narration').notEmpty().withMessage('Narration is required').isString().withMessage('Narration must be a string'),
    body('budget_id').notEmpty().withMessage('Budget id is required').isString().withMessage('Budget id must be a string'),
    body('type').notEmpty().withMessage('Type is required').isString().withMessage('Type must be a string'),
    handleValidationErrors,
]