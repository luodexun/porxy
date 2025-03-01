import WebSocket from 'ws';
import {SocksProxyAgent} from 'socks-proxy-agent';

function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}
//禁用SSL证书验证
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const agent  = new SocksProxyAgent('socks5://127.0.0.1:8890');
const client = new WebSocket('wss://fire.letmeshow.xyz/ws',{agent});

client.on('error', console.error);
client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', function clear() {
  clearTimeout(this.pingTimeout);
});
client.on('message', function (data) {
  // eslint-disable-next-line no-console
  console.log(data);
});

setInterval(function (){
  client.send('CLICK');
},3000);
