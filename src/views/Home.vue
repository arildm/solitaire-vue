<template>
  <div id="table">
    <div id="chute">
      <Stack :cards="stacks.chute" @tap="tapChute" facedown></Stack>
    </div>
    <div id="grabs">
      <Stack :cards="stacks.grabs" @tap="select('grabs')" :class="{selected: drag == 'grabs'}" @mydrag="handleDrag($event, 'grabs')" draggable></Stack>
    </div>
    <div id="goals">
      <Stack v-for="id of goalIds" :cards="stacks[id]" :key="id" @tap="select(id)" :class="{selected: drag == id}" @drop="select(id)"></Stack>
    </div>
    <div id="lanes">
      <Lane v-for="id of laneIds" :cards="stacks[id]" :key="id" @tap="select(id)" :class="{selected: drag == id}" :facedowns="laneFacedowns[id]" @mydrag="handleDrag($event, id)" @drop="select(id)"></Lane>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Stack from '@/components/Stack.vue';
import Lane from '@/components/Lane.vue';
import { standardDeck, Card, Suit, suits, color } from '@/Card';
import { shuffle, range, objFromKeys, begins, tailnum } from '@/Utils';

const laneIds = range(1, 7).map(i => 'lane' + i);
const goalIds = range(1, 4).map(i => 'goal' + i);

export default Vue.component('home', {
  components: {
    Stack,
    Lane
  },
  data: function() {
    const deck = shuffle(standardDeck());
    return {
      stacks: {
        chute: deck,
        grabs: [],
        ...objFromKeys(laneIds, id => deck.splice(0, tailnum(id)!)),
        ...objFromKeys(goalIds, () => [])
      } as Record<string, Card[]>,
      drag: null as string | null,
      goalMap: objFromKeys(suits, () => 0) as Record<Suit, number>,
      laneFacedowns: objFromKeys(laneIds, id => tailnum(id)! - 1)
    };
  },
  computed: {
    // Using computed for constant expressions. Makes sense?
    laneIds: () => laneIds,
    goalIds: () => goalIds
  },
  methods: {
    tapChute: function(): void {
      this.move('chute', 'grabs');
      this.drag = null;
    },
    move: function(from: string, to: string, n: number = 1): void {
      for (const card of this.stacks[from].splice(0, n)) {
        this.stacks[to].unshift(card);
        // Associate suit to goal index.
        if (begins(to, 'goal')) {
          this.goalMap[card.suit] = parseInt(to.substr(-1));
        }
      }
    },
    select: function(stack: string): void {
      if (!this.drag) {
        // Flipping the top card in a lane.
        if (
          begins(stack, 'lane') &&
          this.laneFacedowns[stack] == this.stacks[stack].length
        ) {
          this.laneFacedowns[stack] = this.laneFacedowns[stack] - 1;
          this.drag = null;
          return;
        }

        if (this.stacks[stack].length > 0 && this.canMoveFrom(stack)) {
          this.drag = stack;
        }
      } else {
        if (this.canMoveTo(stack, this.stacks[this.drag][0], this.drag)) {
          this.move(this.drag, stack);
        }
        this.drag = null;
      }
    },
    canMoveFrom: function(stack: string): boolean {
      return stack === 'grabs' || begins(stack, 'lane');
    },
    canMoveTo: function(dest: string, card: Card, src: string) {
      return (
        // Empty goal stack.
        (begins(dest, 'goal') &&
          this.goalMap[card.suit] == 0 &&
          card.rank == 1) ||
        // Goal stack: same suit and rank + 1.
        (dest === 'goal' + this.goalMap[card.suit] &&
          this.stacks[dest].length + 1 == card.rank) ||
        // Lane stack: empty, or different color and rank - 1
        (begins(dest, 'lane') &&
          (this.stacks[dest].length == 0 ||
            (color(card.suit) != color(this.stacks[dest][0].suit) &&
              this.stacks[dest][0].rank == card.rank + 1)))
      );
    },
    handleDrag: function(cardi: { card: Card; i: number }, stack: string) {
      this.drag = null;
      this.select(stack);
    },
  }
});
</script>

<style>
#table {
  width: 500px;
}

#chute,
#grabs {
  float: left;
}

#goals {
  float: right;
}

#lanes {
  clear: both;
}
</style>