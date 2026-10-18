// CampusBite main logic: menu, orders, owner panel, QR pickup, wallet, Judge Mode
var TEAM=["Rajveer Vishwakarma","Sameer","Naif","Shivam","Vikas Vishwakarma"];
var LANG="hi";function L(h,e){return LANG=="en"?e:h}
var T={"Line chhodo,":"Skip the line,","khana pakdo.":"grab your food.","Canteen ki line me khade mat raho. Phone se order karo, time pe pickup karo ya class tak delivery pao.":"No more canteen queues. Order on your phone, pick up on time or get it delivered to class.","Try Demo Order":"Try Demo Order","Problem":"Problem","College canteen me har student ko ye dikkat hoti hai:":"Every student faces these canteen problems:","Lambi line":"Long queues","Break sirf 20 min ka, aadha time line me nikal jata hai.":"Break is only 20 minutes and half goes in the line.","Menu pata nahi":"Menu unknown","Aaj kya available hai, rate kya hai, pehle se kuch pata nahi.":"No idea what is available or the rates beforehand.","Cash ki dikkat":"Cash trouble","Chhutte paise aur hisaab me galti.":"Change shortage and billing mistakes.","Food waste":"Food waste","Canteen ko demand ka andaza nahi hota.":"Canteen cannot predict demand.","Solution":"Solution","CampusBite ek simple pre-order platform hai.":"CampusBite is a simple pre-order platform.","Menu dekho":"See the menu","Live menu aur rate mobile par.":"Live menu and rates on mobile.","Order + UPI payment":"Order + UPI payment","Pehle se order karo, cash ki zaroorat nahi.":"Order ahead, no cash needed.","Pickup ya delivery":"Pickup or delivery","Token number ke saath ready food uthao.":"Collect ready food with your token number.","Live Demo":"Live Demo","Menu chuno, quantity badlo, order karo.":"Pick items, change quantity, place order.","Place Order":"Place Order","Aapka Token":"Your Token","Business Model Canvas":"Business Model Canvas","Poora model ek nazar me.":"The whole model at a glance.","College students, staff":"College students, staff","Line, time waste, cash issue":"Queue, wasted time, cash issues","Pre-order app + token pickup":"Pre-order app + token pickup","5% commission, delivery fee ₹10, ads":"5% commission, ₹10 delivery fee, ads","Website, delivery boy, marketing":"Website, delivery staff, marketing","Canteen, local shops, college":"Canteen, local shops, college","QR posters, Instagram, referral":"QR posters, Instagram, referrals","Team, server, UPI gateway":"Team, server, UPI gateway","Menu update, order handling":"Menu updates, order handling","Market & Break-even Calculator":"Market & Break-even Calculator","Slider hilao, numbers khud badlenge.":"Move the sliders, numbers update live.","Kitne % app use karenge":"% who will use the app","Monthly kharcha (₹)":"Monthly cost (₹)","Daily orders":"Daily orders","Monthly revenue":"Monthly revenue","Monthly profit":"Monthly profit","Break-even orders/day":"Break-even orders/day","Profit Projection":"Profit Projection","5 mahine ka estimate (calculator se judta hai).":"5-month estimate (linked to the calculator).","Kharcha":"Cost","Hamari Team":"Our Team","Aap Use Karoge?":"Would you use it?","Apna feedback do.":"Share your feedback.","👍 Haan":"👍 Yes","🤔 Shayad":"🤔 Maybe","👎 Nahi":"👎 No","Scan & Share":"Scan & Share","Is page ko doston ke saath share karein.":"Share this page with friends.","Scan karke ye website kholein":"Scan to open this website"};
function setLang(l){LANG=l;lg.textContent=l=="en"?"हिं":"EN";
 document.querySelectorAll("[data-en]").forEach(function(e){if(e.__h==null)e.__h=e.innerHTML;e.innerHTML=l=="en"?e.dataset.en:e.__h});
 var w=document.createTreeWalker(document.body,4),n;
 while(n=w.nextNode()){if(n.parentNode.closest("script,[data-en]"))continue;
  if(l=="en"){var k=(n.__o!=null?n.__o:n.nodeValue).trim();if(T[k]!=null){if(n.__o==null)n.__o=n.nodeValue;n.nodeValue=n.__o.replace(k,T[k])}}
  else if(n.__o!=null){n.nodeValue=n.__o;n.__o=null}}
 sq.placeholder=L("Menu search karein...","Search menu...");draw();calc();renderOwner();renderCans()}
