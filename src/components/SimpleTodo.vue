<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :loader="'dots'"
      :is-full-page="fullPage"
    ></loading>
    <h1>Simple Todo</h1>
    <input type="text" v-model="newTodo" />
    <button v-if="!isUpdate" @click="addTodoItem">Tambah</button>
    <button v-else @click="updateData">Update</button>
    <br />
    <span v-if="newTodo == ''" style="color: red">Tidak boleh kosong</span>
    <br />
    <input type="checkbox" name="" id="" v-model="priority" /><label
      >Penting</label
    >
    <br />
    <router-link to="/">All</router-link>
    <router-link to="/Complete">Complete</router-link>
    <router-link to="/important">Important</router-link>
    <router-link to="/deleted">Delete</router-link>
    <hr />
    <p></p>

    <router-view></router-view>
  </div>
</template>
<script>
import TodoService from "./../services/todoServices";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import ListTodo from "./ListTodo.vue";
export default {
  name: "SimpleTodo",
  components: {
    ListTodo,
    Loading,
  },
  data() {
    return {
      newTodo: "",
      isLoading: false,
      //todos: [],
      priority: false,
      index: 0,
      isUpdate: false,
    };
  },
  methods: {
    updateData: async function () {
      this.isLoading = true;
      var data = { title: this.newTodo, isImportant: this.priority };
      await TodoService.updateData(
        this.$store.state.list_key[this.index],
        data
      ).then((val) => (this.isLoading = false));

      this.newTodo = "";
      this.priority = false;
      this.isUpdate = false;
    },

    addTodoItem: async function () {
      if (this.newTodo != "") {
        this.isLoading = true;
        const todo = this.newTodo;

        await TodoService.addDataTodos(todo, false, this.priority).then(
          (val) => (this.isLoading = false)
        );

        this.newTodo = "";
        this.priority = false;
      } else {
        alert("No Data");
      }
    },
    edit_Todo: async function (index) {
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
  async beforeMount() {
    await TodoService.getRealtimeData();
    //   try {
    //     // await TodoService.getRealtimeData()
    //     //var data = await TodoService.getAllTodos();
    //     await TodoService.getRealtimeData().then((value) => {

    //       this.todos=[]
    //       value.forEach((items) => {
    //         const item = items.data();
    //         this.todos.push(item);
    //       });
    //     });
    //   } catch (e) {
    //     console.log("error" + e);
    //   }
    // this.todos=this.$store.getCurrentList()
  },
};
</script>