export function isNameOrIDRegist(sourceArr, index, key, value) {
  // 添加项目时需检测id或者名称是否唯一
  // sourceArr: 已经添加的所有条目
  // index： 当前条目index，用于判断编辑或是新增
  // key: 当前检测的key（id 或 name）
  // value: 当前需检测的值
  if (!sourceArr || !value) {
    return false;
  }
  let arr = sourceArr;
  if (index !== -1) {  // 如果是编辑，将检测除当前id以外的id是否与重复当前id重复
    arr = arr.filter((item) => {
      return item[key] !== sourceArr[index][key];
    });
  }
  const isRegist = arr.findIndex((item) => {
    return item[key] === value;
  });
  return isRegist > -1;
}

export default {};
