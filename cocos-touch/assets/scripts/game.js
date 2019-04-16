const ROWS = 6;  // 行数
// const NUMBERS = [2, 4];
let co = 512;
let coo = 0;

cc.Class({
    extends: cc.Component,

    properties: {
       scoreLabel:cc.Label,
       scorel:0,
       blockPrefab:cc.Prefab,
       gap:20,
       bg:cc.Node,
       sss:cc.Node,
    },
    start () {
        
         this.drawBgBlocks();
         this.init(); 
         this.addEventHandler();
    
       
    },
    
    drawBgBlocks() {
        this.blockSize = (cc.winSize.width - this.gap * (ROWS + 1)) / ROWS;
        let x = this.gap + this.blockSize / 2;
        let y = this.blockSize   + this.gap;


              
        this.positions = [];
        for (let i = 0; i < ROWS ; ++i) {
            this.positions.push([0, 0, 0, 0]);
            for (let j = 0; j < ROWS; ++j) {
                let block = cc.instantiate(this.blockPrefab);
                block.width = this.blockSize;
                block.height = this.blockSize;
                this.bg.addChild(block);
                block.setPosition(cc.v2(x, y));
                this.positions[i][j] = cc.v2(x, y);
                x += this.gap + this.blockSize;
                block.getComponent('block').setNumber(0);
            }
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize / 2;
        }
        cc.debug.setDisplayStats(false);
    },
  
    init() {
        this.updateScore(0);

        if (this.blocks) {
            for (let i = 0; i < this.blocks.length; ++i) {
                for (let j = 0; j < this.blocks[i].length; ++j) {
                    if (this.blocks[i][j] != null) {
                        this.blocks[i][j].destroy();
                    }
                }
            }
        }

        // this.data = [];
        this.blocks = [];
        for (let i = 0; i < ROWS; ++i) {
            this.blocks.push([null, null, null, null,null,null]);
            // this.data.push([0, 0, 0, 0]);
        }

        this.addBlock();
        this.addBlock();
        this.addBlock();
        this.addBlock();
        
    },
    updateScore(number) {
        this.scorel = number;
        this.scoreLabel.string = '分数：' + number;
    },

    getEmptyLocations() {
        let locations = [];
        for (let i = 0; i < this.blocks.length; ++i) {
            for (let j = 0; j < this.blocks[i].length; ++j) {
                if (this.blocks[i][j] == null) {
                    locations.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        return locations;
    },
    addBlock() {
        let locations = this.getEmptyLocations();
        if (locations.length == 0) return false;
        let location = locations[Math.floor(Math.random() * locations.length)];
        let x = location.x;
        let y = location.y;
        let position = this.positions[x][y];
        let block = cc.instantiate(this.blockPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        block.setPosition(position);
        // let number = NUMBERS[Math.floor(cc.random0To1() * NUMBERS.length)];
        block.getComponent('block').setNumber(512);
        this.blocks[x][y] = block;


        
        // this.data[x][y] = number;
        return true;
    },

   


 
     change(q,d){
        this.blockSize = (cc.winSize.width - this.gap * (ROWS + 1)) / ROWS;
        let x = this.gap + this.blockSize / 2;
        let y = this.blockSize  + this.gap;

        this.pos = [];
        for (let i = 0; i < ROWS ; ++i) {
            this.pos.push([0, 0, 0, 0,0,0]);
            for (let j = 0; j < ROWS; ++j) {
                this.pos[i][j] = cc.v2(x, y);
                x += this.gap + this.blockSize; 
            }
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize / 2;
        }
      
        this.blocks = [];
        for (let i = 0; i < ROWS; ++i) {
            this.blocks.push([null, null, null, null,null,null]);  
        }
        let position = this.pos[q][d];
        let block = cc.instantiate(this.blockPrefab);
        this.bg.addChild(block); 
        block.getComponent('block').setNumber(co);
        block.setPosition(position);
        this.blocks[q][d]=block;
        
         this.swcolor();
     },
       swcolor(){
        let tem = co;
        co = coo;
        coo = tem;
       
       },






     changeall(a,b){
        if(a==0&&b==0){this.swcolor();this.change(a+1,b);this.swcolor();this.change(a,b+1);this.swcolor();this.change(a,b);this.swcolor();}
            else  if(a==0&&b==ROWS-1){this.swcolor();this.change(a+1,b);this.swcolor();this.change(a,b-1);this.swcolor();this.change(a,b);this.swcolor();}
            else  if(a==ROWS-1&&b==0){this.swcolor();this.change(a-1,b);this.swcolor();this.change(a,b+1);this.swcolor();this.change(a,b);this.swcolor();}
            else  if(a==ROWS-1&&b==ROWS-1){this.swcolor();this.change(a-1,b);this.swcolor();this.change(a,b-1);this.swcolor();this.change(a,b);this.swcolor();}
                else  if(a==0&&b>0&&b<ROWS-1){
                    this.swcolor();
                    this.change(a,b);this.swcolor();
                    this.change(a+1,b);this.swcolor();
                    this.change(a,b+1);this.swcolor();
                    this.change(a,b-1); this.swcolor();
                }
                else  if(b==0&&a>0&&a<ROWS-1){
                    this.swcolor();
                    this.change(a+1,b);this.swcolor();
                    this.change(a,b+1);this.swcolor();
                    this.change(a-1,b);this.swcolor();
                    this.change(a,b);this.swcolor();
                }
                else  if(a==ROWS-1&&b>0&&b<ROWS-1){
                    this.swcolor();
                    this.change(a,b+1);this.swcolor();
                    this.change(a,b-1);this.swcolor();
                    this.change(a-1,b);this.swcolor();
                    this.change(a,b);this.swcolor();
                }
                else  if(b==ROWS-1&&a>0&&a<ROWS-1){
                    this.swcolor();
                    this.change(a+1,b);this.swcolor();
                    this.change(a,b-1);this.swcolor();
                    this.change(a-1,b);this.swcolor();
                    this.change(a,b);this.swcolor();
                }
                else {
                    this.swcolor();
                    this.change(a,b);this.swcolor();
                    this.change(a+1,b);this.swcolor();
                    this.change(a-1,b);this.swcolor();
                    this.change(a,b+1);this.swcolor();
                    this.change(a,b-1);this.swcolor();
                }
     },
     addEventHandler() {
        this.sss.on('touchstart', (event) => {
            this.startPoint = event.getLocation();
            let m = this.startPoint.x;
            let n = this.startPoint.y;
            
            // console.log(m,n);
            this.blockSize = (cc.winSize.width - this.gap * (ROWS + 1)) / ROWS;
            let x = this.gap; 
            let y = this.blockSize / 2 + this.gap;
            // this.pos = [];
            for (let i = 0; i < ROWS ; ++i) {
                // this.pos.push([0, 0, 0, 0,0,0]);
                for (let j = 0; j < ROWS; ++j) {
                    // this.pos[i][j] = cc.v2(x, y);
                    x += this.gap + this.blockSize; 

                  if(m>20&&m<20+this.blockSize&&n<y+this.blockSize&&n>y){
                    // console.log(x,x+this.blockSize,y,y+this.blockSize)
                    
                    this.changeall(i,0);
                    
                    //   return;
                  }

                  else  if(m<x+this.blockSize&&m>x&&n<y+this.blockSize&&n>y){
                        // console.log(x,x+this.blockSize,y,y+this.blockSize)
                        let a = i;
                        let b = j;


                        this.changeall(a,b+1);
                        
                        // return;
                    }


                    

                }
                y += this.gap + this.blockSize;
                x = this.gap ;               
            }  
            this.gameover();       
        });

        this.sss.on('touchend', (event) => {
            this.swcolor();
            
        });
          
     
    },
    gameover(){
       
       
       console.log('game over')
        

        }
    
   
    
});
