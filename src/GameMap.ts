class GameMap extends ui.GameBgUI {
    constructor()  {
        super();
    }
    updateMap(): void  {
        this.bg1.y += 1;
        this.bg2.y += 1;
        if (this.bg1.y >= 1280)  {
            this.bg1.y -= 1280 * 2;
        }
        if (this.bg2.y >= 1280)  {
            this.bg2.y -= 1280 * 2;
        }
    }
}