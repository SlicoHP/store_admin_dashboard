<script lang="ts" setup>
import { useFetch } from '@vueuse/core';
import { computed, ref, type Ref } from 'vue';
import type { Category } from '@/types/product'
import { useRouter } from 'vue-router';

const router = useRouter();

const url: Ref<string> = ref(`https://api.escuelajs.co/api/v1/categories`)
const categories: Ref<Category[]> = ref([])
const productData: Ref<{
    title: string | null,
    price: number | null,
    description: string | null,
    categoryId: number | null,
    images: string[]
}> = ref({
    title: null,
    price: null,
    description: null,
    categoryId: null,
    images: []
})

const productImage: Ref<string> = ref('')
const errorMessage: Ref<boolean> = ref(false)

const { onFetchResponse, onFetchError } = useFetch(url)

onFetchResponse(async (response) => {
    const data = await response.json();
    categories.value = data.sort(function (a: { name: string }, b: { name: string }) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    })
})

onFetchError((error) => {
    console.error(error)
})

async function addProduct() {

    const { error } = await useFetch('https://api.escuelajs.co/api/v1/products/').post({
        ...productData.value,
    })

    if (error.value) {
        console.error(error)
        errorMessage.value = true
        return
    }

    router.push({ name: 'products' })
}

function addImage() {
    if (productImage.value.length) {
        productData.value.images.push(productImage.value)
        productImage.value = ''
    }
}

const isImageURL = computed(() => {
    return isValidHttpUrl(productImage.value)
})

const isTitleValid = computed(() => {
    return productData.value.title && productData.value.title.length > 0
})

const isPriceValid = computed(() => {
    return productData.value.price && !isNaN(productData.value.price)
})

const isDescriptionValid = computed(() => {
    return productData.value.description && productData.value.description.length > 0
})

const isImagesValid = computed(() => {
    return productData.value.images && productData.value.images.length > 0
})

const isFormValid = computed(() => {
    return isTitleValid.value && isPriceValid.value && isDescriptionValid.value && isImagesValid.value
})

const isCategoryValid = computed(() => {
    return productData.value.categoryId
})

function isValidHttpUrl(input: string): boolean {
    let url;

    try {
        url = new URL(input);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
</script>

<template>
    <div class="max-w-sm mx-auto">
        <h1 class="text-2xl text-center">Create product</h1>
        <div class="mt-10 grid gap-y-4">
            <div class="sm:col-span-4">
                <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                <div>
                    <select :class="{ '!ring-red-600': !isCategoryValid }" id="category" name="category"
                        v-model="productData.categoryId"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option :value="null" selected>Select a category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                        </option>
                    </select>
                </div>
                <small class="text-red-600" v-if="!isCategoryValid">Please select a category from the dropdown.</small>
            </div>
            <div class="sm:col-span-4">
                <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                <div>
                    <div :class="{ '!ring-red-600': !isTitleValid }"
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" name="title" id="title" v-model="productData.title"
                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Blue Jeans">
                    </div>
                    <small class="text-red-600" v-if="!isTitleValid">Please provide a title</small>
                </div>
            </div>
            <div class="sm:col-span-4">
                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                <div>
                    <div :class="{ '!ring-red-600': !isPriceValid }"
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" name="price" id="price" v-model="productData.price"
                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="100">
                    </div>
                    <small class="text-red-600" v-if="!isPriceValid">Please provide a valid numerical price</small>
                </div>
            </div>
            <div class="sm:col-span-4">
                <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <div>
                    <div :class="{ '!ring-red-600': !isDescriptionValid }"
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" name="description" id="description" v-model="productData.description"
                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Very long jeans">
                    </div>
                    <small class="text-red-600" v-if="!isDescriptionValid">Please provide a description</small>
                </div>
            </div>
            <div class="sm:col-span-4">
                <label for="images" class="block text-sm font-medium leading-6 text-gray-900">Images (comma
                    separeted)</label>
                <div>
                    <div :class="{ '!ring-red-600': !isImagesValid }"
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" name="images" id="images" v-model="productImage"
                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="https://placeimg.com/640/480/any">
                        <button @click="addImage" :disabled="!isImageURL"
                            class=" bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white disabled:bg-gray-200">Add
                            image</button>
                    </div>
                    <small class="text-red-600" v-if="!isImagesValid">Please provide atleast 1 image.</small>
                    <div v-if="productData.images.length">
                        Images ready to go:
                        <div class="grid grid-cols-4 w-1/2 gap-4">
                            <img v-for="(image, i) in productData.images" :key="i" :src="image"
                                class="w-24 h-24 object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="errorMessage">
            <h2 class="text-lg mt-10 text-red-600">Something went wrong when trying to create the product. Please try again.
            </h2>
        </div>
        <button @click="addProduct" :disabled="!isFormValid"
            class="mt-4 mb-12 bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white disabled:bg-gray-200">Submit</button>

    </div>
</template>