var items=[["Samosa (2 pc)",20,"🥟","s"],["Veg Sandwich",35,"🥪","s"],["Maggi",30,"🍜","s"],["Chai",10,"☕","d"],["Cold Coffee",40,"🥤","d"],["Lassi",25,"🥛","d"],["Paratha + Curd",45,"🫓","m"],["Veg Thali",70,"🍛","m"],["Poha",20,"🍲","s"],["Fresh Juice",30,"🧃","d"],["Gulab Jamun",20,"🍮","x"],["Ice Cream",25,"🍨","x"],["Brownie",40,"🍫","x"]];
var q=items.map(function(){return 0}),cat="all",mode="pickup";
var m=document.getElementById("menu");
function draw(){
 var t=sq.value.toLowerCase(),h="";
 items.forEach(function(it,i){if((cat=="all"||it[3]==cat)&&it[0].toLowerCase().indexOf(t)>-1)h+='<div class="item"><div>'+it[2]+' <b style="display:inline">'+it[0]+'</b><small> ₹'+it[1]+'</small></div><div class="qty"><button onclick="ch('+i+',-1)">−</button><span>'+q[i]+'</span><button onclick="ch('+i+',1)">+</button></div></div>'});
 m.innerHTML=h||'<small>'+L("Kuch nahi mila","Nothing found")+'</small>';
 var s=0;q.forEach(function(n,i){s+=n*items[i][1]});
 var d=mode=="delivery"&&s&&!(PASS&&PASS.fd)?10:0;
 var dc=cpn&&s?Math.min(10,s):0,pd=Math.max(PASS&&s?Math.round(s*PASS.d/100):0,hhOn()&&s&&DAY!="Tomorrow"?Math.round(s*.2):0),ec=eco.checked&&s?Math.min(2,s):0,tt=s+d-dc-pd-ec;sub.textContent="₹"+s;dl.textContent="₹"+d;ds.textContent="-₹"+(dc+pd+ec);tot.textContent="₹"+tt;spa.textContent="₹"+Math.ceil(tt/SPN);spl.style.display=SPN>1?"flex":"none";spw.style.display=SPN>1?"inline-block":"none";
}
function ch(i,d){q[i]=Math.max(0,q[i]+d);draw()}
sq.oninput=draw;
document.querySelectorAll("#cats button").forEach(function(b){b.onclick=function(){cat=b.dataset.c;document.querySelectorAll("#cats button").forEach(function(x){x.className=x==b?"on":""});draw()}});
document.querySelectorAll(".seg button").forEach(function(b){b.onclick=function(){mode=b.dataset.m;document.querySelectorAll(".seg button").forEach(function(x){x.className=x==b?"on":""});draw()}});
var cpn=false,P=0;try{P=+localStorage.getItem("cb_pts")||0}catch(e){}
function ld(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var ords=ld("cb_orders",[]),cans=ld("cb_cans",[]),mine=ld("cb_mine",[]);var RT="",TAGS=["Tasty","Fast","Good value"],prevS=null,SPN=1,PASS=ld("cb_pass",null),WAL=ld("cb_wal",0),ECO=ld("cb_eco",0),HF=false,DAY="Today";var SP=[[85,62],[255,58],[170,150],[62,150],[280,150]];
var ST=[["New","#ff7a1a"],["Preparing","#2a55b8"],["Ready","#16895a"],["Picked up","#6b7280"]],STh=["Naya","Ban raha","Ready","Pickup ho gaya"],NB=[["Accept","Accept karein"],["Mark Ready","Ready karein"],["Handover","Pickup diya"]];
function bdg(o){return '<span class="bd" style="background:'+ST[o.s][1]+'">'+L(STh[o.s],ST[o.s][0])+'</span>'}
function adv(k){ords.forEach(function(o){if(o.k==k&&o.s<3){if(window.CLOUD)CLOUD.setStatus(k,o.s+1);else o.s++}});if(!window.CLOUD)sv("cb_orders",ords);renderOwner()}
function renderOwner(){
 var pend=ords.filter(function(o){return o.s<3}),tt=ords.reduce(function(a,o){return a+o.t},0);
 ol.innerHTML=ords.slice().reverse().map(function(o){return '<div class="or"><span>'+(o.pr?"⚡ ":"")+o.id+' · '+esc(o.c)+' · ₹'+o.t+'<br><small>'+esc(o.i)+'<br>'+esc((o.dy=="Tomorrow"?"📅 Kal · ":"")+(o.pay||"UPI")+" · "+(o.sl||"ASAP")+(o.sp>1?" · 👥"+o.sp:""))+'</small></span><span style="text-align:right">'+bdg(o)+(o.s==2?'<br><small>🔐 '+L("Code se verify karein","Verify by code")+'</small>':'')+(o.s<2?'<br><button class="nb" style="margin:6px 0 0" onclick="adv('+o.k+')">'+L(NB[o.s][1],NB[o.s][0])+'</button>':'')+'</span></div>'}).join("")||'<small>'+L("Abhi koi order nahi","No orders yet")+'</small>';
 ko.textContent=pend.length;cnt(hk1,ords.length);nbd.textContent=pend.length;nbd.style.display=pend.length?"block":"none";extras();kr.textContent="₹"+tt;kc.textContent="₹"+Math.round(tt*(+r4.value)/100);
 var my=window.CLOUD?ords.filter(function(o){return mine.indexOf(o.k)>-1}):ords;
 mol.innerHTML=my.slice().reverse().slice(0,6).map(mrow).join("")||'<small>'+L("Abhi koi order nahi","No orders yet")+'</small>';
 var l=my[my.length-1];
 if(!l){trk.style.display="none";return}
 trk.style.display="block";tkn.textContent=l.id;pg.style.width=[10,55,100,100][l.s]+"%";
 var g="font-weight:700;color:#16895a";s1.style.cssText=g;s2.style.cssText=l.s>=1?g:"";s3.style.cssText=l.s>=2?g:"";
 s3.textContent=l.s==2?L("Ready ✅ Counter pe aayein","Ready ✅ Collect at counter"):l.s==3?L("Pickup ho gaya 🎉","Picked up 🎉"):"Ready";
 if(l.s==2&&l.v){pq.style.display="block";if(pq.__k!=l.k){pq.__k=l.k;pqr.innerHTML="";try{new QRCode(pqr,{text:"CB-"+l.id+"-"+l.v,width:120,height:120})}catch(e){}pcd.textContent=l.v}}else pq.style.display="none"}
function fillCs(){var v=cs.value;cs.innerHTML=[{n:"College Main Canteen"}].concat(cans).map(function(c){return '<option>'+esc(c.n)+'</option>'}).join("");if(v)cs.value=v}
function renderCans(){cnt(hk2,cans.length+1);renderMap();pcl.innerHTML='<div class="pc"><span>🏪</span><div><b>College Main Canteen</b><br><small>'+L("Demo partner","Demo partner")+avgR("College Main Canteen")+'<br>'+crowdTxt("College Main Canteen")+'</small></div></div>'+cans.map(function(c){return '<div class="pc"><span>🏪</span><div><b>'+esc(c.n)+'</b><br><small>'+esc(c.o)+' · '+esc(c.c)+' · ●●●●●●'+esc(c.p)+avgR(c.n)+'<br>'+crowdTxt(c.n)+'</small></div></div>'}).join("")}
var tm=[];
go.onclick=function(){
 var t=q.reduce(function(a,n,i){return a+n*items[i][1]},0);
 if(!t){msg.textContent=L("Pehle koi item select karein","Please select an item first");return}
 var fin=parseInt(tot.textContent.replace(/\D/g,""))||t,its=[];
 if(PAYM=="Wallet"){if(WAL<fin){msg.textContent=L("Wallet me paise kam hain, +₹100 karein","Not enough wallet balance, add ₹100");return}WAL-=fin}
 q.forEach(function(n,i){if(n)its.push(n+"× "+items[i][0])});
 var nk=Date.now();var od={k:nk,id:"#"+(100+Math.floor(Math.random()*900)),t:fin,i:its.join(", "),c:cs.value,pay:PAYM,sl:slot.value,sp:SPN,pr:PASS&&PASS.pr?1:0,e:eco.checked?1:0,dy:DAY,v:1000+Math.floor(Math.random()*9000),s:0};mine.push(od.k);sv("cb_mine",mine);
 if(window.CLOUD)CLOUD.addOrder(od);else{ords.push(od);sv("cb_orders",ords)}
 var cb=Math.floor(fin*.05);WAL+=cb;sv("cb_wal",WAL);wbal.textContent="₹"+WAL;msg.textContent=L("✅ Order place ho gaya! Neeche status follow ho raha hai.","✅ Order placed! Status is tracked below.")+" 🎁 +₹"+cb+" cashback";
 P+=Math.floor(fin/10);pts.textContent=P;try{localStorage.setItem("cb_pts",P)}catch(e){}
 if(DAY!="Tomorrow")autoAdv(nk);setDay("Today");if(eco.checked){ECO++;sv("cb_eco",ECO);ecn.textContent=ECO}eco.checked=false;SPN=1;spn.textContent=1;cpn=false;cin.value="";cmsg.textContent="";q=q.map(function(){return 0});draw();renderOwner();
};
cadd.onclick=function(){var n=cn.value.trim(),ow=co.value.trim(),ph=cph.value.replace(/\D/g,"");
 if(!n||!ow||ph.length!=10){cmsg2.style.color="#d9363e";cmsg2.textContent=L("Canteen ka naam, owner aur 10 digit mobile bharein","Enter canteen name, owner and a 10-digit mobile");return}
 var cd={n:n,o:ow,p:ph.slice(-4),c:ccl.value.trim(),k:Date.now()};if(window.CLOUD)CLOUD.addCanteen(cd);else{cans.push(cd);sv("cb_cans",cans)}cn.value=co.value=cph.value="";
 cmsg2.style.color="";cmsg2.textContent=L("✅ Canteen add ho gayi! Demo me ab select kar sakte hain.","✅ Canteen added! You can now pick it in the demo.");fillCs();renderCans()};
function inr(n){return "₹"+Math.round(n).toLocaleString("en-IN")}
var ramp=[.3,.5,.7,.9,1];
function calc(){
 var st=+r1.value,ad=+r2.value,av=+r3.value,cm=+r4.value,fx=+r5.value;
 v1.textContent=st;v2.textContent=ad+"%";v3.textContent="₹"+av;v4.textContent=cm+"%";v5.textContent=inr(fx);
 var od=st*ad/100,rpo=av*cm/100+3,rev=od*25*rpo,pf=rev-fx;
 o1.textContent=Math.round(od);o2.textContent=inr(rev);
 o3.textContent=(pf<0?"-":"")+inr(Math.abs(pf));o3.className=pf>=0?"pos":"neg";
 o4.textContent=Math.ceil(fx/(25*rpo));hs.textContent=Math.round(od*25*12/60).toLocaleString("en-IN");hp.textContent=Math.round(od*25).toLocaleString("en-IN");
 var mx=Math.max(rev,fx)*1.15,b=document.getElementById("bars");
 b.innerHTML=ramp.map(function(r){return '<div style="flex:1;display:flex;align-items:flex-end;gap:4px;height:100%"><div class="bar" style="background:#16895a;height:'+(rev*r/mx*100)+'%"></div><div class="bar" style="background:#ff7a1a;height:'+(fx/mx*100)+'%"></div></div>'}).join("");
}
["r1","r2","r3","r4","r5"].forEach(function(id){document.getElementById(id).oninput=calc});
calc();
document.getElementById("team").innerHTML=TEAM.map(function(n){return '<div class="card"><div class="av">'+n.charAt(0)+'</div><h3 style="font-size:.85rem">'+n+'</h3></div>'}).join("");
var vb=document.querySelectorAll("#vote button");
function mark(v){vb.forEach(function(x){x.className=x.dataset.v==v?"on":""});document.getElementById("vmsg").textContent=L("Shukriya! Aapka jawab: ","Thanks! Your answer: ")+v}
try{var vv=localStorage.getItem("cb_vote");if(vv)mark(vv)}catch(e){}
vb.forEach(function(x){x.onclick=function(){mark(x.dataset.v);try{localStorage.setItem("cb_vote",x.dataset.v)}catch(e){}}});
try{new QRCode(document.getElementById("qr"),{text:location.href,width:180,height:180})}catch(e){document.getElementById("qr").textContent=location.href}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("in")})},{threshold:.1});
document.querySelectorAll("section").forEach(function(e){e.classList.add("rv");io.observe(e)});

