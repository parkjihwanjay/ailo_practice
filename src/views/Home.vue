<template>
  <div>
    <ul>
      <li>
        <router-link to="List">List</router-link>
      </li>
      <li>
        <router-link to="Basic">Basic</router-link>
      </li>
      <li>
        <router-link to="Dday">Dday</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import List from "../components/List";
import Basic from "../components/Basic";
import Dday from "../components/Dday"

export default {
  components: {
    List,
    Basic
  }
};
</script>
