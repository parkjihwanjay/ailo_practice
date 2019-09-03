<template>
  <div>
    <table>
      <tr>
        <th v-for="minitue in minitues" :key="minitue">{{minitue}}</th>
      </tr>
      
        <tr v-for="(one_hour, hindex) in one_day_planner" :key=hindex>
          {{hindex}}
          <td @mousedown="mouseDown(hindex, mindex)" @mouseup="mouseUp(hindex, mindex)"
              class="border" 
              v-for="(ten_minute, mindex) in one_hour"
              :id = ten_minute.id
              :key="(hindex, mindex)">
          </td>
        </tr>
    </table>

    <div v-for="(color, index) in color_index" :key=index>
      메모
      {{color}}
      <button @click="deleteColor(color)">삭제</button>
    </div>
  </div>
</template>

<script>

export default {
  data()
  {
    return {
      minitues : [
        '10',
        '20',
        '30',
        '40',
        '50',
        '60',
      ],
      hour : 22,
      one_day_planner : [],
      color : [],
      color_index : 0
    }
  },
  created : function(){
    for(let i=0; i<this.hour; i++)
    {
      this.one_day_planner[i] = new Array();
      for(let j=0; j<this.minitues.length; j++)
      {
        this.one_day_planner[i].push({
          'id' : `${i}_${j}`
          })
      }
    }
  },
  computed : {
    hours : function(){
      let hours = [];
      for(let i=8 ; i<=26; i++)
      {
        let j = i%12;
        let z;

        if(i===8)
          z = "AM" + i;
        else if(i===12)
          z = "PM" + i;
        else if(i===24)
          z = "AM" + i;
        else
          z = j;
        hours.push(z)
      }
      return hours;
    }
  },
  methods : {
    mouseDown(hindex, mindex){
      this.color.push({
        "start_index" : [hindex, mindex]
      })
    },
    mouseUp(hindex, mindex){
      this.color[this.color.length-1]['finish_index'] = [hindex, mindex]
      this.colorPlanner();
      
    },
    deleteColor(color_index)
    {   
      let elements = document.getElementsByClassName('colored_'+ color_index)
      // console.log(elements[0])
      for(let i=0; i<elements.length; i++)
      {
        elements[i].style.backgroundColor = 'white'
      }
    },
    colorPlanner()
    {
      this.color_index++; 
      let start_x = this.color[this.color.length-1]['start_index'][0]
      let start_y = this.color[this.color.length-1]['start_index'][1]

      let end_x = this.color[this.color.length-1]['finish_index'][0]
      let end_y = this.color[this.color.length-1]['finish_index'][1]

      while(1)
      {
        for(let i=start_y; i<=5; i++)
        {
          document.getElementById(start_x + '_' + i).style.backgroundColor = 'red';
          document.getElementById(start_x + '_' + i).className = 'colored_' + this.color_index;

          if(start_x === end_x && i === end_y)
            return;
        }
        start_y = 0;
        start_x++;
      }
    }
  }
}
</script>

<style>
tr td{
  border: 1px solid black;
  empty-cells: show;
  padding: 10px;
}

table{
  border-spacing: 0px;
}

.drag {
  background: red;
}
</style>