//模拟接口
import Mock from 'mockjs'
import banner from '@/mock/banner' //json数据被引入后会变为真正的数组，不再是json字符串了
import floor from '@/mock/floor' 
  //json数据被引入后会变为真正的数组，不再是json字符串了
// 第一个参数，是我们模拟接口路径，第二个参数是访问这个接口后返回的数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor})//   /mock不能省，不然会404
//在入口文件中引入，这样一开始就会执行