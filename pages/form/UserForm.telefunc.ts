export const onSubmit = async (data: any) => {
  console.log('Form Submitted', data);
  return data.firstName === 'Test' ? { firstName: 'Test is not allowed' } : undefined;
};
