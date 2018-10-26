<template>
    <div :class="['stack', count, open ? 'open' : 'closed', {facedown}]" @click="$emit('tap')">
      <template v-if="open">
        <Card v-for="(card, i) in reverse" :key="cardStr(card)" :card="card" :facedown="facedown || facedowns > i" :style="{top: 15 * i + 'px'}" :class="{top: top == card}"></Card>
      </template>
      <template v-else>
        <Card v-if="count != 'zero'" :card="top" :facedown="facedown" class="top"></Card>
      </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card';
import { cardStr } from '@/Card';

export default Vue.component('stack', {
  components: {
    Card
  },
  props: {
    cards: { type: Array, default: () => [] },
    facedown: Boolean,
    open: Boolean,
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
.stack {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 70px;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: thin solid transparent;
}

.stack.many.closed {
  border: thin solid #333;
}

.stack.facedown.many {
  background-color: #978;
}

.stack.zero {
  border: thin dotted #333;
}

.stack.selected .card.top {
  background: #eee;
}

.stack .card {
  position: absolute;
}

.stack.many.closed .card {
  top: 5px;
  left: 5px;
}
</style>