export const booleanTransform = value => {
  const temp = !value ? [] : typeof value === 'string' ? [value] : value;
  const result = temp.map(e => {
    if (e === 'true' || e === true) return true;
    else if (e === 'false' || e === false) return false;
    else return null;
  });
  return result;
};
