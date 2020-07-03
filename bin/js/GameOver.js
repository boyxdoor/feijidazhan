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
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.btn_restart.on(Laya.Event.MOUSE_DOWN, _this, _this.onRestart);
        return _this;
    }
    GameOver.prototype.onRestart = function () {
        //播放按钮动画
        this.ani_restart.play(0, false);
        //监听动画完成
        this.ani_restart.once(Laya.Event.COMPLETE, this, this.AniComplete);
    };
    GameOver.prototype.AniComplete = function () {
        //发送重新开始事件，在main类中监听
        this.event("restart");
        //缓动动画关闭效果。IDE中页面为Dialog类型才可用
        this.close();
    };
    return GameOver;
}(ui.GameOverUI));
//# sourceMappingURL=GameOver.js.map