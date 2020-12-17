// 判断值是否为空 包含 null,undefined, ''等
const nullJudge = (value) => {
  const NullAble = Boolean(value);
  return !NullAble;
};

export default nullJudge;
