import ImageEditor from './ImageEditor.vue'

ImageEditor.install = function (Vue) {
    Vue.component('meme-editor', ImageEditor)
}

export default ImageEditor