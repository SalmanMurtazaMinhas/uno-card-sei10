let body = document.querySelector("body")
let card = document.querySelectorAll(".card")
let containerDiv = document.querySelector(".container")
let fliped = 0
let img1 = document.querySelector('.img1')
let img2 = document.querySelector('.img2')
let img3 = document.querySelector('.img3')
let img4 = document.querySelector('.img4')
let song = document.querySelector('.song')
let cardHover = document.querySelector('.cards-hover')
let cardDeal = document.querySelector('.card-deal')
let cardDeal2 = document.querySelector('.card-deal2')
let cardDeal3 = document.querySelector('.card-deal3')
let canvas = document.createElement('canvas')
canvas.setAttribute('id','c')

let nameCon = document.createElement("div")
nameCon.classList.add("nameCon")
nameCon.classList.add("animate__animated")

let cardDiv1 = document.createElement("div")
cardDiv1.classList.add("myCard")
cardDiv1.classList.add("card1")
cardDiv1.classList.add("animate__animated")

let cardDiv2 = document.createElement("div")
cardDiv2.classList.add("myCard")
cardDiv2.classList.add("card2")
cardDiv2.classList.add("animate__animated")

let cardDiv3 = document.createElement("div")
cardDiv3.classList.add("myCard")
cardDiv3.classList.add("card3")
cardDiv3.classList.add("animate__animated")
// console.log(nameCon)

let innerCardDiv1 = document.createElement("div")
innerCardDiv1.classList.add("innerCard")

let innerCardDiv2 = document.createElement("div")
innerCardDiv2.classList.add("innerCard")

let innerCardDiv3 = document.createElement("div")
innerCardDiv3.classList.add("innerCard")

let frontSideDiv1 = document.createElement("div")
frontSideDiv1.classList.add("frontSide")

let frontSideDiv2 = document.createElement("div")
frontSideDiv2.classList.add("frontSide")

let frontSideDiv3 = document.createElement("div")
frontSideDiv3.classList.add("frontSide")

let backSideDiv1 = document.createElement("div")
backSideDiv1.classList.add("backSide")
backSideDiv1.classList.add("backSide1")

let backSideDiv2 = document.createElement("div")
backSideDiv2.classList.add("backSide")
backSideDiv2.classList.add("backSide2")

let backSideDiv3 = document.createElement("div")
backSideDiv3.classList.add("backSide")
backSideDiv3.classList.add("backSide3")

let name1 = document.createElement("h1")
let name2 = document.createElement("h1")
let name3 = document.createElement("h1")

nameCon.append(cardDiv1)
innerCardDiv1.append(frontSideDiv1)
innerCardDiv1.append(backSideDiv1)

nameCon.append(cardDiv2)
innerCardDiv2.append(frontSideDiv2)
innerCardDiv2.append(backSideDiv2)

nameCon.append(cardDiv3)
innerCardDiv3.append(frontSideDiv3)
innerCardDiv3.append(backSideDiv3)

cardDiv1.append(innerCardDiv1)
cardDiv2.append(innerCardDiv2)
cardDiv3.append(innerCardDiv3)

