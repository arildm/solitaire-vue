<template>
  <div>
    <Pile :cards="standardDeck"></Pile>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { standardDeck, cardStr } from '@/Card';
import Pile from '@/components/Pile';

@Component({
  components: {
    Pile
  }
})
export default class Home extends Vue {
  readonly standardDeck = standardDeck;
  readonly cardStr = cardStr;
}
</script>
