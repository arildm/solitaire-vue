<template>
    <div :class="['lane', count]" @click="$emit('tap')"
        @dragover.prevent @drop="$emit('drop')">
    <Card v-for="(card, i) in reverse" :key="cardStr(card)" :card="card"
        :facedown="facedowns > i"
        :style="{top: 15 * i + 'px'}"
        :class="{top: top == card}"
        :draggable="facedowns <= i"
        @mydrag="$emit('mydrag', {card: $event, i: cards.length - i - 1})"></Card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue';
import { cardStr } from '@/Card';

export default Vue.component('lane', {
  components: { Card },
  props: {
    cards: { type: Array, default: () => [] },
    facedowns: { type: Number, default: 0 }
  },
  computed: {
    reverse: function() {
      const cards = [...this.cards];
      cards.reverse();
      return cards;
    },
    top: function() {
      return this.cards[0];
    },
    count: function() {
      return this.cards.length > 1
        ? 'many'
        : this.cards.length
          ? 'one'
          : 'zero';
    }
  },
  methods: {
    cardStr
  }
});
</script>

<style>
.lane {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 70px;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: thin solid transparent;
}

.lane.zero {
  border: thin dotted #333;
}

.lane.selected .card.top {
  background: #eee;
}

.lane .card {
  position: absolute;
}
</style>
