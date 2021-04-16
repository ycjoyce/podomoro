<template>
  <ul>
    <li
      v-for="(ringtone, ringtoneIndex) in data.list"
      :key="ringtoneIndex"
      class="content-item"
    >
      <p class="content-title">
        <input
          type="radio"
          name="ringtone"
          :value="`ringtone-${ringtone.id}`"
          :id="`ringtone-${ringtone.id}`"
          class="content-radio"
          :checked="ringtone.id === $store.state.ringtoneIdSelected[data.title.toLowerCase()]"
          @change="selectRingtone(data.title, ringtone.id)"
        >

        <label
          :for="`audio-${data.title.toLowerCase()}-${ringtone.id}`"
          class="content-label"
        ></label>

        <span class="content-title-text">
          {{ringtone.title}}
        </span>
      </p>

      <audio
        :src="ringtone.src"
        class="content-audio"
        :id="`audio-${data.title.toLowerCase()}-${ringtone.id}`"
        :ref="`audio-${data.title.toLowerCase()}-${ringtone.id}`"
        @ended="clearRingtone">
      </audio>

      <button
        class="content-btn-play"
        :class="{
          toPlay: !pauseAllRing || curPlayId !== `${data.title.toLowerCase()}-${ringtone.id}`,
          toPause: pauseAllRing && curPlayId === `${data.title.toLowerCase()}-${ringtone.id}`,
        }"
        @click="playRintone(ringtone.id)"
      ></button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pauseAllRingtone: false,
    };
  },
  methods: {
    selectRingtone(type, id) {
      this.$store.dispatch('setRingtone', { type, id });
    },
    clearRingtone() {
      const targetRefKeys = Object.keys(this.$refs).filter((key) => key.includes('audio-'));
      targetRefKeys.forEach((key) => {
        const audio = this.$refs[key][0];
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      this.pauseAllRingtone = true;
    },
  },
}
</script>