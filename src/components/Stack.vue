<template>
    <div :class="['stack', count]" @click="$emit('tap')">
        <Card v-if="count != 'zero'" :card="top" :facedown="facedown"></Card>
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card';
import { Pl } from '@/Utils';

@Component({
  components: {
    Card
  },
  computed: {
    top: function(): Card {
      return this.cards[0];
    },
    count: function(): Pl {
      return this.cards.length > 1
        ? 'many'
        : this.cards.length
          ? 'one'
          : 'zero';
    }
  }
})
export default class Stack extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly cards: Card[];
  @Prop(Boolean)
  readonly facedown: boolean;

  // public peek(): Card | undefined {
  //   return this.cards[0];
  // }

  // public move(n: number, dest: Stack) {
  //   for (const card in this.cards.splice(0, n)) {
  //     dest.cards.unshift(card);
  //   }
  // }

  // public take(n: number): Card[] {
  //   return this.cards.splice(0, n);
  // }

  // public add(card: Card) {
  //   this.cards.unshift(card);
  // }

  // public count(): Pl {
  //   return this.cards.length > 1 ? 'many' : this.cards.length ? 'one' : 'zero';
  // }

  // public shuffle(): void {
  //   this.cards.sort((a, b) => Math.random() - 0.5);
  // }
}
</script>

<style>
.stack {
  position: relative;
  display: inline-block;
  border: thin dotted #333;
  width: 50px;
  height: 70px;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 15px;
}

.stack.many {
  border-style: solid;
}

.stack.selected .card {
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