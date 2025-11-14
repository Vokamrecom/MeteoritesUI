import api from './client';

const sanitizeParams = (params) =>
  Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

export const fetchSummary = async (filters) => {
  const response = await api.get('/meteorites/summary', {
    params: sanitizeParams(filters),
  });
  return response.data;
};

export const fetchFilters = async () => {
  const response = await api.get('/meteorites/filters');
  return response.data;
};