const fireworks = ()=>{
    body.prepend(canvas)
    var gl = c.getContext( 'webgl', { preserveDrawingBuffer: true } )
  , w = c.width = window.innerWidth
  , h = c.height = window.innerHeight

  , webgl = {}
  , opts = {
    projectileAlpha: .8,
    projectileLineWidth: 1.3,
    fireworkAngleSpan: .5,
    baseFireworkVel: 3,
    addedFireworkVel: 3,
    gravity: .03,
    lowVelBoundary: -.2,
    xFriction: .995,
    baseShardVel: 1,
    addedShardVel: .2,
    fireworks: 1000,
    baseShardsParFirework: 10,
    addedShardsParFirework: 10,
    shardFireworkVelMultiplier: .3,
    initHueMultiplier: 1/360,
    runHueAdder: .1/360
  }

webgl.vertexShaderSource = `
uniform int u_mode;
uniform vec2 u_res;
attribute vec4 a_data;
varying vec4 v_color;

vec3 h2rgb( float h ){
  return clamp( abs( mod( h * 6. + vec3( 0, 4, 2 ), 6. ) - 3. ) -1., 0., 1. );
}
void clear(){
  gl_Position = vec4( a_data.xy, 0, 1 );
  v_color = vec4( 0, 0, 0, a_data.w );
}
void draw(){
  gl_Position = vec4( vec2( 1, -1 ) * ( ( a_data.xy / u_res ) * 2. - 1. ), 0, 1 );
  v_color = vec4( h2rgb( a_data.z ), a_data.w );
}
void main(){
  if( u_mode == 0 )
    draw();
  else
    clear();
}
`;
webgl.fragmentShaderSource = `
precision mediump float;
varying vec4 v_color;

void main(){
  gl_FragColor = v_color;
}
`;

webgl.vertexShader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( webgl.vertexShader, webgl.vertexShaderSource );
gl.compileShader( webgl.vertexShader );

webgl.fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
gl.shaderSource( webgl.fragmentShader, webgl.fragmentShaderSource );
gl.compileShader( webgl.fragmentShader );

webgl.shaderProgram = gl.createProgram();
gl.attachShader( webgl.shaderProgram, webgl.vertexShader );
gl.attachShader( webgl.shaderProgram, webgl.fragmentShader );

gl.linkProgram( webgl.shaderProgram );
gl.useProgram( webgl.shaderProgram );

webgl.dataAttribLoc = gl.getAttribLocation( webgl.shaderProgram, 'a_data' );
webgl.dataBuffer = gl.createBuffer();

gl.enableVertexAttribArray( webgl.dataAttribLoc );
gl.bindBuffer( gl.ARRAY_BUFFER, webgl.dataBuffer );
gl.vertexAttribPointer( webgl.dataAttribLoc, 4, gl.FLOAT, false, 0, 0 );

webgl.resUniformLoc = gl.getUniformLocation( webgl.shaderProgram, 'u_res' );
webgl.modeUniformLoc = gl.getUniformLocation( webgl.shaderProgram, 'u_mode' );

gl.viewport( 0, 0, w, h );
gl.uniform2f( webgl.resUniformLoc, w, h );

gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
gl.enable( gl.BLEND );

gl.lineWidth( opts.projectileLineWidth );

webgl.data = [];

webgl.clear = function(){
  
  gl.uniform1i( webgl.modeUniformLoc, 1 );
  var a = .1;
  webgl.data = [
    -1, -1, 0, a,
     1, -1, 0, a,
    -1,  1, 0, a,
    -1,  1, 0, a,
     1, -1, 0, a,
     1,  1, 0, a
  ];
  webgl.draw( gl.TRIANGLES );
  gl.uniform1i( webgl.modeUniformLoc, 0 );
  webgl.data.length = 0;
}
webgl.draw = function( glType ){
  
  gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( webgl.data ), gl.STATIC_DRAW );
  gl.drawArrays( glType, 0, webgl.data.length / 4 );
}

var fireworks = []
  , tick = 0
  , sins = []
  , coss = []
  , maxShardsParFirework = opts.baseShardsParFirework + opts.addedShardsParFirework
  , tau = 6.283185307179586476925286766559;

for( var i = 0; i < maxShardsParFirework; ++i ){
  sins[ i ] = Math.sin( tau * i / maxShardsParFirework );
  coss[ i ] = Math.cos( tau * i / maxShardsParFirework );
}

