import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

let socks5Axios = axios;
//禁用SSL证书验证
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const socks5Agent = new SocksProxyAgent('socks5://127.0.0.1:8890');
socks5Axios.defaults.httpsAgent = socks5Agent;
socks5Axios.defaults.proxy = false;

socks5Axios.get('https://fire.letmeshow.xyz/list').then((res) => {
  console.log(res.data);
}).catch((err) => {
  console.log(err.message);
});
