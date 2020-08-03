import * as yup from "yup";

export const PROPERTY_SCHEMA = yup.object().shape({
  title: yup.string().max(44, 'The title is too long!').required('The title is required!'),
  mobileNumber: yup.string().required('Required!'),
  availableTo: yup.string().required('Required!'),
  city: yup.string().required('The city is required!'),
  location: yup.string().required('The location is required!'),
  description: yup.string().max(700, 'The description is too long!').required('The location field is required!'),
});