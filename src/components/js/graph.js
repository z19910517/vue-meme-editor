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
        this.rotating = false
        this.resizing = false
        this.type     = 'graph'
        this.fillstyle = 'black'
    }
    isHover(e){
        const {offsetX, offsetY} = e
        this.ctx.save()
        let hover = new Path2D()
        this.ctx.translate(this.x + this.w/2, this.y + this.h/2)
        this.ctx.rotate(this.rotateDeg * Math.PI / 180)
        hover.rect(-this.w/2, -this.h/2, this.w, this.h)
        let rr = this.ctx.isPointInPath(hover,offsetX,offsetY)
        this.ctx.restore()
        return rr
    } 
    isOnRotate(e){
        const {offsetX, offsetY} = e
        this.ctx.save()
        let hover = new Path2D()
        this.ctx.translate(this.x + this.w/2, this.y + this.h/2)
        this.ctx.rotate(this.rotateDeg * Math.PI / 180)
        hover.rect(-8, -this.h/2-31, 16, 16)
        let rr = this.ctx.isPointInPath(hover,offsetX,offsetY)
        this.ctx.restore()
        return rr
    }
    moveGraph(e){
        const {offsetX, offsetY} = e
        if(this.dragPath === null){
            this.dragPath = {x : offsetX, y : offsetY}
        }
        this.x = this.x + (offsetX - this.dragPath.x)
        this.y = this.y + (offsetY - this.dragPath.y)
        this.dragPath.x = offsetX
        this.dragPath.y = offsetY
    }
    rotateGraph(e){
        const {offsetX, offsetY} = e
        let centerX = this.x + this.w/2
        let centerY = this.y + this.h/2

        const initDeg = Math.atan2(this.x+this.w/2-centerX,this.y-23-centerY) / Math.PI * 180
        const currentDeg = Math.atan2(offsetX-centerX,offsetY-centerY) / Math.PI * 180
        this.rotateDeg = initDeg - currentDeg
    }
    paintOnSelect(){
        this.ctx.save()
        this.ctx.translate(this.x + this.w/2, this.y + this.h/2)
        this.ctx.rotate(this.rotateDeg * Math.PI / 180)
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "gray"
        this.ctx.fillStyle = this.fillstyle
        this.ctx.beginPath()
        // draw border
        this.ctx.rect(-this.w/2,-this.h/2,this.w,this.h)
        // draw line to ratate
        this.ctx.moveTo(0, -this.h/2)
        this.ctx.lineTo(0, -this.h/2 - 15)
        this.ctx.stroke()
        // draw rotate arrow
        this.ctx.moveTo(-7, -this.h/2 - 22)
        this.ctx.lineTo(-11, -this.h/2 - 27)
        this.ctx.stroke()
        this.ctx.moveTo(-7, -this.h/2 - 22)
        this.ctx.lineTo(-3, -this.h/2 - 27)
        this.ctx.stroke()
        this.ctx.closePath()
        // draw rotate circle
        this.ctx.beginPath()
        this.ctx.arc(0, -this.h/2 -23, 8, 1*Math.PI, 0.75*Math.PI);
        this.ctx.stroke()
        this.ctx.lineWidth = 1 // undo lineWidth
        this.ctx.closePath()
        this.ctx.restore()
    }
    paint(){
        this.ctx.beginPath()
        this.ctx.fillRect(this.x,this.y,this.w,this.h)
        this.ctx.stroke()
        this.ctx.restore()
    }
    unSelectReset(){
        this.dragging = false
        this.rotating = false
        this.resizing = false
        this.dragPath = null
    }
}