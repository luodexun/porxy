import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import {HttpsProxyAgent} from 'https-proxy-agent';
import {HttpProxyAgent} from 'http-proxy-agent';
import * as http2 from 'http2';
let socks5Axios = axios;
//禁用SSL证书验证
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// const socks5Agent = new SocksProxyAgent('socks5://127.0.0.1:8899');
const socks5Agent = new HttpsProxyAgent('http://127.0.0.1:8890');
const httpAgent = new HttpProxyAgent('http://127.0.0.1:8890');
socks5Axios.defaults.httpsAgent = socks5Agent;
socks5Axios.defaults.httpAgent = socks5Agent;
socks5Axios.defaults.proxy = false;

// socks5Axios.get('https://fire.letmeshow.asia/list').then((res) => {
//   console.log(res.data);
// }).catch((err) => {
//   console.log(err.message);
// });

socks5Axios.post('https://fire.letmeshow.asia/search', {name:'Bs Beverages'}).then((res) => {
  console.log(res.data);
}).catch((err) => {
  console.log(err.message);
});


// socks5Axios.post('http://localhost:3000/kk', {name:'Bs Beverages'}).then((res) => {
//   console.log(res.data);
// }).catch((err) => {
//   console.log(err.message);
// });
// import fs from 'fs';
// import FormData from 'form-data';
// // 读取图片文件
// const imagePath = 'C:\\Users\\JGDT\\Downloads\\swap-right.png'; // 替换为你的图片路径
// const image = fs.createReadStream(imagePath);
// // 创建 FormData 对象
// const formData = new FormData();
// formData.append('file', image,'swap-right.png');
// formData.append('name', 'tom');
//
// // 发送 POST 请求
// socks5Axios.put('https://fire.letmeshow.asia/upload', formData)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// const req = http.request({
//   protocol: 'https:',
//   host: 'https://fire.letmeshow.asia',
//   port: 3000,
//   path: '/list',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// },(res)=>{
//   res.on('data',(chunk)=>{
//     console.log(chunk.toString());
//   });
// });
// req.end();
