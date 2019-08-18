<template>
  <div>
    <div>다이어리 만들기</div>
    <div>섹션</div>
    <input type="checkbox" name="section1" v-model="basic_customizing.section[0].checked" />
    <label :for="basic_customizing.section[0]">{{basic_customizing.section[0].name}}</label>
    <br />
    <input type="checkbox" name="section2" v-model="basic_customizing.section[1].checked" />
    <label :for="basic_customizing.section[1]">{{basic_customizing.section[1].name}}</label>
    <br />
    <input type="checkbox" name="section3" v-model="basic_customizing.section[2].checked" />
    <label :for="basic_customizing.section[2]">{{basic_customizing.section[2].name}}</label>
    <br />
    <input type="checkbox" name="section4" v-model="basic_customizing.section[3].checked" />
    <label :for="basic_customizing.section[3]">{{basic_customizing.section[3].name}}</label>
    <br />
    <input type="checkbox" name="section5" v-model="basic_customizing.section[4].checked" />
    <label :for="basic_customizing.section[4]">{{basic_customizing.section[4].name}}</label>
    <br />

    <div>배열</div>
    <input type="radio" name="array" v-model="basic_customizing.array" value="M-D-M-D" />M-D-M-D
    <br />
    <input type="radio" name="array" v-model="basic_customizing.array" value="MM-DD" />MM-DD
    <br />

    <div>적용</div>
    <input type="date" v-model="basic_customizing.date_from" />부터
    <input type="date" v-model="basic_customizing.date_to" />까지
    <br />

    <div>Daily</div>
    <div>기본 구성</div>
    <input
      type="checkbox"
      name="basic_component"
      v-model="basic_customizing.basic_component[0].checked"
    />
    <label :for="basic_customizing.basic_component[0]">{{basic_customizing.basic_component[0].name}}</label>
    <br />
    <input
      type="checkbox"
      name="basic_component"
      v-model="basic_customizing.basic_component[1].checked"
    />
    <label :for="basic_customizing.basic_component[1]">{{basic_customizing.basic_component[1].name}}</label>
    <br />
    <input
      type="checkbox"
      name="basic_component"
      v-model="basic_customizing.basic_component[2].checked"
    />
    <label :for="basic_customizing.basic_component[2]">{{basic_customizing.basic_component[2].name}}</label>
    <br />
    <input
      type="checkbox"
      name="basic_component"
      v-model="basic_customizing.basic_component[3].checked"
    />
    <label :for="basic_customizing.basic_component[3]">{{basic_customizing.basic_component[3].name}}</label>
    <br />
    <input
      type="checkbox"
      name="basic_component"
      v-model="basic_customizing.basic_component[4].checked"
    />
    <label :for="basic_customizing.basic_component[4]">{{basic_customizing.basic_component[4].name}}</label>
    <br />

    <input type="button" value="적용하기" @click="show_basic_customizing" />
  </div>
</template>

<script>
export default {
  name: "Basic",
  data() {
    return {
      basic_customizing: {
        section: [
          {
            name: "Prologue",
            checked: true
          },
          {
            name: "Epilogue",
            checked: true
          },
          {
            name: "Yearly",
            checked: true
          },
          {
            name: "Monthly",
            checked: true
          },
          {
            name: "Daily",
            checked: true
          }
        ],
        array: "",
        date_from: "",
        date_to: "",
        basic_component: [
          {
            name: "24시간 플래너",
            checked: true
          },
          {
            name: "To-do-list",
            checked: true
          },
          {
            name: "일기",
            checked: true
          },
          {
            name: "포토앨범(2장)",
            checked: false
          },
          {
            name: "가계부",
            checked: false
          }
        ]
      }
    };
  },
  methods: {
    show_basic_customizing() {
      console.log(this.basic_customizing);
    }
  },
  watch: {
    "basic_customizing.date_to": function(date_to) {
      //   console.log(date_to);
      if (this.basic_customizing.date_from != "") {
        if (this.basic_customizing.date_from > date_to) {
          alert("시작 날짜가 끝나는 날짜보다 늦습니다. 다시 선택해주세요");
          this.basic_customizing.date_to = "";
        }
      } else {
        alert("시작 날짜를 선택해주세요");
      }
    },
    "basic_customizing.date_from": function(date_from) {
      console.log(date_from);
      if (this.basic_customizing.date_to != "") {
        if (this.basic_customizing.date_to < date_from) {
          alert("시작 날짜가 끝나는 날짜보다 늦습니다. 다시 선택해주세요");
          this.basic_customizing.date_from = "";
        }
      } else {
        alert("끝나는 날짜를 선택해주세요");
      }
    }
  }
};
</script>