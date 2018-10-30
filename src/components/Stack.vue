<template>
    <div :class="['stack', count, {facedown}]" @click="$emit('tap')" @dragover.prevent @drop="$emit('drop')">
      <Card v-if="count != 'zero'" :card="top" :facedown="facedown" class="top"
        :draggable="draggable"
        @mydrag="$emit('mydrag', {card: $event, i: 0})"></Card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue';
import { cardStr } from '@/Card';

export default Vue.component('stack', {
  components: {
    Card
  },
  props: {
    cards: { type: Array, default: () => [] },
    facedown: Boolean,
    draggable: Boolean,
  },
  computed: {
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
    cardStr,
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

.stack.many {
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

.stack.many .card {
  top: 5px;
  left: 5px;
}
</style>