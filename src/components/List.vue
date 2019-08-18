<template>
  <div class="list_box">
    <div class="list" v-for="(list, index) in lists" :key="index">
      <div @dblclick="click(index)" :class="{'clickon' : list.status === 'clickon'}">{{index}}</div>
      <input type="text" v-if="list.status === 'clickon' " v-model="list.memo" />
      <img
        @click="trash(index)"
        class="trash_img"
        v-if="list.status === 'clickon'"
        src="https://www.flaticon.com/premium-icon/icons/svg/484/484662.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      lists: []
    };
  },
  created: function() {
    for (let i = 0; i < 24; i++) {
      this.lists.push({ status: "not_click" });
    }
    // console.log(this.lists);
  },
  methods: {
    click: function(index) {
      if (this.lists[index].status === "not_click") {
        this.lists[index].status = "clickon";
      } else {
        this.lists[index].status = "not_click";
      }

      if (this.lists[index].memo !== "") this.lists[index].memo = "";
      // console.log(this.lists[index]);
    },
    trash: function(index) {
      this.lists[index].status = "not_click";
      this.lists[index].memo = "";
    }
  }
};
</script>

<style>
.list_box {
  width: 80%;
  margin: 0 auto;
}
.list {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 10px;
}
.clickon {
  background-color: red;
}
.trash_img {
  width: 4%;
}
</style>