cap.onclick=function(){if(cin.value.trim().toUpperCase()=="FIRST10"){cpn=true;cmsg.textContent=L("🎉 Coupon lag gaya: ₹10 off","🎉 Coupon applied: ₹10 off")}else{cpn=false;cmsg.textContent=L("Galat coupon (FIRST10 try karein)","Invalid coupon (try FIRST10)")}draw()};
pts.textContent=P;fillCs();renderCans();renderOwner();
wa.onclick=function(){var u=location.href,x="CampusBite - Udaan 2026 \n"+u;if(navigator.share){navigator.share({title:"CampusBite",url:u}).catch(function(){})}else window.open("https://wa.me/?text="+encodeURIComponent(x),"_blank")};
var PIN="1234";
unl.onclick=function(){if(pin.value==PIN){lock.style.display="none";ownbox.style.display="block";pin.value="";lm.textContent=""}else{lm.textContent=L("Galat PIN","Wrong PIN")}};
pin.onkeydown=function(e){if(e.key=="Enter")unl.onclick()};
lockb.onclick=function(){ownbox.style.display="none";lock.style.display="block"};
cs.onchange=renderMap;

bg.oninput=function(){bv.textContent=bg.value};
document.querySelectorAll("#moods button").forEach(function(b){b.onclick=function(){MD=MD==b.dataset.md?"":b.dataset.md;document.querySelectorAll("#moods button").forEach(function(x){x.className=x.dataset.md==MD?"on":""})}});
sgb.onclick=suggest;
spm.onclick=function(){SPN=Math.max(1,SPN-1);spn.textContent=SPN;draw()};
spp.onclick=function(){SPN=Math.min(8,SPN+1);spn.textContent=SPN;draw()};
spw.onclick=function(){var tt=parseInt(tot.textContent.replace(/\D/g,""))||0,x="CampusBite group order: total Rs "+tt+", "+SPN+" people, Rs "+Math.ceil(tt/SPN)+" each.";if(navigator.share){navigator.share({title:"CampusBite",text:x}).catch(function(){})}else window.open("https://wa.me/?text="+encodeURIComponent(x),"_blank")};
document.querySelectorAll("[data-pl]").forEach(function(b){b.onclick=function(){var p=PLANS[+b.dataset.pl];PASS=PASS&&PASS.n==p.n?null:p;sv("cb_pass",PASS);passMsg();draw()}});
passMsg();

