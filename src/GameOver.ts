class GameOver extends ui.GameOverUI
{
    constructor()
    {
        super();
        this.btn_restart.on(Laya.Event.MOUSE_DOWN,this,this.onRestart);
    }
    private onRestart():void
    {
        //播放按钮动画
        this.ani_restart.play(0,false);
        //监听动画完成
        this.ani_restart.once(Laya.Event.COMPLETE,this,this.AniComplete);

    }
    private AniComplete():void
    {
        //发送重新开始事件，在main类中监听
        this.event("restart");
        //缓动动画关闭效果。IDE中页面为Dialog类型才可用
        this.close();
    }
}