<template>
  <div id="app">
    <div class="tags-header">
      <div class="tags-title">
        <span class="icon-price-tags" />
        Tags
      </div>
      <div class="tags-toolbar">
        <div class="tags-toolbar-button tags-toolbar-new" @click="showModal">
          <span class="icon-plus" />
          New
        </div>
        <div class="tags-toolbar-button tags-toolbar-new" @click="showTagTypesModal">
          <span class="icon-menu" />
          Tag Types
        </div>
      </div>
    </div>
    <TagsView />
    <Modal v-if="modalVisible"/>
  </div>
</template>

<script>
import TagsView from './components/TagsView.vue'
import Modal from './components/Modal';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    TagsView,
    Modal
  },
  computed: {
    ...mapState([
        "modalVisible"
    ])
  },
  methods: {
    ...mapActions([
      'showModal'
    ]),
    showTagTypesModal() {
      
    }
  }
}
</script>

<style lang="less">
@import "assets/styles/styles.less";

body {
  background-color: #F5F5F5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #343332;
  margin: 60px auto;
  width: 80%;
}
.tags-header {
  display: flex;
  border-bottom: 1px solid #D2D2D2;
  padding-bottom: 5px;

  .tags-title {
    flex: 1;
    text-transform: uppercase;
    font-size: 1.5em;
    line-height: 43px;

    .icon-price-tags {
      font-size: 16px;
      margin-right: 10px;
    }
  }

  .tags-toolbar {
    display: flex;

    .tags-toolbar-button {
      text-align: center;
      margin: 0 5px;

      .icon-plus, .icon-menu {
        display: block;
        font-size: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
