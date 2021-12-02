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
        <ActionTodo
          :index="index"
          :item="item"
          v-on:hapus_items="hapus_items"
          v-on:edit="edit"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import TodoService from "./../../services/todoServices";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ActionTodo from "../ActionTodo.vue";
export default {
  name: "ListTodo",
  components: {
    Loading,
    ActionTodo,
  },
  data() {
    return {
      isLoading: false,
      todox:[]
    };
  },
  computed: {
    async todox() {
       
    },
  },

  methods: {
    async hapus_items(id) {
      var process = confirm("Apakah anda yakin?");
      if (process) {
        this.isLoading = true;
        await TodoService.deleteDocs(this.$store.state.list_key[id]).then(
          (val) => (this.isLoading = false)
        );
      } else {
        console.log("cancel");
      }
    },
    async edit(index) {
      this.$store.state.list_data[index].isChecked =
        !this.$store.state.list_data[index].isChecked;
      if (this.$store.state.list_data[index].isChecked) {
        var temp = this.$store.state.list_data[index];
        this.newTodo = temp.title;
        this.priority = temp.isImportant;
        this.index = index;
        this.isUpdate = true;
      } else {
        this.newTodo = "";
        this.priority = false;
        this.isUpdate = false;
        this.index = 0;
      }
    },
  },
  async mounted(){
      var temp=[]
      var data=  await TodoService.getAllTodosCondition("isChecked")
      data.forEach((doc) => {
            temp.push(doc.data())
        });
        this.todox=temp
       //console.log(data)

  }
};
</script>
