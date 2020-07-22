import {
  v4 as uuidv4
} from 'uuid';

//这个是工具函数，专门用来生成或获取用户临时id
function getUserTempId() {
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  //如果获取不到，说明用户之前没有生成过临时id
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  // 如果存在就返回原来的，如果不存在就返回新生成的
  return userTempId
}
export {getUserTempId}