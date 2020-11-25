export default class Graph {
    constructor(ctx, x, y, w, h){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.zIndex = 0
        this.rotateDeg = 0
        this.initDeg = 0
        this.controlPathList = []
        this.dragPath = null
        this.dragging = false
        this.fillstyle = 'black'
    }
    isHover(offsetX, offsetY){
        return (this.x          <= offsetX &&
                this.x + this.w >= offsetX &&
                this.y          <= offsetY &&
                this.y + this.h >= offsetY)
    }
    moveGraph(offsetX, offsetY){
        if(this.dragPath === null){
            this.dragPath = {x : offsetX, y : offsetY}
        }
        this.x = this.x + (offsetX - this.dragPath.x)
        this.y = this.y + (offsetY - this.dragPath.y)
        this.dragPath.x = offsetX
        this.dragPath.y = offsetY
    }
    paintHover(){
        this.ctx.fillStyle = this.fillstyle
        this.ctx.beginPath()
        this.ctx.rect(this.x,this.y,this.w,this.h)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    paint(){
        this.ctx.beginPath()
        this.ctx.fillRect(this.x,this.y,this.w,this.h)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    changeColor(color){
        this.fillstyle = color
    }
}