vadd.onclick=doVoice;vin.onkeydown=function(e){if(e.key=="Enter")doVoice()};
vmic.onclick=function(){var R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R){vmg2.style.color="#d9363e";vmg2.textContent=L("Is browser me mic nahi chalta, likhkar Add dabayein","Mic not supported here, type and press Add");return}
 var r=new R();r.lang=LANG=="en"?"en-IN":"hi-IN";
 r.onresult=function(e){vin.value=e.results[0][0].transcript;doVoice()};
 r.onerror=function(){vmg2.style.color="#d9363e";vmg2.textContent=L("Mic allow nahi hua, likhkar try karein","Mic blocked, please type instead")};
 r.onstart=function(){vmic.textContent="🔴"};r.onend=function(){vmic.textContent="🎤"};
 try{r.start()}catch(e){}};
hhb.onclick=function(){HF=!HF;hhTick();draw()};
wadd.onclick=function(){WAL+=100;sv("cb_wal",WAL);wbal.textContent="₹"+WAL};
eco.onchange=draw;wbal.textContent="₹"+WAL;ecn.textContent=ECO;
vbtn.onclick=function(){var c=vcode.value.replace(/\D/g,"").slice(-4),f=ords.filter(function(o){return o.s==2&&String(o.v)==c})[0];
 if(f){if(window.CLOUD)CLOUD.setStatus(f.k,3);else{f.s=3;sv("cb_orders",ords)}vres.style.color="";vres.textContent=L("✅ "+f.id+" verify hua, handover ho gaya","✅ "+f.id+" verified, handed over");vcode.value="";renderOwner()}
 else{vres.style.color="#d9363e";vres.textContent=L("❌ Code galat ya order Ready nahi","❌ Wrong code or order not ready")}};
hhTick();

jm.onclick=tour;tstop.onclick=function(){TID++;tbar.style.display="none"};
document.querySelectorAll(".seg3 button").forEach(function(b){b.onclick=function(){setDay(b.dataset.dy)}});
REF=ld("cb_ref","");RUSED=ld("cb_rused",false);if(!REF){REF="CB"+(1000+Math.floor(Math.random()*9000));sv("cb_ref",REF)}rcode.textContent=REF;
rshare.onclick=function(){var x="Join CampusBite with my code "+REF+" and skip the canteen queue! "+location.href;if(navigator.share){navigator.share({title:"CampusBite",text:x}).catch(function(){})}else window.open("https://wa.me/?text="+encodeURIComponent(x),"_blank")};
rapply.onclick=function(){var v=rin.value.trim().toUpperCase();rmsg.style.color="#d9363e";
 if(v==REF)rmsg.textContent=L("Apna code khud use nahi kar sakte","You can't use your own code");
 else if(RUSED)rmsg.textContent=L("Referral code pehle hi use ho chuka hai","A referral code was already used");
 else if(/^CB\d{4}$/.test(v)){WAL+=50;RUSED=true;sv("cb_rused",true);sv("cb_wal",WAL);wbal.textContent="₹"+WAL;rin.value="";rmsg.style.color="";rmsg.textContent=L("🎉 ₹50 wallet me add ho gaye!","🎉 ₹50 added to your wallet!")}
 else rmsg.textContent=L("Code galat hai (jaise CB1234)","Invalid code (like CB1234)")};
