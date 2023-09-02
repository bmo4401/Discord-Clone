'use client';
import { useForm } from 'react-hook-form';
import qs from 'query-string';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components//ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { FileUpLoad } from '../file-upload';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

const formSchema = z.object({
   fileUrl: z.string().min(1, { message: 'Server name is required.' }),
});

export const MessageFileModal = () => {
   const { isOpen, onClose, type, data } = useModal();
   const { apiUrl, query } = data;
   const isModalOpen = isOpen && type === 'messageFile';
   const router = useRouter();
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         fileUrl: '',
      },
   });
   const isLoading = form.formState.isSubmitting;
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         const url = qs.stringifyUrl({
            url: apiUrl || '',
            query,
         });
         await axios.post(url, {
            ...values,
            content: values.fileUrl,
         });
         form.reset();
         router.refresh();
         handleClose();
      } catch (error) {
         console.log('❄️ ~ file: initial-modal.tsx:49 ~ error:', error);
      }
   };
   const handleClose = () => {
      form.reset();
      onClose();
   };
   return (
      <Dialog
         open={isModalOpen}
         onOpenChange={handleClose}
      >
         <DialogContent className="bg-white text-black p-8 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
               <DialogTitle className="text-center text-2xl font-bold">
                  Add an attachment
               </DialogTitle>
               <DialogDescription className="text-center text-zinc-500">
                  Send a file as a message
               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
               >
                  <div className="space-y-8">
                     <div className="flex items-center justify-center text-center">
                        <FormField
                           control={form.control}
                           name="fileUrl"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormControl>
                                       <FileUpLoad
                                          endpoint="messageFile"
                                          value={field.value}
                                          onChange={field.onChange}
                                       />
                                    </FormControl>
                                 </FormItem>
                              );
                           }}
                        />
                     </div>
                  </div>
                  <DialogFooter className="bg-gray-100 px-6 py-4">
                     <Button
                        variant={'primary'}
                        disabled={isLoading}
                     >
                        Send
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};
