

<template>
    <Message/>
  <div class="flex flex-col items-center space-y-4 pt-28">
    <TextTitle additional-class="" text="I love you Woayeyekuuu ♥" subtext="19-12-20"/>

    <div class="max-w-screen-2xl mx-auto px-4 py-16 lg:py-24 relative">
    <div class="flex flex-col md:flex-row gap-2 border-8 border-primary">
            <div class="flex flex-1 flex-col gap-2">
                <div class="md:flex flex-1 flex-row gap-2">
                    <div v-for="(picture, index) in pictures" :key="index" class="flex flex-1 flex-col group overflow-hidden">
                        <img 
                            class="object-cover h-full transition-transform duration-300 transform group-hover:scale-110"
                            :src="getImageUrl(picture)" 
                            alt="Picture"
                        />
                    </div>
                </div>
            </div>
        <div class="flex flex-1 flex-col gap-2">
            <div class="md:flex flex-1 flex-row gap-2">
                <div class="flex flex-1 flex-col  group overflow-hidden">
                  <!-- img_04 -->
                  <img class="object-cover h-full transition-transform duration-300 transform group-hover:scale-110" loading="lazy" src="/grace-22.jpeg">  
                </div>
                <div class=" md:flex flex-1 flex-col group overflow-hidden">
                  <!-- img_05 -->
                  <img class="object-cover h-full transition-transform duration-300 transform group-hover:scale-110" loading="lazy" src="/grace-21.jpeg">
                </div>
            </div>                        
            <div class="flex flex-1 flex-col group overflow-hidden">
              <!-- img_06 -->
              <img class="object-cover h-[120px] transition-transform duration-300 transform group-hover:scale-110" loading="lazy" src="/grace-20.jpeg">
            </div>
        </div>
    </div>
</div>


<div class="slider max-w-screen-2xl m-auto">
      <div class="slide-track2 max-w-screen-2xl">
        <div v-for="(picture, index) in pictures2" :key="index" class="slide h-44" >
        <img class="object-cover h-full w-full" 
            :src="getImageUrl(picture)">  
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getAllPictures, appwriteConfig } from "../utils/appwrite.ts"; // Adjust the import path

interface File {
    $id: string;
    bucketId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    name: string;
    signature: string;
    mimeType: string;
    sizeOriginal: number;
    chunksTotal: number;
    chunksUploaded: number;
}

interface PicturesResponse {
    total: number;
    files: File[];
}


// Create a reactive variable to store the pictures
const pictures = ref<PicturesResponse | null>(null);
const pictures2 = ref<PicturesResponse | null>(null);
const isLoading = ref(true); // To track the loading state
const errorMessage = ref<string | null>(null);

// Fetch pictures when the component mounts
onMounted(async () => {
    try {
        const allPictures = await getAllPictures();
        const allPictures2 = await getAllPictures2();

        pictures.value = allPictures.files || [];
        pictures2.value = allPictures2.files || [];
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : "An unknown error occurred";
    } finally {
        isLoading.value = false; // Stop loading once data is fetched
    }
});

function getImageUrl(file: File): string {
    return `https://cloud.appwrite.io/v1/storage/buckets/${file.bucketId}/files/${file.$id}/view?project=${appwriteConfig.projectId}`;
}
</script>