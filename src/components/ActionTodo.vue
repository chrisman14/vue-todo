<template >
  <div
    class="pl-3 text-light"
    :class="[!item.isChecked ? 'bg-primary' : 'bg-success']"
  >
    <input
      type="checkbox"
      :value="item.title"
      v-model="item.isChecked"
      @click="updateCheckk(item.isChecked, index)"
    />
    <i v-if="item.isImportant" class="bi bi-star-fill"></i>{{ item.title }} (
    <timeago :datetime="item.itime" :auto-update="60"></timeago> )
    <div v-if="!item.isDeleted">
      <button @click="hapus_items(index)">
        <i class="bi bi-trash"></i>
      </button>
      <button @click="edit(index)">
        <i class="bi bi-pencil-fill"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { format, render, cancel, register } from "timeago.js";
export default {
  name: "ActionTodo",
  props: ["item", "index"],
  computed: {
    timeNow() {
      return format(this.item.itime, "en_US");
    },
  },
  methods: {
    hapus_items(index) {
      this.$emit("hapus_items", index);
    },
    edit(index) {
      this.$emit("edit", index);
    },
    updateCheckk(index, id) {
      this.$emit("updateCheck", index, id);
    },
  },
};
</script>