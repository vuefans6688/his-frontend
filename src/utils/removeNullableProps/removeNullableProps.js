import NullJudge from './nullJudge';

const removeNullableProps = (obj) => {
  if (typeof obj !== 'object') {
    throw new Error('Required an Object');
  }

  const copyObj = JSON.parse(JSON.stringify(obj));
  const entries = Object.entries(copyObj);

  entries.forEach(([name, value]) => {
    if (NullJudge(value)) {
      delete copyObj[name];
    }
  });
  return copyObj;
};

export default removeNullableProps;
