import Graph from "./graph"
import Text from "./text"

export default class Canvas {
    constructor(canvas_ref, width=500, height=500){
        this.canvas = canvas_ref
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext('2d')
        this.pathList = []
        this.nowGraph = null
        this.background = null
        this.ctx.font = "50px Verdana"
    }
    addGraph(x=0,y=0,w=50,h=20){
        let graph = new Graph(this.ctx,x,y,w,h)
        this.pathList.push(graph)
        graph.paint(this.ctx)
    }
    addText(text="新增文字",x=0,y=0){
        let graph = new Text(this.ctx,x,y,this.ctx.measureText(text).width,50,text)
        this.pathList.push(graph)
        graph.paint()
    }



    mouseMove(e){
        if(this.nowGraph !== null){
            if(this.nowGraph.dragging){
                this.moveGraph(e)
            }else{
                this.scaleGraph()
            }
        }
    }
    moveGraph(e){
        const {offsetX, offsetY} = e
        this.nowGraph.moveGraph(offsetX, offsetY)
        this.rePaint()
        this.nowGraph.paintOnSelect()
    }
    scaleGraph(){
    }

    mouseLeave(){
        if(this.nowGraph !== null){
            this.nowGraph.dragging = false
        }
    }


    stopGraph(){
        if(this.nowGraph !== null){
            this.nowGraph.dragging = false
            this.nowGraph.dragPath = null
        }
    }

    rePaint(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if(this.background){
            this.ctx.drawImage(this.background,0,0,this.canvas.width,this.canvas.height)
        }
        for (const graph of this.pathList){
            graph.paint()   
        }
    }

    judgeIsPointInPath(e){
        const {offsetX, offsetY} = e
        this.rePaint()
        for(let i=this.pathList.length-1;i>=0;i--){
            const {x,y,w,h} = this.pathList[i]
            if(this.pathList[i].isHover(offsetX, offsetY)){
                this.ctx.beginPath()
                this.ctx.rect(x,y,w,h)
                this.ctx.stroke()
                this.ctx.closePath()
                this.nowGraph = this.pathList[i]
                this.nowGraph.dragging = true
                break
            }else{
                this.nowGraph = null
            }
        }
    }

    loadImg(img){
        this.background = img
        this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
    }

    changeText(text){
        this.nowGraph.text = text
        this.nowGraph.fontResize()
        this.rePaint()
    }
    fontResize(num){
        this.nowGraph.fontResize(num)
        this.rePaint()
    }
    changeColor(color){
        this.nowGraph.changeColor(color)
        this.rePaint()
    }
    changeFontBorder(size){
        this.nowGraph.fontBorder = size
        this.rePaint()
    }

}