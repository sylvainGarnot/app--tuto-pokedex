<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
</script>

<template>
  <AlertDialog>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <slot name="title">
            Are you absolutely sure?
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="$emit('cancel')">
          <slot name="cancel">
            Cancel
          </slot>
        </AlertDialogCancel>
        <AlertDialogAction @click="$emit('continue')">
          <slot name="continue">
            Continue
          </slot>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>