var DP=null;addEventListener("beforeinstallprompt",function(e){e.preventDefault();DP=e;inst.style.display="inline-block"});
inst.onclick=function(){if(DP){DP.prompt();DP=null;inst.style.display="none"}};

draw();
lg.onclick=function(){setLang(LANG=="hi"?"en":"hi")};
var AC=[["#ff3d9a","#22d3ee"],["#a3e635","#22d3ee"],["#fbbf24","#f472b6"],["#a78bfa","#34d399"]],ai=0;
th.onclick=function(){ai=(ai+1)%AC.length;var r=document.documentElement.style;r.setProperty("--brand",AC[ai][0]);r.setProperty("--navy",AC[ai][1])};
var PAYM="UPI";
document.querySelectorAll(".seg2 button").forEach(function(b){b.onclick=function(){PAYM=b.dataset.p;document.querySelectorAll(".seg2 button").forEach(function(x){x.className=x==b?"on":""})}});
function mrow(o){var r='<div class="or" style="flex-wrap:wrap"><span>'+(o.dy=="Tomorrow"?"📅 ":"")+o.id+' · '+esc(o.c)+' · ₹'+o.t+'</span><span>'+bdg(o)+'<button class="nb" onclick="receipt('+o.k+')">🧾</button></span>';
 if(o.s==3){if(o.r)r+='<div style="width:100%;color:#fbbf24;margin-top:4px">'+"★".repeat(o.r)+"☆".repeat(5-o.r)+(o.rt?' · '+esc(o.rt):'')+'</div>';
 else r+='<div style="width:100%;margin-top:6px"><div class="chips" style="margin:0 0 6px">'+TAGS.map(function(t,i){return '<button class="'+(RT==t?'on':'')+'" onclick="setRT('+i+')">'+t+'</button>'}).join("")+'</div><div style="font-size:1.6rem">'+[1,2,3,4,5].map(function(n){return '<span style="cursor:pointer" onclick="rate('+o.k+','+n+')">☆</span>'}).join(" ")+'</div></div>'}
 return r+'</div>'}
function setRT(i){RT=RT==TAGS[i]?"":TAGS[i];renderOwner()}
function rate(k,n){ords.forEach(function(o){if(o.k==k){o.r=n;o.rt=RT}});if(window.CLOUD)CLOUD.update(k,{r:n,rt:RT});else sv("cb_orders",ords);RT="";renderOwner();renderCans()}
function avgR(nm){var a=ords.filter(function(o){return o.c==nm&&o.r});if(!a.length)return "";return ' · ⭐ '+(a.reduce(function(x,o){return x+o.r},0)/a.length).toFixed(1)+' ('+a.length+')'}
function renderRv(){var a=ords.filter(function(o){return o.r}).slice(-5).reverse();rvl.innerHTML=a.map(function(o){return '<div class="pc"><span style="color:#fbbf24">'+"★".repeat(o.r)+'</span><div><b>'+esc(o.c)+'</b><br><small>'+esc(o.rt||"")+' · '+o.id+'</small></div></div>'}).join("")||'<small>'+L("Abhi koi review nahi","No reviews yet")+'</small>'}
function renderAn(){var h={},it={},tt=0,rs=[],dv=0;
 ords.forEach(function(o){var hr=new Date(o.k).getHours();h[hr]=(h[hr]||0)+1;tt+=o.t;if(o.s==3)dv++;if(o.r)rs.push(o.r);
  String(o.i).split(", ").forEach(function(x){var m=x.match(/^(\d+)× (.+)$/);if(m)it[m[2]]=(it[m[2]]||0)+ +m[1]})});
 var ks=Object.keys(h).sort(function(a,b){return a-b}),mx=Math.max.apply(null,ks.map(function(k){return h[k]}).concat([1]));
 anh.innerHTML=ks.map(function(k){return '<div style="flex:1;text-align:center"><div class="bar" style="background:var(--brand);height:'+Math.round(h[k]/mx*80+8)+'px;margin:auto;width:70%"></div><small>'+k+':00 ('+h[k]+')</small></div>'}).join("")||'<small>'+L("Abhi data nahi","No data yet")+'</small>';
 var top=Object.keys(it).sort(function(a,b){return it[b]-it[a]}).slice(0,3);
 ant.innerHTML=top.map(function(k){return '<div class="ln"><span>'+esc(k)+'</span><b>'+it[k]+'</b></div>'}).join("")||'<small>'+L("Abhi data nahi","No data yet")+'</small>';
 avo.textContent="₹"+(ords.length?Math.round(tt/ords.length):0);apd.textContent=dv;
 avr.textContent=rs.length?(rs.reduce(function(a,b){return a+b},0)/rs.length).toFixed(1)+"★":"–"}
function notify(o){toast.textContent=L("🔔 Order "+o.id+" ready! Counter pe aayein","🔔 Order "+o.id+" is ready! Collect at counter");toast.style.opacity=1;setTimeout(function(){toast.style.opacity=0},4500);
 try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}
 try{var C=window.AudioContext||window.webkitAudioContext,c=window.__ac||(window.__ac=new C());c.resume&&c.resume();[660,880].forEach(function(f,i){var s=c.createOscillator(),g=c.createGain();s.frequency.value=f;g.gain.value=.15;s.connect(g);g.connect(c.destination);s.start(c.currentTime+i*.18);s.stop(c.currentTime+i*.18+.15)})}catch(e){}}
