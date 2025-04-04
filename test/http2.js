const http2 = require('http2');
const socks = require('socks').SocksClient;
const tls = require('tls');
// SOCKS5 代理服务器配置
const socks5Proxy = {
  host: '127.0.0.1', // SOCKS5 代理地址
  port: 8890      // SOCKS5 端口
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
// 目标 HTTP/2 服务器
const targetUrl = new URL('https://www.npmjs.com');

// 通过 SOCKS5 代理连接目标服务器
async function connectThroughSocks5() {
  try {
    console.log(`🔌 通过 SOCKS5 代理连接 ${targetUrl.hostname}`);

    const { socket } = await socks.createConnection({
      proxy: { ipaddress: socks5Proxy.host, port: socks5Proxy.port, type: 5 },
      destination: { host: targetUrl.hostname, port: 443 }, // 目标 HTTPS 服务器
      command: 'connect'
    });

    const secureSocket = tls.connect({
      host: targetUrl.hostname,
      socket: socket, // 使用通过 SOCKS5 建立的 socket
      servername: targetUrl.hostname // 确保正确的 SNI
    });

    console.log(`✅ 已连接 SOCKS5 代理`);

    // 使用 socket 创建 HTTP/2 连接
    const clientSession = http2.connect(targetUrl.origin, {
      createConnection: () => secureSocket // 通过 SOCKS5 隧道创建连接
    });

    clientSession.on('error', (err) => {
      console.error('❌ HTTP/2 连接错误:', err);
    });

    // 发送 HTTP/2 请求
    const proxyReq = clientSession.request({
      ':method': 'GET',
      ':path': '/package/http2-wrapper',
      ':authority': targetUrl.host,
      ':scheme': 'https'
    });


    proxyReq.on('response', (headers) => {
      console.log('📩 收到响应:', headers[':status']);
    });

    // 处理数据流
    proxyReq.setEncoding('utf8');
    proxyReq.on('data', (chunk) => {
      console.log('📜 响应数据:', chunk);
    });

    proxyReq.on('end', () => {
      console.log('✅ 请求完成');
      secureSocket.closed();
    });

    proxyReq.end();

  } catch (err) {
    console.error('❌ SOCKS5 代理错误:', err);
  }
}

// 执行代理请求
connectThroughSocks5();
