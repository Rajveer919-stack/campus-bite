// CampusBite 3D hero scene (three.js r128): food box, burger, coffee cup with steam, samosa, token card, glowing rings and particles
(function(){try{
var cv=document.getElementById("c3");if(!window.THREE){cv.parentNode.style.display="none";return}
var r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio||1,2));
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,60);cam.position.set(0,.6,9);
sc.add(new THREE.AmbientLight(0xffffff,.6));
var p1=new THREE.PointLight(0xff3d9a,1.4,25);p1.position.set(-5,3,4);
var p2=new THREE.PointLight(0x22d3ee,1.4,25);p2.position.set(5,-1,4);sc.add(p1);sc.add(p2);
var dl=new THREE.DirectionalLight(0xffffff,.8);dl.position.set(3,6,5);sc.add(dl);
function M(c,e){return new THREE.MeshStandardMaterial({color:c,roughness:.4,metalness:.1,emissive:e||0x000000,emissiveIntensity:.25})}
function mesh(g,m,x,y,z){var o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);return o}
var g=new THREE.Group();sc.add(g);
/* 1. food box */
var box=new THREE.Group();
box.add(mesh(new THREE.BoxGeometry(1.5,.9,1.5),M(0xff7a1a,0x331500)));
box.add(mesh(new THREE.BoxGeometry(1.62,.25,1.62),M(0xffffff),0,.58,0));
box.add(mesh(new THREE.TorusGeometry(.28,.05,8,20,Math.PI),M(0xff3d9a),0,.7,0));
box.position.set(-3.3,0,0);
/* 2. burger */
var bur=new THREE.Group();
bur.add(mesh(new THREE.CylinderGeometry(.78,.7,.2,32),M(0xe0a040,0x2a1500),0,-.4,0));
bur.add(mesh(new THREE.CylinderGeometry(.75,.75,.22,32),M(0x5b3a29),0,-.18,0));
var ch=mesh(new THREE.BoxGeometry(1.4,.05,1.4),M(0xfacc15,0x332a00),0,0,0);ch.rotation.y=Math.PI/4;bur.add(ch);
bur.add(mesh(new THREE.CylinderGeometry(.84,.84,.08,32),M(0x4ade80),0,.08,0));
bur.add(mesh(new THREE.SphereGeometry(.78,32,16,0,Math.PI*2,0,Math.PI/2),M(0xe0a040,0x2a1500),0,.12,0));
bur.position.set(-1.1,0,0);bur.scale.setScalar(.95);
/* 3. coffee cup with steam */
var cup=new THREE.Group();
cup.add(mesh(new THREE.CylinderGeometry(.55,.4,1.1,32),M(0x2a55b8,0x0a1a40)));
var hd=mesh(new THREE.TorusGeometry(.3,.08,12,24),M(0x2a55b8,0x0a1a40),.62,0,0);cup.add(hd);
cup.add(mesh(new THREE.CylinderGeometry(.5,.5,.06,32),M(0x8b5a2b),0,.52,0));
cup.position.set(1.1,0,0);
var steam=[];
for(var i=0;i<6;i++){var s=mesh(new THREE.SphereGeometry(.12,8,8),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0}));s.userData.p=i/6;cup.add(s);steam.push(s)}
/* 4. samosa */
var sm=mesh(new THREE.ConeGeometry(.9,1.2,3),M(0xe6a73a,0x331f00),3.3,0,0);
/* 5. token card */
var cvs=document.createElement("canvas");cvs.width=256;cvs.height=160;var x=cvs.getContext("2d");
x.fillStyle="#151d3f";x.fillRect(0,0,256,160);x.strokeStyle="#22d3ee";x.lineWidth=6;x.strokeRect(4,4,248,152);
x.textAlign="center";x.fillStyle="#a4adc8";x.font="bold 20px sans-serif";x.fillText("CAMPUSBITE TOKEN",128,38);
x.fillStyle="#ff3d9a";x.font="bold 64px sans-serif";x.fillText("#101",128,108);
x.fillStyle="#eef1ff";x.font="16px sans-serif";x.fillText("Ready for pickup",128,138);
var tok=mesh(new THREE.PlaneGeometry(1.9,1.19),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cvs),side:THREE.DoubleSide}),0,2.15,-.8);
g.add(box);g.add(bur);g.add(cup);g.add(sm);g.add(tok);
/* rings */
function ringM(c){return new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.7})}
var ring=mesh(new THREE.TorusGeometry(4.4,.03,8,120),ringM(0x22d3ee));ring.rotation.x=1.2;
var ring2=mesh(new THREE.TorusGeometry(3.6,.025,8,120),ringM(0xff3d9a));ring2.rotation.x=-1.1;
g.add(ring);g.add(ring2);
/* particles */
var N=140,pa=new Float32Array(N*3);
for(var j=0;j<N;j++){pa[j*3]=(Math.random()-.5)*16;pa[j*3+1]=(Math.random()-.5)*8;pa[j*3+2]=(Math.random()-.5)*8-2}
var pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.Float32BufferAttribute(pa,3));
var pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffffff,size:.06,transparent:true,opacity:.75}));sc.add(pts);
/* interaction: drag to rotate, tap to spin, tilt follows finger/mouse */
var down=false,lx=0,sx=0,moved=false,vis=true,t=0,boost=0,ty=0;
cv.addEventListener("pointerdown",function(e){down=true;moved=false;lx=sx=e.clientX;cv.style.cursor="grabbing"});
addEventListener("pointerup",function(e){if(down&&!moved)boost=.3;down=false;cv.style.cursor="grab"});
cv.addEventListener("pointermove",function(e){var b=cv.getBoundingClientRect();ty=((e.clientY-b.top)/b.height-.5)*.5;if(down){if(Math.abs(e.clientX-sx)>4)moved=true;g.rotation.y+=(e.clientX-lx)*.012;lx=e.clientX}});
new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
function fit(){var w=cv.clientWidth,h=cv.clientHeight;if(cv.__w!=w||cv.__h!=h){cv.__w=w;cv.__h=h;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}}
function loop(){requestAnimationFrame(loop);if(!vis)return;t+=.02;fit();
var hue=(t*.01)%1;p1.color.setHSL(hue,.9,.6);p2.color.setHSL((hue+.5)%1,.9,.6);
ring.material.color.setHSL((hue+.25)%1,.9,.6);ring2.material.color.setHSL((hue+.75)%1,.9,.6);
ring.rotation.z+=.008;ring2.rotation.z-=.006;
box.rotation.y+=.012;bur.rotation.y-=.01;cup.rotation.y+=.01;sm.rotation.y+=.016;sm.rotation.x=.2;
box.position.y=Math.sin(t)*.15;bur.position.y=Math.sin(t+1.5)*.15;cup.position.y=Math.sin(t+3)*.15;sm.position.y=Math.sin(t+4.5)*.15;
tok.rotation.y=Math.sin(t*.8)*.4;tok.position.y=2.15+Math.sin(t*1.2)*.08;
steam.forEach(function(s,i){var p=s.userData.p=(s.userData.p+.008)%1;s.position.set(.12*Math.sin(p*12+i),.65+p*1.3,0);s.material.opacity=.5*(1-p);s.scale.setScalar(.6+p*1.4)});
pts.rotation.y+=.0008;
g.rotation.y+=boost;boost*=.94;g.rotation.x+=(ty-g.rotation.x)*.05;
if(!down)g.rotation.y*=.97;
r.render(sc,cam)}
loop();
}catch(e){var c=document.getElementById("d3");if(c)c.style.display="none"}})();