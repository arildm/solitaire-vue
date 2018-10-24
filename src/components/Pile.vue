<template>
    <div class="pile">
        <Card v-for="card in cards" :card="card" :key="card.str"></Card>
    </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Card as MCard } from '@/Card';
import Card from '@/components/Card';

@Component({
  components: {
    Card
  }
})
export default class Pile extends Vue {
  @Prop()
  cards!: MCard[];
}
</script>

<style>
.pile {
  position: relative;
}

.pile .card {
  display: inline-block;
}
</style>