function checkReady(){var my=window.CLOUD?ords.filter(function(o){return mine.indexOf(o.k)>-1}):ords,cur={};
 my.forEach(function(o){cur[o.k]=o.s});
 if(prevS)my.forEach(function(o){if(prevS[o.k]!=null&&prevS[o.k]<2&&o.s==2)notify(o)});prevS=cur}
function receipt(k){var o=ords.filter(function(x){return x.k==k})[0];if(!o)return;
 var x="CAMPUSBITE RECEIPT\nMohammad Hasan P.G. College, Jaunpur\n----------------------\nToken: "+o.id+"\nCanteen: "+o.c+"\nItems: "+o.i+"\nPayment: "+(o.pay||"UPI")+"\nPickup: "+(o.sl||"ASAP")+"\nTotal: Rs "+o.t+(o.sp>1?"\nSplit: "+o.sp+" people x Rs "+Math.ceil(o.t/o.sp):"")+"\nStatus: "+ST[o.s][0]+"\nTime: "+new Date(o.k).toLocaleString()+"\n----------------------\nThank you! (Udaan 2026 demo)";
 var fn="CampusBite-receipt-"+o.id.replace("#","")+".txt";
 (async function(){try{var d=window.claude&&await claude.use("downloads");if(d){await d.save({filename:fn,data:new Blob([x],{type:"text/plain"})});return}}catch(e){return}
 var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([x],{type:"text/plain"}));a.download=fn;document.body.appendChild(a);a.click();a.remove()})()}
function allCn(){return [{n:"College Main Canteen"}].concat(cans)}
function pickC(i){cs.value=allCn()[i].n;renderMap();draw()}
function renderMap(){var cl=allCn().slice(0,5),sel=cs.value||cl[0].n,my=window.CLOUD?ords.filter(function(o){return mine.indexOf(o.k)>-1}):ords,l=my.filter(function(o){return o.s<3}).pop(),tg=null;
 cl.forEach(function(c,i){if(c.n==sel)tg=SP[i]});
 var t='style="font-size:9px;fill:var(--mute)"',v='<rect width="340" height="220" rx="14" style="fill:rgba(255,255,255,.04)"/><rect x="120" y="92" width="100" height="34" rx="8" style="fill:rgba(34,211,238,.18);stroke:rgba(34,211,238,.5)"/><text x="170" y="113" text-anchor="middle" style="font-size:10px;fill:var(--ink)">Main Building</text><rect x="10" y="10" width="46" height="26" rx="6" style="fill:rgba(255,255,255,.08)"/><text x="33" y="27" text-anchor="middle" '+t+'>Library</text><rect x="286" y="10" width="44" height="26" rx="6" style="fill:rgba(255,255,255,.08)"/><text x="308" y="27" text-anchor="middle" '+t+'>Ground</text><text x="170" y="214" text-anchor="middle" '+t+'>🚪 Gate</text>';
 if(tg)v+='<path d="M170 200 L'+tg[0]+' '+(tg[1]+12)+'" style="stroke:var(--brand);stroke-width:2;stroke-dasharray:5 4;fill:none"/>';
 cl.forEach(function(c,i){var p=SP[i],on=c.n==sel;
  if(l&&l.c==c.n)v+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" style="fill:none;stroke:var(--brand);stroke-width:2"><animate attributeName="r" values="15;28;15" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite"/></circle>';
  var cr=crowd(c.n);v+='<g onclick="pickC('+i+')" style="cursor:pointer"><circle cx="'+(p[0]+12)+'" cy="'+(p[1]-12)+'" r="4.5" style="fill:'+cr.c+'"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" style="fill:'+(on?'var(--brand)':'rgba(255,255,255,.14)')+'"/><text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" style="font-size:15px">🏪</text><text x="'+p[0]+'" y="'+(p[1]+28)+'" text-anchor="middle" '+t+'>'+esc(c.n.slice(0,16))+'</text></g>'});
 crw.innerHTML=crowdTxt(sel);cmap.innerHTML=v;
 mapi.textContent=sel+(l?" · "+L("Aapka pickup point: ","Your pickup point: ")+l.c:"")}
function extras(){renderAn();renderPrep();checkReady();renderRv();renderCans()}
var TAGM={"Samosa (2 pc)":"spicy quick","Veg Sandwich":"healthy quick","Maggi":"spicy quick","Chai":"quick","Cold Coffee":"sweet","Lassi":"sweet healthy","Paratha + Curd":"healthy","Veg Thali":"healthy","Poha":"healthy quick","Fresh Juice":"healthy sweet","Gulab Jamun":"sweet","Ice Cream":"sweet","Brownie":"sweet"};
var MD="",SG=[],PLANS=[{n:"Basic",d:10,fd:0,pr:0},{n:"Pro",d:15,fd:1,pr:1}];
function suggest(){var B=+bg.value,n=items.length,best=null,bs=-1;
 for(var m=1;m<(1<<n);m++){var ix=[],t=0,ok=0,cc={};
  for(var i=0;i<n;i++)if(m>>i&1){ix.push(i);if(ix.length>3)break}
  if(ix.length>3)continue;
  ix.forEach(function(i){t+=items[i][1];if(!MD||(TAGM[items[i][0]]||"").indexOf(MD)>-1)ok++;cc[items[i][3]]=1});
  if(t>B)continue;
  var sc=ok*100-(ix.length-ok)*60+Object.keys(cc).length*10+t/B*10;
  if(sc>bs){bs=sc;best=ix}}
 SG=best||[];
 if(!best){sgr.innerHTML='<small>'+L("Itne budget me kuch nahi mila, budget badhayein","Nothing fits this budget, increase it")+'</small>';return}
 var tt=best.reduce(function(a,i){return a+items[i][1]},0);
 sgr.innerHTML=best.map(function(i){return '<div class="ln"><span>'+items[i][2]+' '+items[i][0]+'</span><b>₹'+items[i][1]+'</b></div>'}).join("")+'<div class="total"><span>Total</span><span>₹'+tt+'</span></div><button class="order" id="sga">'+L("🛒 Cart me daalo","🛒 Add to cart")+'</button>';
 sga.onclick=function(){q=q.map(function(){return 0});SG.forEach(function(i){q[i]=1});cat="all";sq.value="";draw();document.getElementById("demo").scrollIntoView({behavior:"smooth"})}}
