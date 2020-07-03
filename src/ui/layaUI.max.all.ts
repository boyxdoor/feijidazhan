
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameBgUI extends View {
		public bg1:Laya.Image;
		public bg2:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg1","skin":"gameUI/background.png","width":720,"height":1280}},{"type":"Image","props":{"y":-1280,"x":0,"var":"bg2","skin":"gameUI/background.png","width":720,"height":1280}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameBgUI.uiView);

        }

    }
}

module ui {
    export class GameOverUI extends Dialog {
		public ani_restart:Laya.FrameAnimation;
		public btn_restart:Laya.Image;
		public btn_end:Laya.Image;
		public score:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"gameUI/background.png","width":720,"height":1280,"x":0,"y":0}},{"type":"Image","props":{"y":799.7265625,"width":320,"var":"btn_restart","skin":"gameUI/again.png","height":65,"centerX":0},"compId":4},{"type":"Image","props":{"y":952,"width":320,"var":"btn_end","skin":"gameUI/gameover.png","height":65,"centerX":0}},{"type":"Box","props":{"y":400,"width":295,"height":50,"centerX":0},"child":[{"type":"Label","props":{"y":0,"x":0,"width":138,"text":"本局积分：","height":76,"fontSize":36,"color":"#506173","bold":true}},{"type":"Label","props":{"y":0,"x":169,"width":97,"var":"score","text":"label","height":34,"fontSize":36,"color":"#506173","bold":true},"compId":8}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":800,"tweenMethod":"bounceIn","tween":true,"target":4,"key":"y","index":0},{"value":790,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":8}]}},{"target":8,"keyframes":{"var":[{"value":"","tweenMethod":"linearNone","tween":false,"target":8,"key":"var","index":0}]}}],"name":"ani_restart","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameOverUI.uiView);

        }

    }
}

module ui {
    export class GamePlayUI extends View {
		public btn_pause:Laya.Image;
		public hp:Laya.Label;
		public level:Laya.Label;
		public score:Laya.Label;
		public pauseBox:Laya.Box;
		public btn_continue:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"visible":false,"skin":"gameUI/background.png","height":1280}},{"type":"Image","props":{"y":37,"x":599,"width":88,"var":"btn_pause","skin":"gameUI/pause_nor.png","height":81}},{"type":"Box","props":{"y":60,"x":51},"child":[{"type":"Label","props":{"width":97,"text":"HP:","height":34,"fontSize":30,"color":"#506173","bold":true}},{"type":"Label","props":{"y":0,"x":58,"width":97,"var":"hp","text":"label","height":34,"fontSize":30,"color":"#506173","bold":true}}]},{"type":"Box","props":{"y":60,"x":193},"child":[{"type":"Label","props":{"width":97,"text":"Level:","height":34,"fontSize":30,"color":"#506173","bold":true}},{"type":"Label","props":{"y":0,"x":98,"width":97,"var":"level","text":"label","height":34,"fontSize":30,"color":"#506173","bold":true}}]},{"type":"Box","props":{"y":60,"x":378},"child":[{"type":"Label","props":{"width":97,"text":"Score:","height":34,"fontSize":30,"color":"#506173","bold":true}},{"type":"Label","props":{"y":0,"x":102,"width":97,"var":"score","text":"label","height":34,"fontSize":30,"color":"#506173","bold":true}}]},{"type":"Box","props":{"y":0,"x":0,"width":720,"visible":false,"var":"pauseBox","height":1280},"child":[{"type":"Image","props":{"y":-226,"x":-85,"width":720,"skin":"gameUI/mask.png","height":1280,"centerY":0,"centerX":0,"alpha":0.5}},{"type":"Image","props":{"y":356,"x":209,"width":100,"var":"btn_continue","skin":"gameUI/resume_nor.png","height":100,"centerY":0,"centerX":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GamePlayUI.uiView);

        }

    }
}

module ui {
    export class GameStartUI extends Dialog {
		public btn_start:Laya.Image;
		public loading:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"gameUI/background.png","height":1280}},{"type":"Image","props":{"width":100,"var":"btn_start","skin":"gameUI/resume_nor.png","height":100,"centerY":0,"centerX":0}},{"type":"Label","props":{"y":488,"var":"loading","text":"label","fontSize":30,"color":"#000000","centerX":0,"bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameStartUI.uiView);

        }

    }
}
