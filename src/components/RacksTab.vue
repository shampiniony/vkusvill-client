<template>
  <Card class='h-[80svh] w-[90svw] flex flex-col'>
    <div class='h-full w-full p-4 flex'>
      <div :class='selectedBox && `hidden sm:grid`'
        class='h-full w-full lg:w-[70%] bg-secondary rounded-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-6 p-4'>
        <div v-for='(box, index) in boxesArray' :key='box'
          class='h-full w-full rounded-lg flex items-center justify-center text-xl font-medium hover:cursor-pointer'
          :style="{
            backgroundColor: getHue(coefficientArray[index])
          }" @click="selectBox(box)">
          {{ box }}
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
                <TableRow v-for='row in 17'>
                  <TableCell>{{ row }}</TableCell>
                  <TableCell class='flex justify-end'>
                    <div class='h-4 w-4 rounded-full' :style="{
                      backgroundColor: getHue(0.5)
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
              <TableRow class='hover:cursor-pointer' @click="selectBox(row)" v-for='row, index in boxesArray'>
                <TableCell class="font-medium">
                  {{ row }}
                </TableCell>
                <TableCell>
                  <div class='h-4 w-4 mx-auto rounded-full' :style="{
                    backgroundColor: getHue(coefficientArray[index])
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
import { ref } from 'vue';

// Boxes and coefficients
const boxesArray = ['A7', 'A3', 'Fr1', 'A2', 'Fr10', 'Fr7', 'Fr9', 'Fr5', 'A1', 'Fr11', 'A5', 'A6', 'Fr8', 'Fr2', 'Fr4', 'Fr6', 'Fr3'];
const coefficientArray = [0.2, 0.5, 0.8, 0.9, 0.1, 0.7, 0.3, 0.6, 0.4, 0.8, 0.2, 0.5, 0.3, 0.6, 0.7, 0.9, 1.0];

const selectedBox = ref<string | null>(null);

const selectBox = (box: string | null) => {
  selectedBox.value = box;
};

</script>