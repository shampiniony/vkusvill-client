<template>
  <Card class='h-[80svh] w-[90svw] flex flex-col'>
    <div class='h-full w-full p-4 flex'>
      <div :class='selectedBox && `hidden sm:grid`'
        class='h-full w-full lg:w-[70%] bg-secondary rounded-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-6 p-4'>
        <div v-for='(shelve) in shelvesArray' :key='shelve.shelve'
          class='h-full w-full rounded-lg flex items-center justify-center text-xl font-medium hover:cursor-pointer'
          :style="{
            backgroundColor: getHue(shelve.avg_trigger)
          }" @click="selectBox(shelve.shelve)">
          {{ shelve.shelve }}
        </div>
      </div>
      <div :class='selectedBox ? `block` : `hidden`' class='lg:block h-full w-full sm:w-[30%] bg-white rounded-md px-4'>
        <div class='text-xl font-medium h-full w-full' v-if='selectedBox'>
          <div class='flex justify-between items-center pb-2'>
            <div @click='selectBox(null)' class='text-sm font-normal text-muted-foreground cursor-pointer'>
              Обратно
            </div>
            <div>
              Стеллаж {{ selectedBox }}
            </div>
          </div>
          <div class='overflow-auto h-[90%]'>
            <Table>
              <TableCaption>список товаров</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Товар</TableHead>
                  <TableHead class='text-right'>Срочность</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for='row in selectedGoods?.sort((a, b) => b.trigger - a.trigger)'>
                  <TableCell>{{ row.name }}</TableCell>
                  <TableCell class='flex justify-end'>
                    <div class='h-4 w-4 rounded-full' :style="{
                      backgroundColor: getHue(row.trigger)
                    }"></div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div class='overflow-auto h-full' v-else>
          <Table>
            <TableCaption>список товаров</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]">
                  Стеллаж
                </TableHead>
                <TableHead class='text-center'>Состояние</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow class='hover:cursor-pointer' @click="selectBox(row.shelve)" v-for='row in shelvesArray'>
                <TableCell class="font-medium">
                  {{ row.shelve }}
                </TableCell>
                <TableCell>
                  <div class='h-4 w-4 mx-auto rounded-full' :style="{
                    backgroundColor: getHue(row.avg_trigger)
                  }"></div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Card from '@/components/ui/card/Card.vue';
import { getHue } from '@/lib/utils';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Good } from '@/interfaces/good.interface';
import { Shelve } from '@/interfaces/shelve.interface';
import { BACKEND_URL } from '@/lib/contants';

const shelvesArray = ref<Shelve[]>([]);
const selectedBox = ref<string | null>(null);
const selectedGoods = ref<Good[] | null>(null);

const selectBox = async (box: string | null) => {
  selectedBox.value = box;

  if (box != null) {
    const response = await axios.get(`${BACKEND_URL}/goods/shelve/${box}`);
    selectedGoods.value = response.data;
  }
};

async function fetchGoods() {
  try {
    const response = await axios.get(`${BACKEND_URL}/goods/shelves/`);
    console.log(response);
    shelvesArray.value = response.data;
  } catch (error) {
    console.error('Error fetching goods:', error);
  } finally {
    setTimeout(fetchGoods, 500);
  }
}

onMounted(async () => {
  fetchGoods();
});

</script>