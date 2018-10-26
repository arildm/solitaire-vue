<template>
  <div id="table">
    <div id="chute">
      <Stack :cards="stacks.chute" @tap="tapChute" facedown></Stack>
    </div>
    <div id="grabs">
      <Stack :cards="stacks.grabs" @tap="select('grabs')" :class="{selected: drag == 'grabs'}"></Stack>
    </div>
    <div id="goals">
      <Stack v-for="id of goalIds" :cards="stacks[id]" :key="id" @tap="select(id)" :class="{selected: drag == id}"></Stack>
    </div>
    <div id="lanes">
      <Stack v-for="id of laneIds" :cards="stacks[id]" :key="id" @tap="select(id)" :class="{selected: drag == id}" open :facedowns="laneFacedowns[id]"></Stack>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Stack from '@/components/Stack';
import { standardDeck, Card, Suit, suits, color } from '@/Card';
import { shuffle, range, objFromKeys, begins } from '@/Utils';

@Component({
  components: {
    Stack
  },
  created: function() {
    this.stacks.chute = shuffle(this.stacks.chute);

    for (let i = 0; i < 7; i++) {
      this.move('chute', this.laneIds[i], i + 1);
      this.laneFacedowns[this.laneIds[i]] = Math.max(0, i);
    }
  },
  watch: {
    laneFacedowns: function(n, o) {
      console.log('laneFacedowns changed', o, n);
    }
  }
})
export default class Home extends Vue {
  readonly laneIds: string[] = range(1, 7).map(i => 'lane' + i);
  readonly goalIds: string[] = range(1, 4).map(i => 'goal' + i);

  public stacks: Record<string, Card[]> = {
    chute: standardDeck(),
    grabs: [],
    ...objFromKeys(this.laneIds, () => []),
    ...objFromKeys(this.goalIds, () => [])
  };

  drag: string | null = null;
  goalMap: Record<Suit, number> = objFromKeys(suits, () => 0);
  laneFacedowns: Record<string, number> = {};

  tapChute() {
    this.move('chute', 'grabs');
    this.drag = null;
  }

  select(stack: string): void {
    console.log('select', stack);
    if (!this.drag) {
      // Flipping the top card in a lane.
      console.log(this.laneFacedowns);
      console.log(this.stacks[stack]);
      if (
        begins(stack, 'lane') &&
        this.laneFacedowns[stack] == this.stacks[stack].length
      ) {
        Vue.set(this.laneFacedowns, stack, this.laneFacedowns[stack] - 1);
        return;
      }

      if (this.stacks[stack].length > 0 && this.canMoveFrom(stack)) {
        this.drag = stack;
        console.log('drag', stack);
      }
    } else {
      if (this.canMoveTo(stack, this.stacks[this.drag][0], this.drag)) {
        this.move(this.drag, stack);
      }
      this.drag = null;
      console.log('drag null');
    }
  }

  move(from: string, to: string, n: number = 1): void {
    for (const card of this.stacks[from].splice(0, n)) {
      this.stacks[to].unshift(card);
      if (begins(to, 'goal')) {
        this.goalMap[card.suit] = parseInt(to.substr(-1));
      }
    }
  }

  canMoveFrom(stack: string): boolean {
    return stack === 'grabs' || begins(stack, 'lane');
  }

  canMoveTo(dest: string, card: Card, src: string) {
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
  }
}
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