<template>
    <div id="image-editor">
        

        <div id="text-tool">

        </div>
        <div id="section-canvas">
            <canvas @mousedown="selectGraph" @mousemove="mouseMove" @mouseup="stopGraph" @mouseleave="stopGraph" ref="canvas"></canvas>
            <img v-if="backgroundImage" v-show="false" :src="backgroundImage" ref="img">
        </div>
        <div v-show="textTool">
            <select v-model="font.family" @change="changeFontFamily">
                <option
                    v-for="item in grop.fontFamily"
                    :key="item.style" 
                    :value="item.style"
                    :style="`font-family:${item.style}`"
                >
                    {{item.name}}
                </option>
            </select>
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
                <button @click="changeFontBorder(0)">無邊框</button>
                <button @click="changeFontBorder(4)">邊框小</button>
                <button @click="changeFontBorder(10)">邊框大</button>
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
            <div>
                <button @click="changeFontShadow(10)">有陰影</button>
                <button @click="changeFontShadow(0)">無陰影</button>
            </div>
                        <div>
                <button
                    v-for="color in grop.graphColor" 
                    :key="color"
                    :style="`background-color:${color}`"
                    @click="changeFontShadowColor(color)"
                    class="btn-color"
                >
                </button>
            </div>


            



        </div>
        <input type="file" id="file-uploader" data-target="file-uploader" accept="image/*" @change="uploadImage">
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
import Canvas from './js/ClassCanvas.js'
export default {
	name:"ImageEditor",
	data(){
		return{
            ctx:null,
            textTool:false,
            grop: graphOption,
            backgroundImage: null,
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
        uploadImage(e){
            const image = e.target.files[0]
            if(image){
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = e => {
                    this.backgroundImage = e.target.result
                }
            }else{
                this.backgroundImag = null
            }

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
        },
        changeFontShadow(num){
            this.ctx.changeFont(true, 'shadowBlur', num)
        },
        changeFontShadowColor(color){
            this.ctx.changeFont(true, 'shadowColor', color)
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
#text-tool{

}
</style>