function crowd(nm){var n=ords.filter(function(o){return o.c==nm&&o.s<3&&o.dy!="Tomorrow"}).length,w=5+n*3;return n>3?{l:"High",h:"Zyada",c:"#ef4444",w:w}:n>1?{l:"Medium",h:"Medium",c:"#f59e0b",w:w}:{l:"Low",h:"Kam",c:"#22c55e",w:w}}
function crowdTxt(nm){var c=crowd(nm);return '<span style="color:'+c.c+'">●</span> '+L(c.h+" rush","Rush: "+c.l)+' · ~'+c.w+' min'}
function passMsg(){pm.textContent=PASS?L("✅ "+PASS.n+" pass active: "+PASS.d+"% off"+(PASS.fd?", free delivery, priority pickup":""),"✅ "+PASS.n+" pass active: "+PASS.d+"% off"+(PASS.fd?", free delivery, priority pickup":"")):""}
var NUMW={"ek":1,"one":1,"एक":1,"do":2,"two":2,"दो":2,"teen":3,"three":3,"तीन":3,"char":4,"four":4,"चार":4,"paanch":5,"panch":5,"five":5,"पांच":5,"पाँच":5};
var ALI=[["ice cream","Ice Cream"],["icecream","Ice Cream"],["आइस क्रीम","Ice Cream"],["आइसक्रीम","Ice Cream"],["gulab jamun","Gulab Jamun"],["jamun","Gulab Jamun"],["गुलाब जामुन","Gulab Jamun"],["samosa","Samosa"],["समोसा","Samosa"],["sandwich","Sandwich"],["सैंडविच","Sandwich"],["maggi","Maggi"],["मैगी","Maggi"],["chai","Chai"],["tea","Chai"],["चाय","Chai"],["coffee","Coffee"],["कॉफी","Coffee"],["कॉफ़ी","Coffee"],["lassi","Lassi"],["लस्सी","Lassi"],["paratha","Paratha"],["पराठा","Paratha"],["thali","Thali"],["थाली","Thali"],["poha","Poha"],["पोहा","Poha"],["juice","Juice"],["जूस","Juice"],["brownie","Brownie"],["ब्राउनी","Brownie"]];
function findIt(f){for(var i=0;i<items.length;i++)if(items[i][0].indexOf(f)>-1)return i;return -1}
function voice(tx){var out=[];tx=tx.toLowerCase();
 tx.split(/,| aur | and | और | ya | phir /).forEach(function(seg){
  var idx=-1;for(var a=0;a<ALI.length;a++){if(seg.indexOf(ALI[a][0])>-1){idx=findIt(ALI[a][1]);break}}
  if(idx<0)return;
  var qn=1,w=seg.split(/\s+/);for(var j=0;j<w.length;j++){if(NUMW[w[j]]){qn=NUMW[w[j]];break}var d=w[j].match(/^\d+$/);if(d){qn=Math.min(9,+d[0]);break}}
  q[idx]=Math.min(9,q[idx]+qn);out.push(qn+"× "+items[idx][0])});
 return out}
function doVoice(){var o=voice(vin.value);vmg2.style.color=o.length?"":"#d9363e";
 vmg2.textContent=o.length?L("✅ Add hua: ","✅ Added: ")+o.join(", "):L("Samajh nahi aaya, bolein: 'ek chai aur do samosa'","Couldn't understand, try: 'one chai and two samosa'");
 if(o.length){vin.value="";cat="all";sq.value="";draw()}}
var hhLast=null;
function hhOn(){return HF||new Date().getHours()==16}
function hhTick(){var n=new Date(),on=hhOn(),t;
 if(HF)t=L("🔥 Happy Hour LIVE (demo): sabhi order par 20% off!","🔥 Happy Hour LIVE (demo): 20% off every order!");
 else{var tg=new Date(n);if(on)tg.setHours(17,0,0,0);else{tg.setHours(16,0,0,0);if(tg<=n)tg.setDate(tg.getDate()+1)}
  var sc=Math.max(0,Math.round((tg-n)/1000)),h=Math.floor(sc/3600),m=Math.floor(sc%3600/60),c=(h?h+"h ":"")+m+"m "+(sc%60)+"s";
  t=on?L("🔥 Happy Hour LIVE: 20% off! Khatam hone me "+c,"🔥 Happy Hour LIVE: 20% off! Ends in "+c):L("⏰ Happy Hour 4–5 PM: 20% off. Shuru hone me "+c,"⏰ Happy Hour 4–5 PM: 20% off. Starts in "+c)}
 hht.textContent=t;if(hhLast!==on){hhLast=on;draw()}}
