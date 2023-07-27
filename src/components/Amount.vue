<template>
    <div class="flex justify-between p-1">

        <!-- dt es description terms -->
        <dt class="font-bold">
            <slot name="label"></slot>
        </dt>

        <!-- description details -->
        <dd class="text-gray-900">
            <slot></slot>
        </dd>
    </div>
</template>
