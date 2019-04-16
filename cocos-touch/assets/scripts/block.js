import colors from 'colors';


cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel: cc.Label,
  
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
   
    start () {
      
    },

    setNumber (number) {
        if (number == 0) {
            this.numberLabel.node.active = false;
        }
        // this.numberLabel.string = number;
        if (number in colors) {
            this.node.color = colors[number];
 
          
         }
    },
    onbtn(){  
       
            // this.node.color=color[512];
            // this.swarpcolor();
       
        //    if(this.node.color==color[512]){
        //     this.node.color=color[0];
        //    }else{
        //     this.node.color=color[512];
        //    }
   
        
     
    },
    swarpcolor(){
        let temp = colors[512];
        colors[512] = colors[0];
        colors[0] = temp;   
    }
   
  

    // update (dt) {},
});
