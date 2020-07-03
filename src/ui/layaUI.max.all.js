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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameBgUI = /** @class */ (function (_super) {
        __extends(GameBgUI, _super);
        function GameBgUI() {
            return _super.call(this) || this;
        }
        GameBgUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameBgUI.uiView);
        };
        GameBgUI.uiView = { "type": "View", "props": { "y": 0, "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg1", "skin": "gameUI/background.png", "width": 720, "height": 1280 } }, { "type": "Image", "props": { "y": -1280, "x": 0, "var": "bg2", "skin": "gameUI/background.png", "width": 720, "height": 1280 } }] };
        return GameBgUI;
    }(View));
    ui.GameBgUI = GameBgUI;
})(ui || (ui = {}));
(function (ui) {
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI() {
            return _super.call(this) || this;
        }
        GameOverUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameOverUI.uiView);
        };
        GameOverUI.uiView = { "type": "Dialog", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "skin": "gameUI/background.png", "width": 720, "height": 1280, "x": 0, "y": 0 } }, { "type": "Image", "props": { "y": 799.7265625, "width": 320, "var": "btn_restart", "skin": "gameUI/again.png", "height": 65, "centerX": 0 }, "compId": 4 }, { "type": "Image", "props": { "y": 952, "width": 320, "var": "btn_end", "skin": "gameUI/gameover.png", "height": 65, "centerX": 0 } }, { "type": "Box", "props": { "y": 400, "width": 295, "height": 50, "centerX": 0 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 138, "text": "本局积分：", "height": 76, "fontSize": 36, "color": "#506173", "bold": true } }, { "type": "Label", "props": { "y": 0, "x": 169, "width": 97, "var": "score", "text": "label", "height": 34, "fontSize": 36, "color": "#506173", "bold": true }, "compId": 8 }] }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "y": [{ "value": 800, "tweenMethod": "bounceIn", "tween": true, "target": 4, "key": "y", "index": 0 }, { "value": 790, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "y", "index": 8 }] } }, { "target": 8, "keyframes": { "var": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 8, "key": "var", "index": 0 }] } }], "name": "ani_restart", "id": 1, "frameRate": 24, "action": 0 }] };
        return GameOverUI;
    }(Dialog));
    ui.GameOverUI = GameOverUI;
})(ui || (ui = {}));
(function (ui) {
    var GamePlayUI = /** @class */ (function (_super) {
        __extends(GamePlayUI, _super);
        function GamePlayUI() {
            return _super.call(this) || this;
        }
        GamePlayUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GamePlayUI.uiView);
        };
        GamePlayUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "visible": false, "skin": "gameUI/background.png", "height": 1280 } }, { "type": "Image", "props": { "y": 37, "x": 599, "width": 88, "var": "btn_pause", "skin": "gameUI/pause_nor.png", "height": 81 } }, { "type": "Box", "props": { "y": 60, "x": 51 }, "child": [{ "type": "Label", "props": { "width": 97, "text": "HP:", "height": 34, "fontSize": 30, "color": "#506173", "bold": true } }, { "type": "Label", "props": { "y": 0, "x": 58, "width": 97, "var": "hp", "text": "label", "height": 34, "fontSize": 30, "color": "#506173", "bold": true } }] }, { "type": "Box", "props": { "y": 60, "x": 193 }, "child": [{ "type": "Label", "props": { "width": 97, "text": "Level:", "height": 34, "fontSize": 30, "color": "#506173", "bold": true } }, { "type": "Label", "props": { "y": 0, "x": 98, "width": 97, "var": "level", "text": "label", "height": 34, "fontSize": 30, "color": "#506173", "bold": true } }] }, { "type": "Box", "props": { "y": 60, "x": 378 }, "child": [{ "type": "Label", "props": { "width": 97, "text": "Score:", "height": 34, "fontSize": 30, "color": "#506173", "bold": true } }, { "type": "Label", "props": { "y": 0, "x": 102, "width": 97, "var": "score", "text": "label", "height": 34, "fontSize": 30, "color": "#506173", "bold": true } }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 720, "visible": false, "var": "pauseBox", "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -226, "x": -85, "width": 720, "skin": "gameUI/mask.png", "height": 1280, "centerY": 0, "centerX": 0, "alpha": 0.5 } }, { "type": "Image", "props": { "y": 356, "x": 209, "width": 100, "var": "btn_continue", "skin": "gameUI/resume_nor.png", "height": 100, "centerY": 0, "centerX": 0 } }] }] };
        return GamePlayUI;
    }(View));
    ui.GamePlayUI = GamePlayUI;
})(ui || (ui = {}));
(function (ui) {
    var GameStartUI = /** @class */ (function (_super) {
        __extends(GameStartUI, _super);
        function GameStartUI() {
            return _super.call(this) || this;
        }
        GameStartUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameStartUI.uiView);
        };
        GameStartUI.uiView = { "type": "Dialog", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "skin": "gameUI/background.png", "height": 1280 } }, { "type": "Image", "props": { "width": 100, "var": "btn_start", "skin": "gameUI/resume_nor.png", "height": 100, "centerY": 0, "centerX": 0 } }, { "type": "Label", "props": { "y": 488, "var": "loading", "text": "label", "fontSize": 30, "color": "#000000", "centerX": 0, "bold": true } }] };
        return GameStartUI;
    }(Dialog));
    ui.GameStartUI = GameStartUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map