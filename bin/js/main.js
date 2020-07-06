var WebGL = Laya.WebGL;
var Loader = Laya.Loader;
var Handler = Laya.Handler;
var Stage = Laya.Stage;
// 程序入口
var Main = /** @class */ (function () {
    function Main() {
        //游戏中的数值
        this.level = 1;
        this.score = 0;
        //敌机属性表
        this.hps = [1, 6, 15];
        this.nums = [2, 1, 1];
        this.speeds = [3, 2, 1];
        this.radius = [20, 35, 80];
        //主角死后游戏结束延迟计时器，每一帧增加1，延迟100帧则自增100次
        this.deathTime = 0;
        //游戏关卡提升属性
        /***敌人刷新加速****/
        this.createTime = 0;
        /***敌人速度提升***/
        this.speedUp = 0;
        /***敌人血量提升    ***/
        this.hpUp = 0;
        /***敌人数量提升    ***/
        this.numUp = 0;
        /***升级等级所需的成绩数量***/
        this.levelUpScore = 10;
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
        //重置关卡数据
        //游戏关卡数
        this.level = 1;
        //玩家得分
        this.score = 0;
        //敌人刷新加速
        this.createTime = 0;
        //敌人速度提升
        this.speedUp = 0;
        //敌人血量提升    
        this.hpUp = 0;
        //敌人数量提升                
        this.numUp = 0;
        //升级等级所需的成绩数量
        this.levelUpScore = 10;
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
        //初始化主角
        this.hero.init("hero", 10, 0, 30, 0);
        //Role类中定义角色死亡后会隐藏角色，重新开始后需显示
        this.hero.visible = true;
        //主角位置修改
        this.hero.pos(360, 800);
        //角色加载到角色层
        this.roleLayer.addChild(this.hero);
        //监听MOUSE_DOWN
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        //如果是拖拽模式，不用检测MOUSE_UP
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        //Laya.timer.once(30000, this, this.gameOver);
        Laya.timer.frameLoop(1, this, this.loop);
    };
    //更新主循环
    Main.prototype.loop = function () {
        //地图滚动、更新
        this.map.updateMap();
        //本局游戏数据更新
        this.play.update(this.hero.hp, this.level, this.score);
        //如果主角死亡
        if (this.hero.hp <= 0) {
            //玩家飞机死亡后延迟时间，50帧后弹出游戏结束界面
            this.deathTime++;
            if (this.deathTime >= 50) {
                this.deathTime = 0;
                this.gameOver();
                //后续逻辑不执行，已没有角色层做碰撞检测了
                return;
            }
        }
        else {
            //主角射击
            this.hero.shoot();
            //游戏升级
            this.levelUp();
        }
        //遍历所有飞机，更改飞机状态,游戏碰撞逻辑
        for (var i = this.roleLayer.numChildren - 1; i >= 0; i--) {
            //获取第一个角色
            var role = this.roleLayer.getChildAt(i);
            //角色自身更新
            role.update();
            //如果角色死亡，下一循环
            if (role.hp <= 0)
                continue;
            //碰撞检测
            for (var j = i - 1; j >= 0; j--) {
                //获取第二个角色
                var role1 = this.roleLayer.getChildAt(j);
                //如果role1未死亡且不同阵营
                if (role1.hp > 0 && role1.camp != role.camp) {
                    //获取碰撞半径
                    var hitRadius = role.hitRadius + role1.hitRadius;
                    //碰撞检测
                    if (Math.abs(role.x - role1.x) < hitRadius &&
                        Math.abs(role.y - role1.y) < hitRadius) {
                        //如果某一个碰撞体是道具，则吃道具，否则掉血
                        if (role.propType != 0 || role1.propType != 0) {
                            //无法判断哪个是道具，可以相互吃吃
                            role.eatProp(role1);
                            role1.eatProp(role);
                        }
                        else {
                            //互相掉血
                            role.lostHp(1);
                            role1.lostHp(1);
                        }
                    }
                }
            }
        }
        //创建敌机，不同类型飞机创建的间隔时间不一样
        //生成小敌机
        if (0 == Laya.timer.currFrame % 80) {
            this.createEnemy(0, this.hps[0], this.speeds[0] + this.speedUp, this.nums[0] + this.numUp);
        }
        //创建中型敌机
        if (0 == Laya.timer.currFrame % 160) {
            this.createEnemy(1, this.hps[1] + this.hpUp * 2, this.speeds[1] + this.speedUp, this.nums[1] + this.numUp);
        }
        //创建BOSS敌机
        if (0 == Laya.timer.currFrame % 500) {
            this.createEnemy(2, this.hps[2] + this.hpUp * 6, this.speeds[2] + this.speedUp, this.nums[2]);
        }
    };
    Main.prototype.gameOver = function () {
        //移除所有舞台事件，鼠标控制
        Laya.stage.offAll();
        //移除地图背景
        this.map.removeSelf();
        //移除游戏中UI
        this.play.removeSelf();
        //清空角色层子对象
        this.roleLayer.removeChildren(0, this.roleLayer.numChildren - 1);
        //移除角色层
        this.roleLayer.removeSelf();
        //去除游戏主循环
        Laya.timer.clear(this, this.loop);
        //实例化游戏结束页面
        this.over = this.over || new GameOver();
        this.over.score.text = this.score.toString();
        this.over.popup();
        //重新开始事件监听
        this.over.on("restart", this, this.gameInit);
    };
    /**
        游戏升级计算
        */
    Main.prototype.levelUp = function () {
        if (this.score > this.levelUpScore) {
            //关卡等级提升
            this.level++;
            //角色血量增加，最大30
            this.hero.hp = Math.min(this.hero.hp + this.level * 1, 30);
            //关卡越高，创建敌机间隔越短
            this.createTime = this.level < 30 ? this.level * 2 : 60;
            //关卡越高，敌机飞行速度越高
            this.speedUp = Math.floor(this.level / 3);
            //关卡越高，敌机血量越高
            this.hpUp = Math.floor(this.level / 4);
            //关卡越高，敌机数量越多
            this.numUp = Math.floor(this.level / 5);
            //提高下一级的升级分数
            this.levelUpScore += this.level * 10;
        }
    };
    //创建敌机方法
    Main.prototype.createEnemy = function (index, hp, speed, num) {
        for (var i = 0; i < num; i++) {
            //对象池
            var enemy = Laya.Pool.getItemByClass("role", Role);
            //初始化角色类型，血量和速度
            enemy.init("enemy" + (index + 1), hp, speed, this.radius[index], 1);
            //从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示
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
            this.hero.startDrag(dragRegion, true, 100);
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
        //更新本帧的移动坐标，记录之后正常跟随鼠标移动
        this.moveX = Laya.stage.mouseX;
        this.moveY = Laya.stage.mouseY;
    };
    Main.prototype.onMouseUp = function () {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    return Main;
}());
var $main = new Main();
//# sourceMappingURL=main.js.map