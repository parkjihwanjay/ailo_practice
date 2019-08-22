<template>
  <div class="list_box">
    <div class="list" v-for="(list, Bindex) in lists" :key="Bindex">
      <span
        class="list"
        v-for="(block, Sindex) in list"
        :key="(Bindex, Sindex)"
        @dbclick="click(Bindex, Sindex)"
        :class="{'clickon' : lists[Bindex][Sindex].status === 'clickon'}"
      >{{Bindex}}, {{Sindex}}</span>
    </div>

    <!-- <input type="text" v-if="list.status === 'clickon' " v-model="list.memo" />
    <img
      @click="trash(Bindex, Sindex)"
      class="trash_img"
      v-if="list.status === 'clickon'"
      src="https://www.flaticon.com/premium-icon/icons/svg/484/484662.svg"
    />-->
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
      this.lists[i] = new Array();
      for (let y = 0; y < 10; y++) {
        this.lists[i].push({ status: "not_click" });
      }
    }

    // console.log(this.lists);
  },
  methods: {
    click: function(Bindex, Sindex) {
      console.log(Bindex, Sindex);
      if (this.lists[Bindex][Sindex].status === "not_click") {
        this.lists[Bindex][Sindex].status = "clickon";
      } else {
        this.lists[Bindex][Sindex].status = "not_click";
      }

      if (this.lists[Bindex][Sindex].memo !== "")
        this.lists[Bindex][Sindex].memo = "";
      // console.log(this.lists[index]);
    },
    trash: function(Bindex, Sindex) {
      this.lists[Bindex][Sindex].status = "not_click";
      this.lists[Bindex][Sindex].memo = "";
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
.flex {
  display: flex;
}
</style>

