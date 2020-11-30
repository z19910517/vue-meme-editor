// import Graph from "./Graph";

import Graph from './graph.js'
export default class Text extends Graph{
    constructor(ctx, x, y, w, h, text){
        super(ctx, x, y, w, h)
        this.text = text
        this.fontsize = 50
        this.fontBorder = 0
        this.fontStyle = 'Verdana'
        this.strokeStyle = 'black'
        this.font = '900 ' + this.fontsize + 'px ' + this.fontStyle
        this.initFontStyleList()
    }
    paint(){
        this.ctx.save()
        this.ctx.translate(this.x + this.w/2, this.y + this.h/2)
        this.ctx.rotate(this.rotateDeg * Math.PI / 180)
        this.ctx.font = this.font
        this.ctx.fillStyle = this.fillstyle
        this.ctx.strokeStyle = this.strokeStyle
        this.ctx.lineWidth = this.fontBorder
        this.ctx.fillText(this.text,-this.w/2,this.fontsize/2 * 0.8);
        if(this.fontBorder !== 0){
            this.ctx.strokeText(this.text,-this.w/2,this.fontsize/2 * 0.8);
        }
        this.ctx.restore()
    }
    fontResize(size=null){
        if(size !== null){
            this.fontsize = size
        }
        if(this.fontsize <= 1){
            this.fontsize = 1
        }
        if(this.fontsize >= 100){
            this.fontsize = 100
        }
        this.ctx.save()
        this.font = `900 ${this.fontsize}px ${this.fontStyle}`
        this.ctx.font = this.font
        this.w = this.ctx.measureText(this.text).width
        this.h = this.fontsize
        this.ctx.restore()
    }
    changeFontStyle(fontStyle){
        this.fontStyle = fontStyle
        this.font = '900 ' + this.fontsize + 'px ' + this.fontStyle
        this.ctx.save()
        this.ctx.font = this.font
        this.w = this.ctx.measureText(this.text).width
        this.h = this.fontsize
        this.ctx.restore()
    }
    initFontStyleList(){
        this.fontList = [
            'Verdana',
            'Lucida Sans',
            'Lucida Grande',
            'Tahoma',
            'Georgia',
            'Palatino',
            'Palatino Linotype',
            'Book Antiqua',
            'Andika',
            'Helvetica',
            'Arial',
            'Calibri',
            'Trebuchet MS',
            'Century Gothic',
            'Bookman Old Style',
            'Cambria',
            'Candara',
            'Garamond',
            'Times New Roman',
            'Brush Script MT',
            'Microsoft YaHei',
            'serif SimSun',
            'cursive SimSun',
            'sans-serif SimSun',
            'fantasy SimSun',
            'monospace SimSun',
            'SimSun',
            'Apple LiSung Light'
        ]
    }

}