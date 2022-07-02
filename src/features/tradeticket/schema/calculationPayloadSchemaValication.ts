import * as yup from 'yup';

export const calculationPayloadSchemaValidation = yup.object().shape({
  quantity: yup.number().required(),
  startCash: yup.number().required(),
  haircut: yup.number().required(),
  duration: yup.number().required().moreThan(0),
  cleanPrice: yup.number().required(),
  isin: yup.string().required(),
  repoRate: yup.number().required(),
  repoYearBasis: yup.number().required(),
  transactionType: yup.string().required(),
  fixed: yup.boolean().required(),
  repoRateType: yup.string().required(),
});
