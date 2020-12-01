<template>
    <div id="image-editor">
        
        <div id="section-canvas">
            <canvas @mousedown="selectGraph" @mousemove="mouseMove" @mouseup="stopGraph" @mouseleave="stopGraph" ref="canvas"></canvas>
            <img v-show="false" :src="require('@/assets/error0.jpg')" ref="img">
        </div>
        <div v-show="textTool">
            <input type="number" v-model="font.size" @input="changeFontSize" min="1" max="100">
            <input type="text" v-model="font.text" @input="changeFontText">  
            <div>
                <button
                    v-for="color in grop.graphColor" 
                    :key="color"
                    :style="`background-color:${color}`"
                    @click="changeFontColor(color)"
                    class="btn-color"
                >
                </button>
            </div>
            <div>
                <button
                    v-for="style in grop.fontStyle"
                    :key="style"
                    @click="changeFontStyle(style)"
                >
                {{style}}
                </button>
            </div>
            <div>
                <button
                    v-for="weight in grop.fontWeight"
                    :key="weight"
                    @click="changeFontWeight(weight)"
                >
                {{weight}}
                </button>
            </div>
            <div>
                <button variant="dark" @click="changeFontBorder(0)">無邊框</button>
                <button variant="dark" @click="changeFontBorder(4)">邊框小</button>
                <button variant="dark" @click="changeFontBorder(10)">邊框大</button>
            </div>
            <div>
                <button
                    v-for="color in grop.graphColor" 
                    :key="color"
                    :style="`background-color:${color}`"
                    @click="changeStrokeColor(color)"
                    class="btn-color"
                >
                </button>
            </div>
            
            <select v-model="font.family" @change="changeFontFamily">
                <option
                    v-for="item in grop.fontFamily['zh']"
                    :key="item.style" 
                    :value="item.style"
                >
                    {{item.name}}
                </option>
            </select>


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
import * as graphOption from './js/GraphOption'
import Canvas from './js/canvas.js'
export default {
	name:"ImageEditor",
	data(){
		return{
            ctx:null,
            textTool:false,
            grop: graphOption,
            font:{
                text: '',
                size: null,
                family: null,
            }
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
                if(this.ctx.nowGraph.type === 'text'){
                    const parm = this.ctx.nowGraph.getFontParm()
                    this.font.text   = parm.fontText
                    this.font.size   = parm.fontSize
                    this.font.family = parm.fontFamily
                    this.textTool = true
                }
            }else{
                this.textTool = false
            }    
        },
        mouseMove(e){
            this.ctx.mouseMove(e)
        },
        stopGraph(){
            this.ctx.stopGraph()
        },


        addText(){
            this.ctx.addText()
        },
        changeFontText(){
            this.ctx.changeFont(false, 'fontText', this.font.text)
        },
        changeFontSize(){
            this.ctx.changeFont(false, 'fontSize', this.font.size)
        },
        changeFontColor(color){
            this.ctx.changeFont(true, 'fontColor', color)
        },
        changeFontBorder(size){
            this.ctx.changeFont(true, 'lineWidth', size)
        },
        changeFontFamily(){
            console.log(this.font.family)
            this.ctx.changeFont(false, 'fontFamily', this.font.family)
        },
        changeFontWeight(weight){
            this.ctx.changeFont(false, 'fontWeight', weight)
        },
        changeFontStyle(style){
            this.ctx.changeFont(false, 'fontStyle', style)
        },
        changeStrokeColor(color){
            this.ctx.changeFont(true, 'strokeColor', color)
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
.btn-color{
    display: inline-flex;
    width: 20px;
    height: 20px;
    margin: 1px;
    border-radius: 3px;
    border-color: black;
    border-width: 1px;
}
</style>