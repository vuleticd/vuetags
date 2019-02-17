<template>
  <div class="tags-container">
    <div class="tags-search">
      <label>Search:</label>
      <input type="text" v-model="filter.global" />
    </div>
    <div class="toolbar">
      <div class="cell id">
        <input type="text" v-model="filter.id" />
      </div>
      <div class="cell name">
        <input type="text" v-model="filter.name" />
      </div>
      <div class="cell type">
        <input type="text" v-model="filter.type" />
      </div>
      <div class="cell feed">
        <select v-model="filter.feed">
          <option value='2'>All</option>
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </select>
      </div>
      <div class="cell favourite">
        <select v-model="filter.favourite">
          <option value='2'>All</option>
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </select>
      </div>
      <div class="cell actions" />    
    </div>
    <div class="header">
      <div class="cell id center">Tag ID</div>
      <div class="cell name">Tag Name</div>
      <div class="cell type">Tag Type</div>
      <div class="cell feed center">My Feed</div>
      <div class="cell favourite center">My Favourites</div>
      <div class="cell actions center">Actions</div>
    </div>
    <div v-for="(tag, index) in filteredTags" :key="tag.id" :class="['row', {'even': index % 2 == 0}]">
      <div class="cell id center">{{ tag.id }}</div>
      <div class="cell name">{{ tag.name }}</div>
      <div class="cell type">{{ tag.type }}</div>
      <div :class="['cell', 'feed', 'center', {'ok': tag.feed}]" />
      <div :class="['cell', 'favourite', 'center', {'ok': tag.favourite}]" />
      <div class="cell actions center">
        <span class="icon-pencil" @click="showModal(tag.id)" />
        <span class="icon-cross" @click="deleteTag(tag.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import _ from 'lodash';

export default {
  name: 'TagsView',
  data(){
    return {
      filter: {
        global: '',
        id: '',
        name: '',
        type: '',
        feed: 2,
        favourite: 2
      },
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    ...mapState([
        "tags"
    ]),
    filteredTags() {
      let collection = this.tags;
      if (this.filter.global) {
        collection = _.filter(collection, item => `${_.toString(item.id)} ${item.name} ${item.type}`.indexOf(this.filter.global) > -1);
      }
      for (const prop of ['id', 'name', 'type']) {
        if (this.filter[prop]) {
          collection = _.filter(collection, item => _.toString(item[prop]).indexOf(this.filter[prop]) > -1);
        }
      }
      for (const prop of ['feed', 'favourite']) {
        if (this.filter[prop] != '2') {
          collection = _.filter(collection, [prop, !!+this.filter[prop]]);
        }
      }
      
      return collection;
    }
  },
  methods: {
    ...mapActions([
      'showModal',
      'deleteTag'
    ]),
  }
}
</script>

<style scoped lang="less">
.tags-container {
  padding: 20px 0;

  .tags-search {
    display: flex;
    flex-direction: column;
    padding: 10px 80% 10px 0;

    label {
      color: #858484;
    }
    input {
      border: 1px solid #d2d2d2;
      padding: 6px;
    }
  }

  .cell {
    border: 1px solid #d2d2d2;
    flex: 1;

    &.id {
      flex: 0.5;
    }

    &.name {
      flex: 2;
    }

    &.type {
      flex: 2;
    }

    &.feed {
      flex: 0.7;
    }

    &.favourite {
      flex: 0.7;
    }

    &.actions {
      flex: 0.5;
    }
  }

  .toolbar {
    display: flex;

    .actions {
      background-color: #EBEAE5;
    }

    input, select {
      width: 100%;
      padding: 6px;
    }
  }

  .header {
    display: flex;
    background-color: #ffffff;

    .cell {
      border-top: 0;
      padding: 6px 0;

      &.center {
        align-content: center;
        justify-content: center;
        text-align: center;
        align-items: center;
      }
    }
  }

  .row {
    display: flex;
    background-color: #ffffff;

    &.even {
      background-color: #F9F9F9;
    }

    .cell {
      border-top: 0;
      padding: 6px 0;

      &.center {
        align-content: center;
        justify-content: center;
        text-align: center;
        align-items: center;
      }

      &.actions {

        span {
          cursor:pointer;
        }
      }
    }
  }
}
</style>
