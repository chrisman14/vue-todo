<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <ul>
      <li v-for="(item, index) in todox" :key="index">
        <ActionTodo :index="index" :item="item" v-on:hapus_items="hapus_items" v-on:edit="edit" 
      v-on:updateCheck="updateChecks"/>
      </li>
    </ul>
  </div>
</template>
<script>
import TodoService from "./../services/todoServices";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ActionTodo from "./ActionTodo.vue";
export default {
  name: "ListTodo",
  components: {
    Loading,
    ActionTodo,
  },
  data() {
    return {
      isLoading:false
    };
  },

  methods: {
    async hapus_items(id) {
      var process = confirm("Apakah anda yakin?");
      if (process) {
        this.isLoading=true
        await TodoService.deleteDocs(this.$store.state.list_key[id]).then(val=>this.isLoading=false);
      } else {
        console.log("cancel");
      }
    },
    updateChecks: async function (val_check,id) {
       var data = { isChecked: !val_check};
      
      
     await TodoService.updateChecks(this.$store.state.list_key[id],data).then(val=>this.isLoading=false);
    },
    async edit(index) {
      this.$emit("update", index);
    },
  },
  computed: {
    todox() {
      return this.$store.state.list_data;
    },
  },
};
</script>
