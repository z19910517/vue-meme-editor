<template>
    <div id="image-editor">
        
        <div id="section-canvas">
            <canvas @mousedown="selectGraph" @mousemove="moveGraph" @mouseup="stopGraph" ref="canvas"></canvas>
            <img v-show="false" :src="require('@/assets/error0.jpg')" ref="img">
        </div>
        <div v-show="textTool">
            <input type="number" v-model="fontsize" @input="fontResize()" min="1" max="100">
            <input type="text" v-model="text" @input="changeText">  
            <div>
                <button-group style="width:100%;">
                    <button variant="primary" @click="changeColor('#007BFF')">藍色</button>
                    <button variant="secondary" @click="changeColor('#6C757D')">灰色</button>
                    <button variant="success" @click="changeColor('#28A745')">綠色</button>
                    <button variant="danger" @click="changeColor('#DC3545')">紅色</button>
                    <button variant="warning" @click="changeColor('#FFC107')">黃色</button>
                    <button variant="info" @click="changeColor('#17A2B8')">青色</button>
                    <button variant="light" @click="changeColor('#F8F9FA')">白色</button>
                    <button variant="dark" @click="changeColor('#343A40')">黑色</button>
                </button-group>
            </div>
            <div>
                <button-group style="width:100%;">
                    <button variant="dark" @click="changeFontBorder(0)">無邊框</button>
                    <button variant="dark" @click="changeFontBorder(1)">邊框小</button>
                    <button variant="dark" @click="changeFontBorder(3)">邊框大</button>
                </button-group>
            </div>


        </div>
        <button class="btn" @click="loadImg">
            上傳圖片
        </button>
        <!-- <button class="btn" @click="addGraph">
            Add Graph
        </button> -->
        <button class="btn" @click="addText">
            新增文字
        </button>
    </div>
</template>

<script>
import Canvas from './js/canvas.js'
export default {
	name:"ImageEditor",
	data(){
		return{
            ctx:null,
            textTool:false,
            text:'',
            fontsize: null,
		}
    },
    methods:{
        loadImg(){
            this.ctx.loadImg(this.$refs.img)
        },
        addGraph(){
            this.ctx.addGraph()
        },
        selectGraph(e){
            this.ctx.judgeIsPointInPath(e)
            if(this.ctx.nowGraph){
                if(this.ctx.nowGraph.text){
                    this.textTool = true
                    this.text = this.ctx.nowGraph.text
                    this.fontsize = this.ctx.nowGraph.fontsize
                }
            }else{
                this.textTool = false
            }    
        },
        moveGraph(e){
            this.ctx.moveGraph(e)
        },
        stopGraph(){
            this.ctx.stopGraph()
        },
        addText(){
            this.ctx.addText()
        },
        changeText(){
            this.ctx.changeText(this.text)
        },
        fontResize(){
            this.ctx.fontResize(this.fontsize)
        },
        changeColor(color){
            this.ctx.changeColor(color)
        },
        changeFontBorder(size){
            this.ctx.changeFontBorder(size)
        }

    },
	mounted(){
        this.ctx = new Canvas(this.$refs.canvas)
	},
}
</script>

<style lang="css" scoped>
#section-canvas{
    margin:50px auto;
    border:solid 2px black;
    width:500px;
    height:500px;
}
.btn{
    display:block;
    width:200px;
    margin: 10px auto;
}
</style>