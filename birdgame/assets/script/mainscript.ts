// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

@property(cc.Sprite)
bird0: cc.Sprite = null;

@property(cc.Sprite)
bird1: cc.Sprite = null;

@property(cc.Sprite)
bird2: cc.Sprite = null;
    
@property(cc.Sprite)
bird3: cc.Sprite = null;

@property(cc.Node)
birdParent: cc.Node = null;

@property(cc.Node)
bg0: cc.Node = null;

@property(cc.Node)
bg1: cc.Node = null;

@property(cc.Node)
pipeParent0: cc.Node = null;

@property(cc.Node)
pipeParent1: cc.Node = null;

@property(cc.Node)
pipeParent2: cc.Node = null;

@property(cc.Label)
lbScore:cc.Label = null;

@property(cc.Node)
nodeGameOver:cc.Node = null;

@property(cc.Button)
btnStar:cc.Button = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
  time:number = 0;
speed:number = 0;
score:number = 0;
isGameStar:boolean = false;
    start () {
        cc.debug.setDisplayStats(false);
      let pipeStarOffSetX:number = 200;
      this.pipeParent0.x = pipeStarOffSetX + 144;
      this.pipeParent1.x = pipeStarOffSetX + 288;
      this.pipeParent2.x = pipeStarOffSetX + 432;
    }

     update (dt:number) {
          let timeTmp = this.time + dt;
          this.time = timeTmp;
    
        
          if(timeTmp > 0.5){
              if(this.bird0.node.active){
                  this.bird0.node.active=false;
                  this.bird1.node.active=true;
              }else if(this.bird1.node.active){
                  this.bird1.node.active=false;
                  this.bird2.node.active=true;
              }else if(this.bird2.node.active){
                this.bird2.node.active=false;
                this.bird3.node.active=true;
            }else if(this.bird3.node.active){
                this.bird3.node.active=false;
                this.bird0.node.active=true;
            }
            this.time = 0;
          }
            if(this.isGameStar == false){
                return;
            }

        //   let birdY = this.birdParent.y;
        //   this.birdParent.y = birdY - 2;
        this.speed = this.speed - 0.05;
        this.birdParent.y = this.birdParent.y + this.speed;
        this.birdParent.rotation = - this.speed * 5;

        //   let bg0X = this.bg0.x;
        //   let bg1X = this.bg1.x;
        //   this.bg0.x = bg0X - 1;
        //   this.bg1.x = bg1X - 1;
        //   if(this.bg0.x < -288){
        //       this.bg0.x = this.bg0.x + 288 * 2;
        //   }
        //   if(this.bg1.x < -288){
        //     this.bg1.x = this.bg1.x + 288 * 2;
        //   }
      
         this.movebg(this.bg0);
         this.movebg(this.bg1);
           


          this.movepipe(this.pipeParent0);
          this.movepipe(this.pipeParent1);
          this.movepipe(this.pipeParent2);

          this.check(this.birdParent,this.pipeParent0);
          this.check(this.birdParent,this.pipeParent1);
          this.check(this.birdParent,this.pipeParent2);
     }
     //移动背景
     movebg(bg:cc.Node){
         bg.x = bg.x - 2;
         if(bg.x < -144){
             bg.x = bg.x + 576;
         }
     }
     //移动管道
     movepipe(pipe:cc.Node){
         pipe.x = pipe.x - 3;
         if(pipe.x < -144){
             pipe.x = pipe.x + 432;
            pipe.y = 225 - (Math.random() * 70);
            this.score++;
            this.lbScore.string = this.score.toString();
         }
     }

     //点击屏幕事件
     onButtonClick(){
          
          this.speed = 2;
     }
     //碰撞事件
     check(bird:cc.Node,pipe:cc.Node){
          if(bird.x + 17 < pipe.x - 26){ return;}
          if(bird.x - 17 > pipe.x + 26){ return;}
          if((bird.y + 12 <pipe.y + 90)&&(bird.y -12 > pipe.y - 45)){ return;} 
            this.gameOver();
     }
     //点击开始按钮事件
     StarClick(){
         this.isGameStar = true;
         this.nodeGameOver.active = false;
         this.btnStar.node.active = false;
         this.reset();
     }
     gameOver(){
         this.isGameStar = false;
         this.nodeGameOver.active = true;
         this.btnStar.node.active = true;
     
     }
     //重置游戏状态
     reset(){
        this.nodeGameOver.active = false;
        this.btnStar.node.active = false;

        this.birdParent.x =50;
        this.birdParent.y = 280;
        this.speed = 0;

        this.score = 0;
        this.lbScore.string = '0';

        let pipeStarOffSetX:number = 200;
        this.pipeParent0.x = pipeStarOffSetX + 144;
        this.pipeParent1.x = pipeStarOffSetX + 288;
        this.pipeParent2.x = pipeStarOffSetX + 432;
     }
 }
