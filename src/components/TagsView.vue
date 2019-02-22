<template>
  <div class="tags-container">
    <div class="tags-search">
      <label>Search:</label>
      <input type="text" v-model="filter.global" />
    </div>
    <div class="toolbar">
      <div class="cell id">
        <input @focus="hideBackground" @blur="showBackground" type="text" v-model="filter.id" />
      </div>
      <div class="cell name">
        <input @focus="hideBackground" @blur="showBackground" type="text" v-model="filter.name" />
      </div>
      <div class="cell type">
        <input @focus="hideBackground" @blur="showBackground" type="text" v-model="filter.type" />
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
      <div class="cell id center">Tag ID
        <span
          v-if="sorting.id !== 'desc'"
          @click="toggleSort('id', 'asc')"
          :class="['icon-play3', 'asc', {'active': sorting.id === 'asc'}]"/>
        <span
          v-if="sorting.id !== 'asc'"
          @click="toggleSort('id', 'desc')"
          :class="['icon-play3', 'desc', {'active': sorting.id === 'desc'}]"/>
      </div>
      <div class="cell name">
        Tag Name
        <span
          v-if="sorting.name !== 'desc'"
          @click="toggleSort('name', 'asc')"
          :class="['icon-play3', 'asc', {'active': sorting.name === 'asc'}]"/>
        <span
          v-if="sorting.name !== 'asc'"
          @click="toggleSort('name', 'desc')"
          :class="['icon-play3', 'desc', {'active': sorting.name === 'desc'}]"/>
      </div>
      <div class="cell type">
        Tag Type
        <span
          v-if="sorting.type !== 'desc'"
          @click="toggleSort('type', 'asc')"
          :class="['icon-play3', 'asc', {'active': sorting.type === 'asc'}]"/>
        <span
          v-if="sorting.type !== 'asc'"
          @click="toggleSort('type', 'desc')"
          :class="['icon-play3', 'desc', {'active': sorting.type === 'desc'}]"/>
      </div>
      <div class="cell feed center">
        My Feed
        <span
          v-if="sorting.feed !== 'desc'"
          @click="toggleSort('feed', 'asc')"
          :class="['icon-play3', 'asc', {'active': sorting.feed === 'asc'}]"/>
        <span
          v-if="sorting.feed !== 'asc'"
          @click="toggleSort('feed', 'desc')"
          :class="['icon-play3', 'desc', {'active': sorting.feed === 'desc'}]"/>
      </div>
      <div class="cell favourite center">
        My Favourites
        <span
          v-if="sorting.favourite !== 'desc'"
          @click="toggleSort('favourite', 'asc')"
          :class="['icon-play3', 'asc', {'active': sorting.favourite === 'asc'}]"/>
        <span
          v-if="sorting.favourite !== 'asc'"
          @click="toggleSort('favourite', 'desc')"
          :class="['icon-play3', 'desc', {'active': sorting.favourite === 'desc'}]"/>
      </div>
      <div class="cell actions center">Actions</div>
    </div>
    <div v-for="(tag, index) in currentPageTags" :key="tag.id" :class="['row', {'even': index % 2 == 0}]">
      <div class="cell id center">{{ tag.id }}</div>
      <div class="cell name">{{ tag.name }}</div>
      <div class="cell type">{{ tag.type }}</div>
      <div :class="['cell', 'feed', 'center', {'ok': tag.feed}]">
        <span v-if="tag.feed" class="icon-checkmark" />
      </div>
      <div :class="['cell', 'favourite', 'center', {'ok': tag.favourite}]">
        <span v-if="tag.favourite" class="icon-checkmark" />
      </div>
      <div class="cell actions center">
        <span class="icon-pencil" @click="showModal(tag.id)" />
        <span class="icon-cross" @click="deleteTag(tag.id)" />
      </div>
    </div>
    <div class="tags-pagination">
      <div class="tags-page-size">
        <span>Show</span>
        <select v-model="pageSize">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>entries</span>
      </div>
      <div class="tags-navigation">
        <div class="first" @click="goTo('first')"><span class="icon-first" /></div>
        <div class="previous" @click="goTo('previous')"><span class="icon-previous2" /></div>
        <div v-for="(pg, index) in getPagingRange" :key="index" :class="['page', {'current': pg === currentPage}]" @click="goTo(pg)">
          {{pg}}
        </div>
        <div class="next" @click="goTo('next')"><span class="icon-next2" /></div>
        <div class="last" @click="goTo('last')"><span class="icon-last" /></div>
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
      sorting: {},
      pageSize: 5,
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
      
      if (Object.keys(this.sorting).length) {
        collection = _.orderBy(collection, Object.keys(this.sorting), Object.values(this.sorting));
      }

      return collection;
    },
    numOfPages() {
        return Math.ceil(this.filteredTags.length / this.pageSize);
    },
    onFirstPage() {
        const n = this.filteredTags.length;
        return ((n <= this.pageSize) || (this.currentPage == 1));
    },
    onLastPage() {
        const n = this.filteredTags.length;
        return ((n <= this.pageSize) || (this.currentPage == this.numOfPages));
    },
    currentPageTags() {
      if(this.filteredTags.length <= this.pageSize) {
          return this.filteredTags;
      }
      if(this.onFirstPage) {
          return this.filteredTags.slice(0, this.pageSize);
      }
      if(this.onLastPage) {
          return this.filteredTags.slice(-this.pageSize);
      }

      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredTags.slice(start, start + this.pageSize);
    },
    getPagingRange({min = 1, length = 5} = {}) {
      if (length > this.numOfPages) length = this.numOfPages;

      let start = this.currentPage - Math.floor(length / 2);
      start = Math.max(start, min);
      start = Math.min(start, min + this.numOfPages - length);
     
      return Array.from({length: length}, (el, i) => start + i);
    }
  },
  methods: {
    ...mapActions([
      'showModal',
      'deleteTag'
    ]),
    goTo(page) {
      switch(page) {
        case 'first':
          this.currentPage = 1;
          break;
        case 'next':
          this.currentPage++;
          if (this.currentPage > this.numOfPages) {
            this.currentPage = this.numOfPages;
          }
          break;
        case 'previous':
          this.currentPage--;
          if (this.currentPage < 1) {
            this.currentPage = 1;
          }
          break;
        case 'last':
          this.currentPage = this.numOfPages;
          break;
        default:
          this.currentPage = page;
          break;
      }
    },
    hideBackground(event) {
      event.target.className  = 'clicked';
    },
    showBackground(event) {
      event.target.className  = '';
    },
    toggleSort(field, order) {
      if (this.sorting[field] === order) {
        // delete this.sorting[field];
        this.$delete(this.sorting, field);
      } else {
        this.$set(this.sorting, field, order);
      }
    }
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
    border-right: 0;
    flex: 1;
    padding: 6px;
    background-color: #ffffff;
    display: flex;

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
      border-right: 1px solid #d2d2d2;
    }
  }

  .toolbar {
    display: flex;

    .actions {
      background-color: #EBEAE5;
    }

    input, select {
      width: 100%;
      padding: 0;
      border: 0;
      outline: none;
      overflow: hidden;
    }

    input {
      background-image: url("../assets/search.png");
      background-repeat: no-repeat;
      background-position: top right;
      background-size: contain;

      &.clicked {
        background-image: none;
      }
    }
  }

  .header {
    display: flex;
    background-color: #ffffff;

    .cell {
      border-top: 0;
      position: relative;

      &.center {
        align-content: center;
        justify-content: center;
        text-align: center;
        align-items: center;
      }

      & span {
        display: block;
        font-size: 13px;
        color: #DCDCDC;
        cursor: pointer;
        position: absolute;
        right: 0;

        &:hover {
          color: inherit;
        }

        &.asc {
          transform: rotate(-90deg);
          top: 4px;
        }

        &.desc {
          transform: rotate(90deg);
          top: 15px;
        }

        &.active {
          color: #7A80DE;
        }
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

  & .tags-pagination {
    display: flex;
    padding: 10px 0;

    & .tags-page-size {
      flex: 1;

      & select {
        margin: 0 5px;
        padding: 6px;
        border: 1px solid #d2d2d2;
        outline: none;
      }
    }

    & .tags-navigation {
      display:flex;

      & div {
        margin: 0 2px;
        padding: 6px 0;
        background-color: #ffffff;
        cursor: pointer;
        width: 29px;
        text-align: center;

        &:hover {
          background-color: #DDDDDD;
        }

        &.current {
          background-color: #DDDDDD;
        }
      }
    }
  }
}
</style>
