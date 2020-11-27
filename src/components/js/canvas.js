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
        graph.paint()
    }
    addText(text="新增文字",x=0,y=0){
        let graph = new Text(this.ctx,x,y,this.ctx.measureText(text).width,50,text)
        this.pathList.push(graph)
        graph.paint()
    }



    mouseMove(e){
        if(this.nowGraph !== null){
            let rePaint = false
            if(this.nowGraph.dragging){
                this.nowGraph.moveGraph(e)
                rePaint = true
            }else if(this.nowGraph.rotating){
                this.nowGraph.rotateGraph(e)
                rePaint = true
            }else if(this.nowGraph.resizing){
                // this.nowGraph.rotateGraph(e)
                rePaint = true
            }else{
                if(this.nowGraph.isOnRotate(e)){
                    this.canvas.style.cursor = 'pointer'
                }else{
                    this.canvas.style.cursor = 'default'
                }
            }

            if(rePaint){
                this.rePaint()
                this.nowGraph.paintOnSelect()
            }
        }
    }


    mouseLeave(){
        if(this.nowGraph !== null){
            this.nowGraph.dragging = false
            this.nowGraph.rotating = false
            this.nowGraph.resizing = false
        }
    }


    stopGraph(){
        if(this.nowGraph !== null){
            this.nowGraph.dragging = false
            this.nowGraph.rotating = false
            this.nowGraph.resizing = false
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
        this.rePaint()
        for(let i=this.pathList.length-1;i>=0;i--){
            if(this.pathList[i].isHover(e)){
                this.nowGraph = this.pathList[i]
                this.nowGraph.paintOnSelect()
                this.nowGraph.dragging = true
                break
            }else if(this.pathList[i].isOnRotate(e)){
                this.nowGraph.rotating = true
                this.nowGraph.paintOnSelect()
                break
            }
            else{
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
        this.nowGraph.paintOnSelect()
    }
    fontResize(num){
        this.nowGraph.fontResize(num)
        this.rePaint()
        this.nowGraph.paintOnSelect()
    }
    changeColor(color){
        this.nowGraph.changeColor(color)
        this.rePaint()
        this.nowGraph.paintOnSelect()
    }
    changeFontBorder(size){
        this.nowGraph.fontBorder = size
        this.rePaint()
        this.nowGraph.paintOnSelect()
    }

}