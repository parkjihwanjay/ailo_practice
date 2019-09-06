<template>
  <div>
    <div>다이어리 만들기</div>
    <div>섹션</div>

    <div v-for="section in basic_customizing.section" :key="section.name">
      <input type="checkbox" :name="section.name" v-model="section.checked" />
      <label :for="section">{{section.name}}</label>
    </div>

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

    <div v-for="element in basic_customizing.basic_component" :key="element.name">
      <input type="checkbox" :name="element.name" v-model="element.checked" />
      <label :for="element.name">{{element.name}}</label>
    </div>

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
      // console.log(date_from);
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

