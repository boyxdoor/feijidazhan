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
        _this.roleAni = new Laya.Animation();
        //加载IDE编辑的动画文件
        _this.roleAni.loadAnimation("GameRole.ani");
        return _this;
    }
    Role.prototype.init = function (type, hp, speed) {
        this.type = type;
        this.hp = hp;
        this.speed = speed;
        this.addChild(this.roleAni);
        //播放默认飞行动画
        this.playAction("fly");
    };
    Role.prototype.playAction = function (action) {
        this.action = action;
        this.roleAni.play(0, true, this.type + "_" + action);
    };
    Role.prototype.update = function () {
        if (this.type == "hero") {
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
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map