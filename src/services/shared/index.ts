import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://tradeplart-backend.herokuapp.com/',
});