function Firework(){
  this.reset();
  this.shards = [];
  for( var i = 0; i < maxShardsParFirework; ++i )
    this.shards.push( new Shard( this ) );
}
Firework.prototype.reset = function(){
  
  var angle = -Math.PI / 2 + ( Math.random() - .5 )* opts.fireworkAngleSpan
    , vel = opts.baseFireworkVel + opts.addedFireworkVel * Math.random();
  
  this.mode = 0;
  this.vx = vel * Math.cos( angle );
  this.vy = vel * Math.sin( angle );
  
  this.x = Math.random() * w;
  this.y = h;
  
  this.hue = tick * opts.initHueMultiplier;
  
}
Firework.prototype.step = function(){
  
  if( this.mode === 0 ){
    
    var ph = this.hue
      , px = this.x
      , py = this.y;
    
    this.hue += opts.runHueAdder;
  
    this.x += this.vx *= opts.xFriction;
    this.y += this.vy += opts.gravity;
    
    webgl.data.push(
      px, py, ph, opts.projectileAlpha * .2,
      this.x, this.y, this.hue, opts.projectileAlpha * .2 );
    
    if( this.vy >= opts.lowVelBoundary ){
      this.mode = 1;

      this.shardAmount = opts.baseShardsParFirework + opts.addedShardsParFirework * Math.random() | 0;

      var baseAngle = Math.random() * tau
        , x = Math.cos( baseAngle )
        , y = Math.sin( baseAngle )
        , sin = sins[ this.shardAmount ]
        , cos = coss[ this.shardAmount ];

      for( var i = 0; i < this.shardAmount; ++i ){

        var vel = opts.baseShardVel + opts.addedShardVel * Math.random();
        this.shards[ i ].reset( x * vel, y * vel )
        var X = x;
        x = x * cos - y * sin;
        y = y * cos + X * sin;
      }
    }

  } else if( this.mode === 1 ) {
    
    this.ph = this.hue
    this.hue += opts.runHueAdder;
    
    var allDead = true;
    for( var i = 0; i < this.shardAmount; ++i ){
      var shard = this.shards[ i ];
      if( !shard.dead ){
        shard.step();
        allDead = false;
      }
    }
    
    if( allDead )
      this.reset();
  }
  
}
function Shard( parent ){
  this.parent = parent;
}
Shard.prototype.reset = function( vx, vy ){
  this.x = this.parent.x;
  this.y = this.parent.y;
  this.vx = this.parent.vx * opts.shardFireworkVelMultiplier + vx;
  this.vy = this.parent.vy * opts.shardFireworkVelMultiplier + vy;
  this.starty = this.y;
  this.dead = false;
  this.tick = 1;
}
Shard.prototype.step = function(){
  
  this.tick += .05;
  
  var px = this.x
    , py = this.y;
  
  this.x += this.vx *= opts.xFriction;
  this.y += this.vy += opts.gravity;
  
  var proportion = 1 - ( this.y - this.starty ) / ( h - this.starty );
  
  webgl.data.push(
    px, py, this.parent.ph, opts.projectileAlpha / this.tick,
    this.x, this.y, this.parent.hue, opts.projectileAlpha / this.tick );
  
  if( this.y > h )
    this.dead = true;
}

function anim(){
  
  window.requestAnimationFrame( anim )
  
  webgl.clear();
  
  ++tick;
  
  if( fireworks.length < opts.fireworks )
    fireworks.push( new Firework );
  
  fireworks.map( function( firework ){ firework.step(); } );
  
  webgl.draw( gl.LINES );
}
anim();

window.addEventListener( 'resize', function(){
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  
  gl.viewport( 0, 0, w, h );
  gl.uniform2f( webgl.resUniformLoc, w, h );
})
window.addEventListener( 'click', function( e ){
  var firework = new Firework();
  firework.x = e.clientX;
  firework.y = e.clientY;
  firework.vx = 0;
  firework.vy = 0;
  fireworks.push( firework );
});

// return
setTimeout(()=>{
     fireworks = 0
  , tick = 0
  , sins = 0
  , coss = 0
  , maxShardsParFirework = 0
  , tau = 0
},13000)
}