setInterval(hhTick,1000);
var REF,RUSED,TID=0;
function setDay(d){DAY=d;document.querySelectorAll(".seg3 button").forEach(function(x){x.className=x.dataset.dy==d?"on":""});draw()}
function renderPrep(){var it={};ords.forEach(function(o){if(o.dy=="Tomorrow"&&o.s<3)String(o.i).split(", ").forEach(function(x){var m=x.match(/^(\d+)× (.+)$/);if(m)it[m[2]]=(it[m[2]]||0)+ +m[1]})});
 prep.innerHTML=Object.keys(it).map(function(k){return '<div class="ln"><span>'+esc(k)+'</span><b>'+it[k]+'</b></div>'}).join("")||'<small>'+L("Kal ke liye koi pre-order nahi","No pre-orders for tomorrow")+'</small>'}
function goTo(id){var e=document.getElementById(id);if(e)e.scrollIntoView({behavior:"smooth",block:"center"})}
function wt(ms){return new Promise(function(r){setTimeout(r,ms)})}
function lastMine(){var m=window.CLOUD?ords.filter(function(o){return mine.indexOf(o.k)>-1}):ords;return m[m.length-1]}
async function tour(){var id=++TID;tbar.style.display="flex";setDay("Today");
 async function S(h,e,ms,fn){if(id!=TID)return false;tb.textContent=L(h,e);if(fn)try{fn()}catch(x){}await wt(ms);return id==TID}
 if(!await S("🎬 CampusBite: canteen ki line khatam, order seedha phone se.","🎬 CampusBite: no more canteen queues, order from your phone.",3200,function(){goTo("top")}))return;
 if(!await S("🤖 Budget aur mood batao, smart combo mil jata hai.","🤖 Set budget and mood, get a smart combo.",3600,function(){MD="sweet";document.querySelectorAll("#moods button").forEach(function(x){x.className=x.dataset.md==MD?"on":""});bg.value=60;bv.textContent=60;suggest();goTo("sug")}))return;
 if(!await S("🛒 Combo cart me aa gaya.","🛒 Combo added to the cart.",2800,function(){sga.click()}))return;
 if(!await S("🎤 Voice se bhi order: 'ek chai'.","🎤 Voice order too: 'one chai'.",3000,function(){vin.value="ek chai";doVoice()}))return;
 if(!await S("✅ Order place: token, cashback aur live status.","✅ Order placed: token, cashback and live status.",3400,function(){go.click();goTo("trk")}))return;
 if(!await S("📋 Canteen owner ke panel me order live aaya (PIN se secure).","📋 The order appears live in the owner panel (PIN protected).",3600,function(){pin.value="1234";unl.click();goTo("own")}))return;
 if(!await S("⏳ Order ban raha hai...","⏳ Order is being prepared...",500,null))return;
 for(var i=0;i<30&&id==TID;i++){var l=lastMine();if(l&&l.s>=2)break;await wt(500)}
 if(!await S("🔔 Ready! Customer ko notification aur pickup QR mila.","🔔 Ready! The customer gets a notification and pickup QR.",3800,function(){goTo("trk")}))return;
 if(!await S("🔐 Canteen wala QR code verify karke handover karta hai.","🔐 The canteen verifies the QR code and hands over.",3800,function(){vcode.value=pcd.textContent;goTo("own");vbtn.click()}))return;
 if(!await S("⭐ Customer rating deta hai.","⭐ The customer leaves a rating.",3200,function(){var l=lastMine();if(l){RT="Tasty";rate(l.k,5)}goTo("mo")}))return;
 if(!await S("📊 Owner ko analytics aur kal ki taiyari milti hai.","📊 The owner gets analytics and tomorrow's prep list.",3600,function(){goTo("anh")}))return;
 if(!await S("💰 Kamaayi: commission + Meal Pass subscription.","💰 Revenue: commission + Meal Pass subscription.",3400,function(){goTo("pass")}))return;
 if(!await S("🏪 Koi bhi canteen yahan se judd sakti hai.","🏪 Any canteen can join from here.",3200,function(){goTo("join")}))return;
 await S("🙏 Dhanyavaad! Sawal poochhiye.","🙏 Thank you! Any questions?",3000,function(){goTo("top");lockb.click()});
 if(id==TID)tbar.style.display="none"}
function stepIf(k,s){ords.forEach(function(o){if(o.k==k&&o.s==s)adv(k)})}
function autoAdv(k){setTimeout(function(){stepIf(k,0)},4000);setTimeout(function(){stepIf(k,1)},9000)}
function cnt(e,v){var f=+e.textContent||0,t=0;clearInterval(e.__i);e.__i=setInterval(function(){t++;e.textContent=Math.round(f+(v-f)*t/12);if(t>=12)clearInterval(e.__i)},40)}
dlb.onclick=async function(){
 var st=+r1.value,ad=+r2.value,od=Math.round(st*ad/100);
 var x="CampusBite - Pitch Summary (Udaan 2026, BCA Department)\nMohammad Hasan P.G. College, Jaunpur\n\nIdea: Pre-order canteen platform with pickup and class delivery.\nProblem: Long queues, cash issues, food waste.\nRevenue: "+r4.value+"% commission + Rs 10 delivery fee + ads.\n\nAssumptions: "+st+" students, "+ad+"% use app, avg order Rs "+r3.value+", monthly cost Rs "+r5.value+".\nResult: "+od+" orders/day, monthly revenue "+o2.textContent+", monthly profit "+o3.textContent+", break-even at "+o4.textContent+" orders/day.\n\nRoadmap: Pilot (M1) > 3 canteens + UPI (M3) > nearby colleges (M6) > app + ads (Y1).\n(All figures are estimates.)";
 sum.textContent=x;sum.style.display="block";
 try{var d=window.claude&&await claude.use("downloads");if(d)await d.save({filename:"CampusBite-pitch.txt",data:new Blob([x],{type:"text/plain"})})}catch(e){}
};