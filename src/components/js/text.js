// import Graph from "./Graph";

import Graph from './graph.js'
export default class Text extends Graph{
    constructor(ctx, x, y, w, h, text){
        super(ctx, x, y, w, h)
        this.fontParm = {
            fontText    =  text,
            fontStyle   = 'normal',
            fontVariant = 'normal',
            fontWeight  = 'normal',
            fontSize    =  50,
            fontFamily  = 'Verdana',
        }
        this.fontDeck = {
            fontColor   = 'white',
            strokeColor = 'black',
            lineWidth   =  1,
        }
        this.font = `${v.fontStyle} ${v.fontVariant} ${v.fontWeight} ${fontSize}px ${fontFamily}` 
    }
    changeFont(isDec, key, value){
        if(isDec){
            this.fontDeck[key] = value
        }else{
            if(key === 'fontSize'){
                this.fontSize <= 1 ? 1   : this.fontSize
                this.fontSize >= 1 ? 100 : this.fontSize
            }else{
                this.fontParm[key] = value
                if(key === 'fontText'){return}
            }
            const v = this.fontParm
            this.font = `${v.fontStyle} ${v.fontVariant} ${v.fontWeight} ${fontSize}px ${fontFamily}`
        } 
    }

    paint(){
        this.ctx.save()
        this.ctx.translate(this.x + this.w/2, this.y + this.h/2)
        this.ctx.rotate(this.rotateDeg * Math.PI / 180)
        this.ctx.font        = this.font
        this.ctx.fillStyle   = this.fontDeck.fontColor
        this.ctx.strokeStyle = this.fontDeck.strokeColor
        this.ctx.lineWidth   = this.fontDeck.lineWidth
        this.ctx.fillText(this.text,-this.w/2,this.fontsize/2 * 0.8);
        if(this.fontBorder !== 0){
            this.ctx.strokeText(this.text,-this.w/2,this.fontsize/2 * 0.8);
        }
        this.ctx.restore()
    }
}