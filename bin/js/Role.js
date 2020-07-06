var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.hp = 0;
        _this.speed = 0;
        /***射击间隔 */
        _this.shootInterval = 300;
        /**下次射击时间 */
        _this.shootTime = 300;
        _this.isBullet = false;
        /**道具类型 0：飞机或子弹，1：子弹箱，2：血瓶 */
        _this.propType = 0;
        /**子弹级别（吃子弹道具后升级） */
        _this.bulletLevel = 0;
        /**同时射击子弹数量 */
        _this.shootNum = 1;
        /**子弹偏移位置 */
        _this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        _this.roleAni = new Laya.Animation();
        //加载IDE编辑的动画文件
        _this.roleAni.loadAnimation("GameRole.ani");
        return _this;
    }
    /**
     * 角色初始化
     * @param type 角色类型 “hero”:玩家飞机，“enemy”：敌人飞机、“bullet”：子弹、"bomb":道具
     * @param hp 血量
     * @param speed 速度
     * @param hitRadius 碰撞半径
     * @param camp 阵营
     */
    Role.prototype.init = function (type, hp, speed, hitRadius, camp) {
        this.type = type;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        this.camp = camp;
        this.bulletLevel = 0;
        this.shootNum = 1;
        this.shootInterval = 300;
        //对象基本都从对象池中创建，如果之前为子弹，不重新赋值的话不会播放死亡动画
        this.isBullet = false;
        //道具初始属性为0
        this.propType = 0;
        this.addChild(this.roleAni);
        //监听动画播放完成事件
        this.roleAni.on(Laya.Event.COMPLETE, this, this.onComplete);
        //播放默认飞行动画
        this.playAction("fly");
    };
    /***动画完成后回调方法***/
    Role.prototype.onComplete = function () {
        if (0 == this.roleAni.width) {
            var bounds = this.roleAni.getBounds();
            //角色宽高赋值
            this.roleAni.size(bounds.width, bounds.height);
        }
        //如果死亡动画播放完成
        if ("die" == this.action) {
            //update()中，隐藏后进行移除回收
            this.visible = false;
            //死亡后掉落道具
            this.lostProp();
        }
        //如果受伤，下一帧播放飞行动画
        else if ("hit" == this.action) {
            this.playAction("fly");
        }
    };
    Role.prototype.playAction = function (action) {
        this.action = action;
        this.roleAni.play(0, true, this.type + "_" + action);
    };
    Role.prototype.update = function () {
        //如果角色隐藏，角色消亡并回收
        if (!this.visible) {
            //主角不死亡回收，只隐藏，以免其他对象以主角回收对象创建，发生引用修改
            if (this.type != "hero")
                this.die();
            return;
        }
        //角色根据速度飞行
        this.y += this.speed;
        //如果移动到显示区域以外，则隐藏
        if (this.type != "hero" && (this.y > 1280 + 100 || this.y < -150)) {
            this.visible = false;
        }
        //主角边界检查
        if ("hero" == this.type) {
            if (this.x < this.roleAni.width / 2) {
                this.x = this.roleAni.width / 2;
            }
            else if (this.x > 720 - this.roleAni.width / 2) {
                this.x = 720 - this.roleAni.width / 2;
            }
            if (this.y < this.roleAni.height / 2) {
                this.y = this.roleAni.height / 2;
            }
            else if (this.y > 1280 - this.roleAni.height / 2) {
                this.y = 1280 - this.roleAni.height / 2;
            }
        }
    };
    /**
     * 角色吃到道具，加血或子弹
     * @param prop 道具类型
     */
    Role.prototype.eatProp = function (prop) {
        //如果调用者不是主角或prop不是道具类型，则返回
        if (this.type != "hero" || prop.propType == 0)
            return;
        //吃子弹箱
        if (prop.propType == 1) {
            //积分增加
            $main.score++;
            //子弹级别增加
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量限制在4个
            this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
        }
        else if (prop.propType == 2) {
            //血量增加
            this.hp += 2;
            $main.score++;
        }
        //道具死亡
        prop.hp = 0;
        //道具吃完后消失，下一帧回收
        prop.visible = false;
    };
    /**
     *角色射击，生成子弹
     */
    Role.prototype.shoot = function () {
        var time = Laya.Browser.now();
        if (time > this.shootTime) {
            //获得发射子弹的位置数组
            var pos = this.bulletPos[this.shootNum - 1];
            for (var i = 0; i < pos.length; i++) {
                //更新下次子弹射击时间
                this.shootTime = time + this.shootInterval;
                //从对象池里面创建一颗子弹
                var bullet = Laya.Pool.getItemByClass("role", Role);
                //初始化子弹，子弹阵营与发射者相同
                bullet.init("bullet1", 1, -10, 1, this.camp);
                //角色类型为子弹类型
                bullet.isBullet = true;
                //对象池中对象死亡时会被隐藏，重新显示
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x + pos[i], this.y - 80);
                //添加到角色层中
                this.parent.addChild(bullet);
            }
        }
    };
    /***角色死亡掉落物品 */
    Role.prototype.lostProp = function () {
        if (this.type != "enemy3")
            return;
        //从对象池里面创建一个道具
        var prop = Laya.Pool.getItemByClass("role", Role);
        //生成随即道具类型
        var r = Math.random();
        var num = (r < 0.7) ? 1 : 2;
        //重新初始化道具属性，阵营为敌方（能与主角发生碰撞）
        prop.init("bomb" + num, 1, 2, 30, 1);
        //道具类型
        prop.propType = num;
        //强制显示
        prop.visible = true;
        //生成的位置为死亡者位置
        prop.pos(this.x, this.y);
        //加载到父容器
        this.parent.addChild(prop);
    };
    //角色失血
    Role.prototype.lostHp = function (lostHP) {
        //减血
        this.hp -= lostHP;
        //根据血量判断是否死亡
        if (this.hp > 0) {
            //如果未死亡，则播放受击动画
            this.playAction("hit");
        }
        else { //若死亡
            //子弹无死亡动画
            if (this.isBullet) {
                //update()方法中，隐藏后回收
                this.visible = false;
            }
            else {
                //播放死亡动画
                this.playAction("die");
                //如果碰撞掉血死亡者不是角色和子弹
                if (this.type != "hero" && !this.isBullet) {
                    //增加游戏积分
                    $main.score++;
                }
            }
        }
    };
    Role.prototype.die = function () {
        //角色动画停止
        this.roleAni.stop();
        //去除所有动画监听
        this.roleAni.offAll();
        //从舞台移除
        this.removeSelf();
        //回收到对象池
        Laya.Pool.recover("role", this);
    };
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map