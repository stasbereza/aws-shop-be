export const transformDataIntoProductsArray = (data) => {
  return data.filter(obj => obj['_0'] !== 'id').map(product => {
    return {
      id: product['_0'],
      title: product['_1'],
      description: product['_2'],
      price: product['_3'],
    };
  });
};