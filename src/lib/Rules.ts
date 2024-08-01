import { FieldRule } from "./Forms";
import isEmail from "validator/lib/isEmail";
import { fieldage, fieldNumber } from "./regularexpression";


export const required: FieldRule<any> = {
    errorMessage: "This field is required",
    rule: (input) => Boolean(input),
  };


export const mail: FieldRule<string> = {
    errorMessage: "Email address format should be like “email@domain.com”",
    rule: (input) => isEmail(input),
  };


export const age: FieldRule<string> = {
    errorMessage: "Number shhould be positive",
    rule: (input) => fieldNumber.test(input),
  };

export const grade: FieldRule<string> = {
    errorMessage: "Grade should be 1,2,3",
    rule: (input) => fieldage.test(input),
  };