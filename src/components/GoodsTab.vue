<template>
  <Card class='h-[80svh] w-[90svw] flex flex-col'>
    <div class='flex h-full mx-4 mb-4'>
      <div class='overflow-auto h-full w-full lg:w-[70%] lg:border-r p-2'>
        <Table>
          <TableCaption>список товаров</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]">
                Стеллаж
              </TableHead>
              <TableHead>Товар</TableHead>
              <TableHead class='text-center'>Срочность</TableHead>
              <TableHead class='hidden md:table-cell text-center'>Среднее Кол-во на Позицию</TableHead>
              <TableHead class="text-right w-[100px] hidden md:table-cell">
                Кол-во
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for='row in data'>
              <TableCell class="font-medium">
                {{ row.rack }}
              </TableCell>
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>
                <div class='h-4 w-4 mx-auto rounded-full' :style="{
                  backgroundColor: getHue(row.trigger)
                }"></div>
              </TableCell>
              <TableCell class='hidden md:table-cell text-center'> {{ row.avg_cart }}</TableCell>
              <TableCell class="text-right hidden md:table-cell">
                <div class='w-full flex justify-center items-center my-2'>
                  <div
                    class='bg-secondary px-2 py-1 rounded-l-lg border-r border-transparent hover:border-muted-foreground/20 hover:cursor-pointer'>
                    +</div>
                  <div class='bg-secondary px-2 py-1 border-x border-transparent hover:border-muted-foreground/20'>{{
                    row.amount }}</div>
                  <div
                    class='bg-secondary px-2 py-1 rounded-r-lg border-l border-transparent hover:border-muted-foreground/20 hover:cursor-pointer'>
                    -</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class='h-full w-[30%] hidden lg:block'>
        <div class='w-fit mx-auto pt-2'>
          <Calendar @update:model-value="(v) => {
            if (v) {
              console.log((v.day % 14) - 1)
            }
          }" :v-model='value' :default-value='value' :weekday-format="'short'" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Calendar from '@/components/ui/calendar/Calendar.vue';
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
import { Ref, ref, watch } from 'vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>

watch(value, (newVal) => {
  const dayOfMonth = newVal.toDate(getLocalTimeZone()).getDate(); // Get the day of the month
  console.log(`Day of the month: ${dayOfMonth}, Day % 14 = ${dayOfMonth % 14}`);
});

import { getHue } from '@/lib/utils';
import { BACKEND_URL } from '@/lib/contants';


const data = [{
  rack: 'A7',
  name: 'Арбуз',
  trigger: 0.2,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr1',
  name: 'Вишня',
  trigger: 0.5,
  avg_cart: 1,
  amount: 1
},
{
  rack: 'Fr9',
  name: 'Банан',
  trigger: 0.9,
  avg_cart: 1,
  amount: 1
}]

console.log(BACKEND_URL)

</script>