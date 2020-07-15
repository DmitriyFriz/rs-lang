import { SETTINGS_MAIN } from 'components/Settings/Settings.Constants';

class AudioControl {
  constructor(root) {
    this.audio = document.createElement('audio');
    this.isPlayAudio = false;
    this.audioData = [];
    this.handleAudioEvent = this.handleAudioEvent.bind(this);

    root.append(this.audio);

    this.audio.addEventListener('ended', this.handleAudioEvent);
  }

  destroy() {
    this.stopAudio();
    this.audio.removeEventListener('ended', this.handleAudioEvent);
    this.audio.remove();
  }

  playAudio() {
    const voice = this.audioData.pop();
    this.audio.src = voice;
    this.audio.play();
    this.isPlayAudio = true;
  }

  handleAudioEvent() {
    if (!this.audioData.length) { return; }
    this.playAudio();
  }

  stopAudio() {
    this.audioData = [];
    this.audio.pause();
    this.isPlayAudio = false;
  }

  initAudio({ audio, audioExample, audioMeaning }, settings) {
    if (this.isPlayAudio) {
      this.stopAudio();
      return;
    }

    this.audioData = [];
    if (settings[SETTINGS_MAIN.MEANING]) {
      this.audioData.push(audioMeaning);
    }
    if (settings[SETTINGS_MAIN.EXAMPLE]) {
      this.audioData.push(audioExample);
    }

    this.audioData.push(audio);
    this.playAudio();
  }

  checkAutoAudioPlay(audioData, settings) {
    if (settings[SETTINGS_MAIN.AUDIO_AUTOPLAY]) {
      this.initAudio(audioData, settings);
    }
  }
}

export default AudioControl;
