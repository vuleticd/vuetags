<template>
  <div class="tags-container">
    <div v-for="tag in tags" :key="tag.id" class="tag-row">
        <span>{{tag.id}}</span>
        <span>{{tag.name}}</span>
        <span>{{tag.feed}}</span>
        <span><img :src="tag.photo" /></span>
        <span @click="showModal(tag.id)">Edit</span>
        <span @click="deleteTag(tag.id)">Delete</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TagsView',
  computed: {
    ...mapState([
        "tags"
    ])
  },
  methods: {
    ...mapActions([
      'showModal',
      'deleteTag'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
