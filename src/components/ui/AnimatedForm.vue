<script setup lang="ts">
import { ref, reactive } from 'vue';
import BoxReveal from './BoxReveal.vue';
import SpotlightInput from './SpotlightInput.vue';

export type FieldType = 'text' | 'email' | 'password';

export interface Field {
  name: string;
  label: string;
  required?: boolean;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string;
}

interface Props {
  header: string;
  subHeader?: string;
  fields: Field[];
  submitButton: string;
  textVariantButton?: string;
  errorField?: string;
  fieldPerRow?: number;
  googleLogin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fieldPerRow: 1
});

const emit = defineEmits(['submit', 'goTo']);

const formData = reactive<Record<string, string>>({});
const errors = reactive<Record<string, string>>({});
const passwordVisible = ref<Record<string, boolean>>({});

// Initialize formData
props.fields.forEach(f => {
  formData[f.name] = f.defaultValue || '';
});

const toggleVisibility = (name: string) => {
  passwordVisible.value[name] = !passwordVisible.value[name];
};

const validateForm = () => {
  let isValid = true;
  for (const key in errors) delete errors[key];
  
  props.fields.forEach((field) => {
    const value = formData[field.name];

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required`;
      isValid = false;
    } else if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      errors[field.name] = 'Invalid email address';
      isValid = false;
    } else if (field.type === 'password' && value && value.length < 6) {
      errors[field.name] = 'Password must be at least 6 characters long';
      isValid = false;
    }
  });
  return isValid;
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (validateForm()) {
    emit('submit', formData);
  }
};
</script>

<template>
  <section class="max-md:w-full flex flex-col gap-4 w-96 mx-auto relative z-10">
    <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
      <h2 class="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
        {{ props.header }}
      </h2>
    </BoxReveal>

    <BoxReveal v-if="props.subHeader" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" class="pb-2">
      <p class="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
        {{ props.subHeader }}
      </p>
    </BoxReveal>

    <template v-if="props.googleLogin">
      <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" overflow="visible" width="unset">
        <button
          class="group/btn bg-transparent w-full rounded-md border h-10 font-medium outline-none hover:cursor-pointer relative overflow-hidden"
          type="button"
          @click="$emit('submit', { google: true })"
        >
          <span class="flex items-center justify-center w-full h-full gap-3 relative z-10">
            <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" width="26" height="26" alt="Google Icon" />
            <span class="text-neutral-800 dark:text-neutral-200">{{ props.googleLogin }}</span>
          </span>
          <span class="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
          <span class="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span>
        </button>
      </BoxReveal>

      <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" width="100%">
        <section class="flex items-center gap-4">
          <hr class="flex-1 border-1 border-dashed border-neutral-300 dark:border-neutral-700" />
          <p class="text-neutral-700 text-sm dark:text-neutral-300">or</p>
          <hr class="flex-1 border-1 border-dashed border-neutral-300 dark:border-neutral-700" />
        </section>
      </BoxReveal>
    </template>

    <form @submit="handleSubmit">
      <section :class="['grid gap-4 mb-4', `grid-cols-1 md:grid-cols-${props.fieldPerRow}`]">
        <section v-for="field in props.fields" :key="field.name" class="flex flex-col gap-2">
          <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
            <label :for="field.name" class="text-sm font-medium leading-none text-neutral-800 dark:text-neutral-200">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
          </BoxReveal>

          <BoxReveal width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" class="flex flex-col space-y-2 w-full">
            <section class="relative">
              <SpotlightInput
                :id="field.name"
                :type="field.type === 'password' ? (passwordVisible[field.name] ? 'text' : 'password') : field.type"
                :placeholder="field.placeholder"
                v-model="formData[field.name]"
              />

              <button
                v-if="field.type === 'password'"
                type="button"
                @click="toggleVisibility(field.name)"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-neutral-500"
              >
                <!-- SVG Icons for Eye/EyeOff -->
                <svg v-if="passwordVisible[field.name]" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </button>
            </section>

            <section class="h-4">
              <p v-if="errors[field.name]" class="text-red-500 text-xs">
                {{ errors[field.name] }}
              </p>
            </section>
          </BoxReveal>
        </section>
      </section>

      <BoxReveal v-if="props.errorField" width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
        <p class="text-red-500 text-sm mb-4">{{ props.errorField }}</p>
      </BoxReveal>

      <BoxReveal width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" overflow="visible">
        <button
          class="bg-gradient-to-br relative group/btn from-zinc-200 dark:from-zinc-900 dark:to-zinc-900 to-zinc-200 block dark:bg-zinc-800 w-full text-black dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] outline-none hover:cursor-pointer overflow-hidden"
          type="submit"
        >
          <span class="relative z-10">{{ props.submitButton }} &rarr;</span>
          <span class="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
          <span class="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span>
        </button>
      </BoxReveal>

      <BoxReveal v-if="props.textVariantButton" width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
        <section class="mt-4 text-center hover:cursor-pointer">
          <button type="button" class="text-sm text-blue-500 hover:text-blue-600 outline-none" @click="$emit('goTo')">
            {{ props.textVariantButton }}
          </button>
        </section>
      </BoxReveal>
    </form>
  </section>
</template>
