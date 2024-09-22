<template>
  <div class='h-[100svh] w-screen flex justify-center pt-4 sm:pt-0 sm:items-center'>
    <Tabs default-value='goods'>
      <TabsList class="grid w-full md:w-[430px] grid-cols-2">
        <TabsTrigger value="goods">
          по товарам
        </TabsTrigger>
        <TabsTrigger value="rack">
          по стеллажам
        </TabsTrigger>
      </TabsList>
      <TabsContent value="goods">
        <GoodsTab />
      </TabsContent>
      <TabsContent value="rack">
        <RacksTab />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import GoodsTab from '@/components/GoodsTab.vue'
import RacksTab from '@/components/RacksTab.vue';
</script>
