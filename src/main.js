var WebGL = Laya.WebGL;
var Loader = Laya.Loader;
var Handler = Laya.Handler;
var Stage = Laya.Stage;
// 程序入口
var Main = /** @class */ (function () {
    function Main() {
        //游戏中的数值
        this.hp = 10;
        this.level = 1;
        this.score = 0;
        Laya.init(720, 1280, WebGL);
        Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
        Laya.loader.load(["res/atlas/gameUI.atlas", "gameUI/background.png"], Handler.create(this, this.gameStart));
    }
    Main.prototype.gameStart = function () {
        this.start = new GameStart();
        //以弹出方式打开，有缓动效果
        this.start.popup();
        //监听开始游戏开始按钮事件，点击后进入游戏
        this.start.btn_start.on(Laya.Event.MOUSE_UP, this, this.gameInit);
    };
    Main.prototype.gameInit = function () {
        //缓动动画关闭效果。IDE中页面为Dialog才可用
        this.start.close();
        //实例化地图背景页面
        this.map = this.map || new GameMap();
        Laya.stage.addChild(this.map);
        //实例化角色层
        this.roleLayer = this.roleLayer || new Laya.Sprite();
        Laya.stage.addChild(this.roleLayer);
        //实例化游戏中UI页面
        this.play = this.play || new GamePlay();
        Laya.stage.addChild(this.play);
        //实例化主角
        this.hero = this.hero || new Role();
        this.hero.init("hero", 10, 0);
        this.hero.pos(360, 800);
        //角色加载到角色层
        this.roleLayer.addChild(this.hero);
        //监听MOUSE_DOWN
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        //模拟游戏结束，设置时间延迟
        Laya.timer.once(30000, this, this.gameOver);
        Laya.timer.frameLoop(1, this, this.loop);
    };
    //场景每一帧y下移一格，记录当前游戏数值,防止主角越界
    Main.prototype.loop = function () {
        this.map.updateMap();
        this.play.update(this.hp, this.level, this.score);
        this.hero.update();
    };
    Main.prototype.gameOver = function () {
        Laya.stage.offAll();
        this.map.removeSelf();
        this.play.removeSelf();
        this.roleLayer.removeChildren(0, this.roleLayer.numChildren - 1);
        this.roleLayer.removeSelf();
        this.over = this.over || new GameOver();
        this.over.score.text = this.score.toString();
        this.over.popup();
        //重新开始事件监听
        this.over.on("restart", this, this.gameInit);
    };
    //创建敌机方法
    Main.prototype.createEnemy = function (index, hp, speed, num) {
        for (var i = 0; i < num; i++) {
            //对象池
            var enemy = Laya.Pool.getItemByClass("role", Role);
            enemy.init("enemy" + (index + 1), hp, speed);
            enemy.visible = true;
            //随机位置
            enemy.pos(Math.random() * (720 - 80) + 50, -Math.random() * 100);
            //添加到舞台上
            this.roleLayer.addChild(enemy);
        }
    };
    //使用鼠标移动侦听，会出现移动一点点距离飞机就飞到屏幕之外的情况，原因未明，可改用拖动
    /*
    private onMouseDown(): void {
        let dragRegion = new Laya.Rectangle(0, 0, 720, 1280);
        //鼠标按下开始拖拽
        this.hero.startDrag(dragRegion,true,100);
    }*/
    Main.prototype.onMouseDown = function () {
        this.moveX = Laya.stage.mouseX;
        this.moveY = Laya.stage.mouseY;
        //监听MOUSE_MOVE
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    Main.prototype.onMouseMove = function () {
        var xx = this.moveX - Laya.stage.mouseX;
        var yy = this.moveY - Laya.stage.mouseY;
        this.hero.x -= xx;
        this.hero.y -= yy;
    };
    Main.prototype.onMouseUp = function () {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=main.js.map