import * as Yup from "yup";

export const productPostSchema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().required(),
  image: Yup.string().required(),
});

export const productUpdateSchema = Yup.object({
  name: Yup.string(),
  price: Yup.number(),
  image: Yup.string(),
});
