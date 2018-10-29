<template>
    <div :class="['card', 'suit-' + card.suit, 'rank-' + card.rank, {facedown}]" @click="$emit('tap')" :draggable="draggable" @dragstart="$emit('mydrag', card)">
        <span class="title up" v-html="html"></span>
        <span class="rank-sign">{{suit}}</span>
        <span class="title down" v-html="html"></span>
    </div>
</template>
    
<script lang="ts">
import Vue from 'vue';
import { Card as MCard, cardStr, suitStr, rankStr } from '@/Card';

export default Vue.component('card', {
  props: {
    card: { required: true },
    draggable: Boolean,
    facedown: Boolean
  },
  computed: {
    str: function() {
      return cardStr(this.card);
    },
    suit: function() {
      return suitStr(this.card.suit);
    },
    html: function() {
      return (
        `<span class="suit">${suitStr(this.card.suit)}</span>` +
        `<span class="rank">${rankStr(this.card.rank)}</span>`
      );
    }
  }
});
</script>

<style>
.card {
  width: 50px;
  height: 70px;
  border: thin solid #333;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  background: white;
  text-align: center;
  position: relative;
}

.card.facedown {
  text-indent: -1000px;
  background-color: #978;
}

.suit-hearts,
.suit-tiles {
  color: red;
}

.card .title {
  font-size: 12px;
  position: absolute;
}

.card .title.up {
  top: 0;
  left: 0;
}

.card .title.down {
  bottom: 0;
  right: 0;
}

.card .rank-sign {
  font-size: 30px;
}

.suit {
  font-size: 120%;
  line-height: 70%;
}
</style>