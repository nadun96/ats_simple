<template>
  <v-card flat class="pa-6">
    <v-card-text>
      <div ref="signaturePadWrapper" class="signature-pad-wrapper">
        <canvas ref="canvas" class="signature-canvas"></canvas>
      </div>

      <v-row class="mt-3" dense>
        <v-col cols="6" class="pr-1">
          <v-btn color="primary" block @click="saveSignature">Save Signature</v-btn>
        </v-col>
        <v-col cols="6" class="pl-1">
          <v-btn color="secondary" block @click="clearSignature">Clear</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SignaturePad from 'signature_pad'

const canvas = ref<HTMLCanvasElement | null>(null)
let signaturePad: SignaturePad | null = null

const resizeCanvas = () => {
  if (!canvas.value) return
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.value.width = canvas.value.offsetWidth * ratio
  canvas.value.height = canvas.value.offsetHeight * ratio
  canvas.value.getContext('2d')?.scale(ratio, ratio)
  signaturePad?.clear()
}

onMounted(() => {
  if (canvas.value) {
    signaturePad = new SignaturePad(canvas.value, {
      backgroundColor: 'rgba(255,255,255,0)',
      penColor: 'black',
    })
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
  }
})

const saveSignature = () => {
  if (!signaturePad || signaturePad.isEmpty()) {
    alert('Please provide a signature first.')
    return
  }
  const dataURL = signaturePad.toDataURL('image/png')
  console.log('Signature saved:', dataURL)
}

const clearSignature = () => {
  signaturePad?.clear()
}
</script>

<style scoped>
.signature-pad-wrapper {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 150px;
  width: 100%;
  touch-action: none;
}
.signature-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
