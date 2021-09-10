
var cheerio = require('cheerio');
var got = require('got');
var notifier = require('node-notifier');

function test(){
	let opt = {
		url: 'http://192.168.1.222:81/zentao/my/',
		method:'GET',
		headers:{
			'Cookie':'windowWidth=1680; windowHeight=907; lang=zh-cn; device=desktop; theme=default; keepLogin=on; za=liuxin; preBranch=0; from=doc; lastProduct=29; preProductID=29; zp=7be335951a07a337c94f893933071e2426988c02; qaBugOrder=id_desc; selfClose=1; windowWidth=1680; windowHeight=907; zentaosid=hrk9k7gnku4kmek9hlhek1kg67',
			'Upgrade-Insecure-Requests':1
		},
		responseType: 'buffer'
	};
	let gotResp = got(opt);
	gotResp.then(response=>{
		const buf = Buffer.from(response.body);
		const $ = cheerio.load(buf.toString());
		// res.send($('.col-right').text());
		let str = $('.col-right').text();
		str = str.replace(/\s*/g,"");
		let a = str.split('我的BUG')[1];
		let b = a.split('我的需求')[0];
		if(Number(b)>0){
			notifier.notify({
				title: '新bug',
				message: '你有新的bug待解决'
			});
		} else {
			notifier.notify({
				title: '没有bug',
				message: '开心( •̀ ω •́ )y没有bug'
			});
		}
	}).catch(error=>{
		notifier.notify({
			title: '错误错误',
			message: '请求接口遇到错误'
		});
	})
}

console.log('启动服务成功,20分钟轮询一次');
test();
setInterval(test,1200000);