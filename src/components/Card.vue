<template>
    <div :class="['card', 'suit-' + card.suit, 'rank-' + card.rank, {facedown}]" @click="$emit('tap')">
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

  @Prop()
  readonly facedown: boolean;

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
  width: 50px;
  height: 70px;
  border: thin solid #333;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  background: white;
}

.card.facedown {
  font-size: 0;
}

.suit-hearts,
.suit-tiles {
  color: red;
}

.card .title {
  font-size: 20px;
}

.suit {
  font-size: 120%;
  line-height: 70%;
}
</style>