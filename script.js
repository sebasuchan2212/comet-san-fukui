const navToggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.global-nav');
if(navToggle){navToggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');navToggle.setAttribute('aria-expanded',open?'true':'false');});}
document.querySelectorAll('.global-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('is-open')));
document.getElementById('year').textContent=new Date().getFullYear();

const calc=document.getElementById('calculator');
const totalEl=document.getElementById('total');
function yen(n){return new Intl.NumberFormat('ja-JP').format(n)+'円';}
function updateTotal(){
  let total=0;
  calc.querySelectorAll('input[type="checkbox"]:checked').forEach(i=>total+=Number(i.value));
  totalEl.textContent=yen(total);
}
if(calc){calc.addEventListener('change',updateTotal);}

const msgField=document.querySelector('textarea[name="message"]');
document.getElementById('copyEstimate')?.addEventListener('click',()=>{
  const selected=[...calc.querySelectorAll('input[type="checkbox"]:checked')].map(i=>`・${i.dataset.name}（${yen(Number(i.value))}）`);
  const total=totalEl.textContent;
  const text=selected.length?`【料金シミュレーター選択内容】\n${selected.join('\n')}\n概算合計：${total}\n\n`:'【料金シミュレーター】未選択\n\n';
  msgField.value=text+(msgField.value||'');
  location.hash='contact';
});

const areaBtn=document.getElementById('areaBtn');
areaBtn?.addEventListener('click',()=>{
  const city=document.getElementById('city').value.trim();
  const res=document.getElementById('areaResult');
  const ok=['福井市','坂井市','鯖江市','越前市','永平寺町','あわら市'];
  if(!city){res.textContent='市町名を入力してください。';return;}
  res.textContent=ok.some(x=>city.includes(x.replace('市','').replace('町',''))||city.includes(x))
    ? `${city}は対応エリアの可能性が高いです。お気軽にご相談ください。`
    : `${city}も内容により対応相談可能です。まずはお問い合わせください。`;
});

const form=document.getElementById('contactForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const body=`comet san 福井 お問い合わせ\n\nお名前：${data.get('name')}\nメール：${data.get('email')}\n電話：${data.get('tel')||'未入力'}\n希望サービス：${data.get('service')}\n住所・エリア：${data.get('address')||'未入力'}\n\n相談内容：\n${data.get('message')||'未入力'}\n`;
  const subject=encodeURIComponent('【comet san 福井】無料見積り・お問い合わせ');
  const mailBody=encodeURIComponent(body);
  // 公開前に送信先メールアドレスを変更してください。
  const to='sebasuchan0402@gmail.com';
  window.location.href=`mailto:${to}?subject=${subject}&body=${mailBody}`;
});
