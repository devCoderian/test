import Particle from "./js/Particle.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

// 특정 기기에 따라 dpr이 1부터 2, 4 등등 다양한 값을 가지고 있기 때문에
// 캔버스의 width와 height를 우리가 원하는 값의 dpr을 곱한다음
// scale로 내부 컨텐츠 사이즈를 scale up 시켜주고
// css로 캔버스 전체의 사이즈를 맞춰서 선명하게 만들어주기


const interval = 1000 / 60;
//60은 우리가 원하는 fps

const particles = [];

function init(){

    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    //캔버스의 고유 width는 dpr을 곱한값
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    ctx.scale(dpr, dpr); //특정 디바이스에서 더욱 선명하도록 해주기

}

function createRing(){
    const PARTICLE_NUM = 500;
    for(let i = 0; i<PARTICLE_NUM; i++){
        particles.push(new Particle());
    }
}

function render(){
    let now, delta;
    let then = Date.now()

// requestAnimationFrame 에 프레임을 인자를 넣어 스스로 반복시키는 재귀함수를 만들어
// 현재 디스플레이 사양에 따라 매프레임마다 실행시킬 수 있는 requestAnimationFrame을 실행 시켜주기

﻿
const frame = () => {
    requestAnimationFrame(frame)
    //내가 설정해놓은 fps에따라 frame함수가 실행된다.
    //실시간으로 현재 시간 받아오기
    now = Date.now()
    delta = now-then;

    if(delta < interval) return;


    // 잔상을 없애주기 위해 index.js 의 frame() 함수 안에서 clearRect 로 clear 처리를 해준다.
    // 0, 0부터 canvasWidth, canvasHeight 지워주기.
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // particles.forEach((particle, index) => {
    //     particle.update()
    //     particle.draw(ctx)

    //     if(particle.opacity <0) particle.splice(index, 1);
    // });


    for(let i= particles.length -1; i >=0; i--){
        particles[i].update();
        particles[i].draw(ctx);
    }

    then = now - (delta%interval);
}

requestAnimationFrame(frame);        
}

window.addEventListener('load', () => {
    init()
    render()
})

window.addEventListener('resize', init)

// window.addEventListener('click', () => {
//     createRing()
// })

window.addEventListener('click', () => {
    const texts = document.querySelectorAll('span');
    
    const countDownOption = {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'Poser4.easeOut'
    }

    gsap.fromTo(texts[0], {opacity: 0, scale: 5}, {
        ...countDownOption
    });
    gsap.fromTo(texts[1], {opacity: 0, scale: 5}, {
        ...countDownOption,
        delay: 1,
        onStart: () => texts[0].style.opacity = 0
    });
    gsap.fromTo(texts[2], {opacity: 0, scale: 5}, {
        ...countDownOption,
        delay: 2,
        onStart: () => texts[1].style.opacity = 0
    });

    const ringImg = document.querySelector('#ring');
    gsap.fromTo(ringImg, {opacity: 1}, {
        opacity: 0,
        duration: 1,
        delay: 3,
        onStart: () => {
            createRing()
            texts[2].style.opacity = 0
        }
    })


})

