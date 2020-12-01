// import Graph from "./Graph";

import Graph from './graph.js'
export default class Text extends Graph{
    constructor(ctx, x, y, w, h, text){
        super(ctx, x, y, w, h)
        this.type = 'text'
        this.fontParm = {
            fontText    :  text,
            fontStyle   : 'normal',
            fontVariant : 'normal',
            fontWeight  : 'normal',
            fontSize    :  50,
            fontFamily  : 'Verdana',
        }
        this.fontDeck = {
            fontColor   : 'white',
            strokeColor : 'black',
            lineWidth   :  4,
            shadowBlur  :  10,
            shadowColor : 'black'
        }
        this.font = `${this.fontParm.fontStyle} ${this.fontParm.fontVariant} ${this.fontParm.fontWeight} ${this.fontParm.fontSize}px ${this.fontParm.fontFamily}` 
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
            this.font = `${v.fontStyle} ${v.fontVariant} ${v.fontWeight} ${v.fontSize}px ${v.fontFamily}`
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
        if(this.fontDeck.lineWidth !== 0){
            this.ctx.shadowColor = this.fontDeck.shadowColor
            this.ctx.shadowBlur = this.fontDeck.shadowBlur
            this.ctx.strokeText(this.fontParm.fontText,-this.w/2,this.fontParm.fontSize/2 * 0.75);
        }
        this.ctx.shadowBlur = 0
        this.ctx.fillText(this.fontParm.fontText,-this.w/2,this.fontParm.fontSize/2 * 0.75);

        this.w = this.ctx.measureText(this.fontParm.fontText).width
        this.h = this.fontParm.fontSize
        this.ctx.restore()
    }

    getFontParm(){
        return this.fontParm
    }
}