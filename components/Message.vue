  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  // State Variables
  const showComponent = ref(true); // Controls visibility of the full-page component
  const isMessageClicked = ref(false); // Tracks if the user clicked the message icon
  const currentText = ref<string | null>(null); // Stores the currently displayed text
  
  // Text Sequence and Timings
  const textSequence = [
    "Masih marah sayang?",
    "Jangan malah2 ntar aku cedihh",
    "Aku minta maaf ya sayangkuu",
    "Aku buat website ini sebagai permintaan maaf.",
    "I love you sayangg",
  ];
  let textIndex = 0;
  
  // Click Handler
  function handleClick() {
    isMessageClicked.value = true;
    startTextSequence();
  }
  
  // Starts the text sequence with delays
  function startTextSequence() {
    if (textIndex < textSequence.length) {
      currentText.value = textSequence[textIndex];
      setTimeout(() => {
        currentText.value = null;
        textIndex++;
        setTimeout(startTextSequence, 500); // Small gap between transitions
      }, 4000); // Display each text for 4 seconds
    } else {
      // Hide the component after the sequence ends
      setTimeout(() => {
        showComponent.value = false;
      }, 1000);
    }
  }


const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false); // Tracks whether the audio is playing

onMounted(() => {
  audio.value = new Audio("/musics/blue.mp3");
  if (audio.value) {
    audio.value.loop = true; // Enable looping

    // Attempt to autoplay the audio
    audio.value.play().then(() => {
      isPlaying.value = true; // Set playing state if autoplay succeeds
    }).catch(() => {
      console.warn("Autoplay blocked. Waiting for user interaction...");
    });
  }
});

// Toggle play/pause functionality
const toggleAudio = () => {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
      isPlaying.value = false; // Update state to paused
    } else {
      audio.value.play().then(() => {
        isPlaying.value = true; // Update state to playing
      }).catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }
};
  </script>
  
  <style scoped>
  /* Full Screen Styling */
  .h-screen {
    height: 100vh;
  }
  
  .w-screen {
    width: 100vw;
  }
  
  /* Fade Transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }
  </style>
  
  <template>
    <div v-if="showComponent" class="h-screen w-screen bg-white flex items-center justify-center fixed z-50 overflow-hidden">
      <!-- Initial Message Icon with Text -->
      <div 
        v-if="!isMessageClicked" 
        @click="handleClick" 
        class="flex flex-col items-center justify-center cursor-pointer">
        <button
      @click="toggleAudio"
      class="flex items-center justify-center w-16 h-16 rounded-full shadow-lg focus:outline-none"
    >
      <span class="text-3xl">
        <svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'><title>carplay_line</title><g id="carplay_line" fill='none'><path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/><path fill='#FF6252FF' d='M12 2c2.56 0 4.898.964 6.667 2.547a1 1 0 1 1-1.334 1.49 8 8 0 1 0 0 11.926 1 1 0 1 1 1.334 1.49A9.967 9.967 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2M8.964 8.65a1.192 1.192 0 0 1 1.654-.953l.325.143.439.202.35.169.39.196.43.223.462.251.494.28.249.145.468.282.43.268.563.368.464.318.455.327.083.062c.635.477.64 1.429.001 1.909l-.284.209-.392.276-.496.335-.387.25-.43.27-.473.283a32.54 32.54 0 0 1-.252.147l-.498.282-.466.253-.43.224-.39.196-.505.242-.4.181-.202.088a1.192 1.192 0 0 1-1.651-.954l-.054-.499-.03-.334-.042-.599-.024-.46-.018-.506-.01-.549v-.579l.01-.548.018-.506.024-.46.042-.599.071-.73zm1.883 1.355-.027.467-.02.525-.012.58v.618l.012.58.02.525.027.467.417-.21.226-.118.488-.262.53-.299.522-.309.242-.148.444-.28.39-.255-.392-.257-.444-.281-.496-.3a29.474 29.474 0 0 0-.793-.453l-.488-.262-.443-.227z'/></g></svg>
      </span>
    </button>
        <p class="text-lg font-semibold text-gray-700 cute-font">Buka Disini</p>
      </div>
  
      <!-- Text Sequence -->
      <transition name="fade" mode="out-in">
        <p 
          v-if="isMessageClicked && currentText" 
          key="text-sequence"
          class="absolute text-5xl cute-font font-medium text-center text-gray-800">
          {{ currentText }}
        </p>
      </transition>
    </div>
  </template>