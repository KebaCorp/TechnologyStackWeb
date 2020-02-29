<template>
  <v-badge
    right
    overlap
    color="grey"
    style="width: 100%;"
  >

    <!--Switcher-->
    <template v-slot:badge>
      <v-icon
        v-if="toolbar"
        dark
        class="cursor-pointer"
        @click="toggleToolbar"
      >
        mdi-chevron-up
      </v-icon>
      <v-icon
        v-else
        dark
        class="cursor-pointer"
        @click="toggleToolbar"
      >
        mdi-chevron-down
      </v-icon>
    </template>

    <!--Editor-->
    <div v-show="toolbar">
      <quill-editor
        v-if="toolbar"
        :content="value"
        :options="fullOption"
        @change="onEditorChange($event)"
      />
    </div>
    <div v-show="!toolbar">
      <quill-editor
        v-if="!toolbar"
        :content="value"
        :options="shortOption"
        @change="onEditorChange($event)"
      />
    </div>

  </v-badge>
</template>

<script>
import { Quill, quillEditor } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import Emoji from 'quill-emoji'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill-emoji/dist/quill-emoji.css'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/emoji', Emoji)

/**
 * Загрузка флага тулбара редактора из локального хранилища.
 *
 * @returns {boolean}
 */
const getContentEditorToolbar = () => {
  try {
    const toolbar = JSON.parse(localStorage.getItem('contentEditorToolbar'))

    return toolbar === null ? true : !!toolbar
  } catch (e) {
    return true
  }
}

const contentEditorToolbar = getContentEditorToolbar()

export default {
  name: 'ContentEditor',
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fullOption () {
      return {
        placeholder: this.$t('quillEditor.placeholder'),
        theme: 'snow',
        modules: {
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true,
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          imageDrop: true
        }
      }
    },
    shortOption () {
      return {
        placeholder: this.$t('quillEditor.placeholder'),
        theme: 'snow',
        modules: {
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true,
          toolbar: false,
          imageDrop: true
        }
      }
    }
  },
  data: () => ({
    toolbar: contentEditorToolbar
  }),
  methods: {
    /**
     * Content change.
     *
     * @param html
     * @param text
     */
    onEditorChange ({ html, text }) {
      this.$emit('onChange', {
        value: html,
        text
      })
    },

    /**
     * Switch editor toolbar.
     */
    toggleToolbar () {
      this.toolbar = !this.toolbar
      localStorage.setItem('contentEditorToolbar', JSON.stringify(this.toolbar))
    }
  }
}
</script>

<style>

</style>