// console.log(card)
// console.log(containerDiv)
card.forEach((element) => {
  element.addEventListener("click", () => {
    body.prepend(nameCon)

    let nameCard = document.querySelector(".nameCon")
    let card1 = document.querySelector(".card1")
    let card2 = document.querySelector(".card2")
    let card3 = document.querySelector(".card3")
    card1.addEventListener("click", () => {
        cardDeal.play()
    })
    card2.addEventListener("click", () => {
        cardDeal2.play()
    })
    card3.addEventListener("click", () => {
        cardDeal3.play()
    })
    // if (element.className === "card card1 animate__animated") {
    //   name1.innerHTML = "Ali"
    //   name2.innerHTML = "Abood"
    //   name3.innerHTML = "Shaikha"
    //   backSideDiv1.append(name1)
    //   backSideDiv2.append(name2)
    //   backSideDiv3.append(name3)
    // }

    switch (element.className) {
      case "card card1 animate__animated":
        name1.innerHTML = "Danah"
        name2.innerHTML = "Zainab Karim"
        name3.innerHTML = "Maryam Mohsen"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
      case "card card2 animate__animated":
        name1.innerHTML = "Maryam Qasim"
        name2.innerHTML = "Zainab Dhaif"
        name3.innerHTML = "Nour"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
      case "card card3 animate__animated":
        name1.innerHTML = "Mueen"
        name2.innerHTML = "Mahmood"
        name3.innerHTML = "Ahmed Isa"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
      case "card card4 animate__animated":
        name1.innerHTML = "Khalil"
        name2.innerHTML = "Yousif"
        name3.innerHTML = "Ebrahim"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
      case "card card5 animate__animated":
        name1.innerHTML = "Jaber"
        name2.innerHTML = "Redha"
        name3.innerHTML = "Mohammed"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
      case "card card6 animate__animated":
        name1.innerHTML = "Mujtaba"
        name2.innerHTML = "Hussain"
        name3.innerHTML = "Ahmed Shamlooh"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
      case "card card7 animate__animated":
        name1.innerHTML = "Nohaiz"
        name2.innerHTML = "Maryam Ali"
        name3.innerHTML = "Qasim"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
 
      case "card card8 animate__animated":
        name1.innerHTML = "Sayed Ahmed"
        name2.innerHTML = "Ali Hadi"
        name3.innerHTML = "Muntadher"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break

      case "card card9 animate__animated":
        name1.innerHTML = "Fadhel Abbas"
        name2.innerHTML = "Fadhel Mohammad"
        name3.innerHTML = "Ali Hussain"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break

      case "card card10 animate__animated":
        name1.innerHTML = "Ali Latfalla"
        name2.innerHTML = "Ali ebrahim"
        name3.innerHTML = "Haroon"
        backSideDiv1.append(name1)
        backSideDiv2.append(name2)
        backSideDiv3.append(name3)
        break
    }

    // console.log(element)
    // element.style.translate = "calc(var(--i)*20px)-300px"
    card1.style.opacity = "1"
    card1.classList.add("animate__slideInUp")
    cardDeal.play()

    setTimeout(() => {
      card2.style.opacity = "1"
      card2.classList.add("animate__slideInUp")
    //   cardDeal.pause()
    //   cardDeal.currentTime = 0
      cardDeal2.play()
    }, 200)

    setTimeout(() => {
      card3.style.opacity = "1"
      card3.classList.add("animate__slideInUp")
    //   cardDeal.pause()
    //   cardDeal.currentTime = 0
      cardDeal3.play()
    }, 400)

    setTimeout(() => {
      element.remove()
    }, 500)

    // element.onclick = function () {
    // // console.log("yes")
    // let newCard = document.createElement("div")
    // let divImg = document.createElement("img")
    // divImg.src = "./cards/8cxrbGE6i.jpg"
    // newCard.appendChild(divImg)
    // newCard.classList.add("card")
    // newCard.style.translate = "calc(var(--i)*20px)-300px"
    // containerDiv.appendChild(newCard)
    // newCard.onclick = function () {
    //     newCard.classList.add("card")
    // }
    // }
  })
})

containerDiv.addEventListener("mouseenter", () => {
    cardHover.play()
});

