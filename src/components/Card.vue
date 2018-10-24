<template>
    <div :class="['card', 'suit-' + card.suit, 'rank-' + card.rank]">
        <span class="title" v-html="html"></span>
    </div>
</template>
    
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Card as MCard, cardStr, suitStr, rankStr } from '@/Card';

@Component
export default class Card extends Vue {
  @Prop()
  readonly card!: MCard;

  public get str(): string {
    return cardStr(this.card);
  }

  public get html(): string {
    return (
      `<span class="suit">${suitStr(this.card.suit)}</span>` +
      `<span class="rank">${rankStr(this.card.rank)}</span>`
    );
  }
}
</script>

<style>
.card {
  width: 5em;
  height: 7em;
  border: thin solid #333;
  border-radius: 0.5em;
  padding: 1em;
}

.suit-hearts,
.suit-tiles {
  color: red;
}

.card .title {
  font-size: 2.5em;
}

.suit {
  font-size: 120%;
  line-height: 70%;
}
</style>