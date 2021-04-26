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
          :checked="ringtone.id === $store.state.ringtoneIdSelected[lowerCaseTitle]"
          @change="selectRingtone(data.title, ringtone.id)"
        >

        <label
          :for="`${lowerCaseTitle}-${ringtone.id}`"
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
      pauseAllRingtone: true, // 全部都暫停
      curPlayId: null,
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
    toggleRingtone(id) {
      const targetAudio = this.$refs[id][0];

      if (this.curPlayId === id) {
        // 這首正在播，要暫停
        this.curPlayId = null;
        targetAudio.pause();
        this.pauseAllRingtone = true;
        return;
      }
      // 點了別首
      this.curPlayId = id;
      this.clearRingtone();
      targetAudio.play();
    },
    created() {
      if (localStorage.getItem('ringtone')) {
        const data = JSON.parse(localStorage.getItem('ringtone'));
        for (let key in data) {
          this.$store.commit('setRingtone', {
            type: key,
            id: data[key],
          });
        }
      }
    },
  },
}
</script>