innerCardDiv1.addEventListener("click", () => {
  innerCardDiv1.style.transform = "rotateY(180deg)"
  fliped++
  console.log(fliped)
      if(fliped === 3 ){
        fireworks()
        song.src="./audio/September-Flute-Meme.mp3"
        img1.src = './img/dance5.gif'
        img2.src = "./img/dance3.gif"
        img3.src = "./img/dance6.gif"
        img4.src = "./img/dance8.gif"
        setTimeout(()=>{
            cardDiv1.classList.remove('animate__slideInUp')
            cardDiv1.classList.add('animate__hinge')
        },10000)
        setTimeout(()=>{
            cardDiv2.classList.remove('animate__slideInUp')
            cardDiv2.classList.add('animate__hinge')
        },10500)
        setTimeout(()=>{
            cardDiv3.classList.remove('animate__slideInUp')
            cardDiv3.classList.add('animate__hinge')
        },11000)
        // console.log(cardDiv1)
        console.log('remove!')
        fliped = 0
        setTimeout(()=>{
            body.removeChild(canvas)
            name1.innerHTML = ''
            name2.innerHTML = ''
            name3.innerHTML = ''
            song.src = ''
            img1.src = ''
            img2.src = ''
            img3.src = ''
            img4.src = ''
            let myCard = document.querySelectorAll(".myCard")

            myCard.forEach((element) => {
                element.classList.remove('animate__hinge')
                console.log(element)
                element.style.opacity = '0'
            })
            innerCardDiv1.style.transform = 'rotateY(0deg)'
            innerCardDiv2.style.transform = 'rotateY(0deg)'
            innerCardDiv3.style.transform = 'rotateY(0deg)'
            body.removeChild(nameCon)


        },13000)
    }
})
innerCardDiv2.addEventListener("click", () => {
  innerCardDiv2.style.transform = "rotateY(180deg)"
  fliped++
  console.log(fliped)
      if(fliped === 3 ){
        fireworks()
        song.src="./audio/I-got-beans.mp3"
        img1.src = './img/dance7.gif'
        img2.src = "./img/dance10.gif"
        img3.src = "./img/dance9.gif"
        img4.src = "./img/dance11.gif"
        setTimeout(()=>{
            cardDiv1.classList.remove('animate__slideInUp')
            cardDiv1.classList.add('animate__hinge')
        },10000)
        setTimeout(()=>{
            cardDiv2.classList.remove('animate__slideInUp')
            cardDiv2.classList.add('animate__hinge')
        },10500)
        setTimeout(()=>{
            cardDiv3.classList.remove('animate__slideInUp')
            cardDiv3.classList.add('animate__hinge')
        },11000)
        // console.log(cardDiv1)
        console.log('remove!')
        fliped = 0
        setTimeout(()=>{
            body.removeChild(canvas)
            name1.innerHTML = ''
            name2.innerHTML = ''
            name3.innerHTML = ''
            song.src = ''
            img1.src = ''
            img2.src = ''
            img3.src = ''
            img4.src = ''
            let myCard = document.querySelectorAll(".myCard")

            myCard.forEach((element) => {
                element.classList.remove('animate__hinge')
                console.log(element)
                element.style.opacity = '0'
            })
            innerCardDiv1.style.transform = 'rotateY(0deg)'
            innerCardDiv2.style.transform = 'rotateY(0deg)'
            innerCardDiv3.style.transform = 'rotateY(0deg)'
            body.removeChild(nameCon)


        },13000)
    }
})

innerCardDiv3.addEventListener("click", ()=> {
    innerCardDiv3.style.transform = 'rotateY(180deg)'
    fliped++
    console.log(fliped)
    if(fliped === 3 ){
        fireworks()
        song.src="./audio/Last-Christmas-Arab.m4a"
        img1.src = './img/dance1.gif'
        img2.src = "./img/dance7.gif"
        img3.src = "./img/dance9.gif"
        img4.src = "./img/dance2.gif"
        setTimeout(()=>{
            cardDiv1.classList.remove('animate__slideInUp')
            cardDiv1.classList.add('animate__hinge')
        },10500)
        setTimeout(()=>{
            cardDiv2.classList.remove('animate__slideInUp')
            cardDiv2.classList.add('animate__hinge')
        },11000)
        setTimeout(()=>{
            cardDiv3.classList.remove('animate__slideInUp')
            cardDiv3.classList.add('animate__hinge')
        },12000)
        // console.log(cardDiv1)
        console.log('remove!')
        fliped = 0
        setTimeout(()=>{
            body.removeChild(canvas)
            name1.innerHTML = ''
            name2.innerHTML = ''
            name3.innerHTML = ''
            song.src = ''
            img1.src = ''
            img2.src = ''
            img3.src = ''
            img4.src = ''
            let myCard = document.querySelectorAll(".myCard")

            myCard.forEach((element) => {
                element.classList.remove('animate__hinge')
                console.log(element)
                element.style.opacity = '0'
            })
            innerCardDiv1.style.transform = 'rotateY(0deg)'
            innerCardDiv2.style.transform = 'rotateY(0deg)'
            innerCardDiv3.style.transform = 'rotateY(0deg)'
            body.removeChild(nameCon)


        },15500)
    }
})



// img1.src = './img/dance1.gif'


