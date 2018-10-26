<template>
    <div :class="['stack', count, open ? 'open' : 'closed']" @click="$emit('tap')">
      <template v-if="open">
        <Card v-for="(card, i) in reverse" :key="cardStr(card)" :card="card" :facedown="facedown || facedowns > i" :style="{top: 15 * i + 'px'}" :class="{top: top == card}"></Card>
      </template>
      <template v-else>
        <Card v-if="count != 'zero'" :card="top" :facedown="facedown" class="top"></Card>
      </template>
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card';
import { Pl } from '@/Utils';
import { cardStr } from '@/Card';

@Component({
  components: {
    Card
  }
})
export default class Stack extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly cards: Card[];
  @Prop(Boolean)
  readonly facedown: boolean;
  @Prop(Boolean)
  readonly open: boolean;
  @Prop({ type: Number, default: 0 })
  readonly facedowns: number;

  get reverse(): Card[] {
    const cards = [...this.cards];
    cards.reverse();
    return cards;
  }

  get top(): Card {
    return this.cards[0];
  }

  get count(): Pl {
    return this.cards.length > 1 ? 'many' : this.cards.length ? 'one' : 'zero';
  }

  cardStr = cardStr;
}
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

.stack.closed.many {
  border: thin solid #333;
}

.stack.zero {
  border-style: thin dotted #333;
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