<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import { useTracker } from "../stores";

const props = defineProps(["isOpen"]);

const emit = defineEmits(["close"]);

const operationTypes = ["Income", "Expense"];

const title = ref("");
const price = ref(null);
const selectedType = ref(operationTypes[0]);

function addRecord() {
  const time = new Date();

  const newOperation = {
    title: title.value,
    amount: parseFloat(price.value),
    type: selectedType.value,
    time: time.getTime(),
  };

  const operations = useTracker();

  operations.add(newOperation);

  emit("close");
}
</script>
<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex items-end justify-center p-4 sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <form @submit.prevent="addRecord()">
              <DialogPanel
                class="relative transform bg-white dark:text-white overflow-hidden rounded-lg dark:bg-dark-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                  <div class="">
                    <div class="sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        class="text-base text-center font-semibold leading-6 dark:text-white"
                        >New operation</DialogTitle
                      >
                      <div class="mt-4">
                        <div class="mb-4">
                          <label for="" class="text-sm inline-block mb-2"
                            >Operation purpose</label
                          >
                          <input
                            type="text"
                            placeholder="Bought an ice-cream"
                            required
                            v-model="title"
                            class="p-2 rounded-lg w-full dark:bg-gray-900 border dark:border-gray-800"
                          />
                        </div>
                        <div>
                          <label for="" class="text-sm inline-block">Price</label>
                          <div class="relative mt-2 rounded-md">
                            <div
                              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                            >
                              <span class="dark:text-white sm:text-sm">$</span>
                            </div>
                            <input
                              type="text"
                              id="price"
                              v-model="price"
                              class="w-full rounded-md border dark:border-gray-800 p-2 pl-7 dark:text-gray-200 ring-inset dark:bg-gray-900 placeholder:text-gray-600"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div class="mt-4">
                          <RadioGroup v-model="selectedType">
                            <RadioGroupLabel class="text-sm"
                              >Operation type</RadioGroupLabel
                            >
                            <div class="grid grid-cols-2 gap-4 mt-2">
                              <RadioGroupOption
                                v-for="type in operationTypes"
                                as="template"
                                :key="type"
                                :value="type"
                                v-slot="{ active, checked }"
                              >
                                <div
                                  :class="[
                                    checked
                                      ? 'bg-black text-white dark:bg-white dark:text-black'
                                      : 'border-gray-800',
                                  ]"
                                  class="relative flex cursor-pointer rounded-lg border px-5 py-4 focus:outline-none"
                                >
                                  <div class="flex w-full items-center justify-between">
                                    <div class="flex items-center">
                                      <div class="text-sm">
                                        <RadioGroupLabel as="p" class="font-medium">
                                          {{ type }}
                                        </RadioGroupLabel>
                                        <RadioGroupDescription as="span" class="inline">
                                        </RadioGroupDescription>
                                      </div>
                                    </div>
                                    <div class="shrink-0 dark:text-white">
                                      <svg
                                        class="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <circle cx="12" cy="12" r="12" fill="#474747" />
                                        <path
                                          d="M7 13l3 3 7-7"
                                          stroke="#fff"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </RadioGroupOption>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-100 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    type="submit"
                    class="inline-flex w-full bg-black text-white ring-gray-800 justify-center rounded-md dark:bg-white px-3 py-2 font-semibold dark:text-gray-900 shadow-sm ring-1 ring-inset dark:ring-gray-300 dark:hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref="cancelButtonRef"
                  >
                    Add record
                  </button>
                </div>
              </DialogPanel>
            </form>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
