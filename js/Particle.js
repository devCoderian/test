import { randomNumBetween } from "./Util.js";


export default class Particle{
    
    constructor(){

        this.rFriction = randomNumBetween(0.95, 1.01)
        this.angleFriction = randomNumBetween(0.97, 0.99);
        this.rAlpha = randomNumBetween(0, 5);
        this.angleAlpha = randomNumBetween(1, 2);
        // 반지름을 가지는 원위에 점을 찍기 위해 this.r을 innerHeight/4해준다.
        this.r = innerHeight/ 4;
        // random한 위치에 점을 찍기 위헤 angle값을 random으로 가져온다.
        this.angle = randomNumBetween(0, 360)
        // update 함수로 이동
        //  this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle);
        // this.y = innerHeight / 2+ this.r * Math.sin(Math.PI / 180 * this.angle);
        this.opacity = randomNumBetween(0.2, 1);
    }

    update(){

        this.opacity -= 0.003;

        this.rAlpha *= this.rFriction;
        this.angleAlpha *= this.angleFriction;
        
        this.r += this.rAlpha;
        this.angle += this.angleAlpha;
        
        this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle);
        this.y = innerHeight / 2+ this.r * Math.sin(Math.PI / 180 * this.angle);
    }
    
    draw(ctx){
        ctx.beginPath()
        //x좌표, y좌표, 반지름, 0부터 360도까지
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        //opacity 적용을 위해 rgba값으로 변경
        //ctx.fillStyle = "#fff";
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill();
        ctx.closePath();
    }
}
