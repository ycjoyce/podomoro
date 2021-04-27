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
          :for="`ringtone-${ringtone.id}`"
          class="content-label"
        ></label>

        <span class="content-title-text">
          {{ringtone.title}}
        </span>
      </p>

      <audio
        :src="ringtone.src"
        class="content-audio"
        :id="`${lowerCaseTitle}-${ringtone.id}`"
        :ref="`${lowerCaseTitle}-${ringtone.id}`"
        @ended="clearRingtone">
      </audio>

      <button
        class="content-btn-play"
        :class="{
          toPlay: curPlayId !== `${lowerCaseTitle}-${ringtone.id}`,
          toPause: curPlayId === `${lowerCaseTitle}-${ringtone.id}`,
        }"
        @click="toggleRingtone(`${lowerCaseTitle}-${ringtone.id}`)"
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
      lowerCaseTitle: `audio-${this.data.title.toLowerCase()}`,
      pauseAllRingtone: true,
      curPlayId: null,
    };
  },
  computed: {
    tagTitle() {
      return this.data.title;
    },
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
    toggleRingtone(id) {
      const targetAudio = this.$refs[id][0];

      if (this.curPlayId === id) {
        this.curPlayId = null;
        targetAudio.pause();
        this.pauseAllRingtone = true;
        return;
      }

      this.curPlayId = id;
      this.clearRingtone();
      targetAudio.play();
    },
  },
  watch: {
    tagTitle() {
      if (!this.curPlayId) return;
      this.clearRingtone();
      this.curPlayId = null;
    },
  },
}
</script>