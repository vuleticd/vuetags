<template>
  <div class="modal">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="modalVisible"
        class="modal-overlay"
      />
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-if="modalVisible"
        class="modal-content"
        @click.self="hideModal"
      >
        <div class="modal-innerContent">
          <div class="modal-header">
              <button type="button" class="close" @click="hideModal()">
                  <span>&times;</span>
              </button>
              <span class="modal-title">Tag</span>
          </div>
          <div class="modal-body">
              <div class="form-field">
                <label class="form-label" for="name">Name*</label>
                <input type="text" class="form-input" name="name" v-model="name" /> 
              </div>
              <div class="form-field row">
                <input type="checkbox" class="form-checkbox" name="feed" v-model="feed" />
                <label class="form-label" for="feed">My feed</label>
                <input type="checkbox" class="form-checkbox" name="favourite" v-model="favourite" />
                <label class="form-label" for="favourite">My favourites</label>
              </div>
              <div class="form-field">
                <label class="form-label" for="type">Type</label>
                <select class="form-select" name="name" v-model="type">
                  <option v-for="(ctype, index) in types" :key="index" :value="ctype">
                    {{ctype}}
                  </option>
                </select> 
              </div>
              <div class="form-field">
                <label class="form-label" for="photo">Photo</label>
                <dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-complete="afterUpload" />
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="modal-footer-button cancel" @click="hideModal()">Cancel</button>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="saveTag()">Save</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'Modal',
  components: {
    dropzone: vue2Dropzone
  },
  data () {
    return {
      id: null,
      name: '',
      feed: false,
      favourite: false,
      type: '',
      photo: '',
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: null,
          thumbnailHeight: null,
          init: function () {
              this.on('thumbnail', function() {
                  var thumbs = document.querySelectorAll('.dz-image');
                  [].forEach.call(thumbs, function (thumb) {
                      var img = thumb.querySelector('img');
                      if (img) {
                          img.setAttribute('width', '100%');
                          img.setAttribute('height', '120px');
                      }
                  });
              }),
              this.on('success', function() {
                  var thumbs = document.querySelectorAll('.dz-image');
                  [].forEach.call(thumbs, function (thumb) {
                      thumb.style = 'width: 100%; height: auto;';
                  });
              })
          }
      }
    };
  },
  computed: {
    ...mapState({
      modalVisible: "modalVisible",
      types: "types",
      modalTag: "modalTag"
    })
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === `Escape` && this.modalVisible) {
        this.hideModal();
      }
    };
    document.addEventListener(`keydown`, escapeHandler);
    this.$once(`hook:destroyed`, () => {
      document.removeEventListener(`keydown`, escapeHandler);
    });
  },
  mounted () {
    if (this.modalTag) {
      this.id = this.modalTag.id;
      this.name = this.modalTag.name;
      this.feed = this.modalTag.feed;
      this.favourite = this.modalTag.favourite;
      this.type = this.modalTag.type;
      this.photo = this.modalTag.photo;
    }        
  },
  methods: {
    ...mapActions([
      'hideModal',
      'updateTag',
      'addTag'
    ]),
    afterUpload(file) {
      this.photo = file.dataURL;
    }  ,
    saveTag() {
      let tag = {
        id: this.id,
        name: this.name,
        feed: this.feed,
        favourite: this.favourite,
        type: this.type,
        photo: this.photo,
      };

      if (this.id) {
        this.updateTag(tag);
      } else {
        this.addTag(tag);
      }
      this.hideModal();
    }  
  }
}
</script>

<style scoped lang="less">
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999999990;
  background-color: #222;
  opacity: 0.8;
}
.modal-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999999991;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-innerContent {
    width: 50%;
    height: 70%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
    background-color: #FFFFFF;
    position:relative;
    color: #777777;
    text-align: left;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);

    .modal-header {
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 20px;

      button.close {
        position: absolute;
        right: 0;
        top: 0;
        border: 0;
        background: transparent;
        font-size: 20px;
        color: #d7d7d7;
        cursor: pointer;
      }
    }

    .modal-body {
      background-color: #F5F5F5;
      border-bottom: 1px solid #EFEFEF;
      border-top: 1px solid #EFEFEF;
      padding: 10px 30px;

      .form-field {
        display: flex;
        flex-direction: column;
        margin: 10px 0;

        &.row {
          flex-direction: row;
        }

        .form-select, .form-input {
          padding: 5px;
        }
      }
    }
  }
}

.modal-innerContent a {
  color: #ffffff;
}
.modal-close {
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  top: -12.5px;
  right: -12.5px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 1.5em;
  cursor: pointer;
}
.modal-button {
  border: 1px solid #ffffff;
  padding: 10px 20px;
  margin:10px 0;
  border-radius: 20px;
  cursor: pointer;
  display: table;
}
.modal-info-link {
  text-decoration: underline;
  font-size: 0.9em;
  cursor: pointer;
}
.animated {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
.fadeOut {
  animation-name: fadeOut;
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
.fadeInUp {
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
.fadeOutDown {
  animation-name: fadeOutDown;
  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>
