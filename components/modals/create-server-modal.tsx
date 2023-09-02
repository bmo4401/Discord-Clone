'use client';
import { useForm } from 'react-hook-form';

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components//ui/dialog';
import { FileUpLoad } from '@/components/file-upload';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
   name: z.string().min(1, { message: 'Server name is required.' }),
   imageUrl: z.string().min(1, { message: 'Server name is required.' }),
});

export const CreateServerModal = () => {
   const { isOpen, onClose, onOpen, type } = useModal();
   const router = useRouter();
   const isModalOpen = isOpen && type === 'createServer';
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
         imageUrl: '',
      },
   });
   const isLoading = form.formState.isSubmitting;
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         await axios.post('/api/servers', values);
         form.reset();
         router.refresh();
         onClose();
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
                  Custom your server
               </DialogTitle>
               <DialogDescription className="text-center text-zinc-500\">
                  Give your server a personality with a name and an image. You
                  can always change it later.
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
                           name="imageUrl"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <FileUpLoad
                                       endpoint="serverImage"
                                       value={field.value}
                                       onChange={field.onChange}
                                    />
                                 </FormControl>
                              </FormItem>
                           )}
                        ></FormField>
                     </div>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                 Server name
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    disabled={isLoading}
                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                    placeholder="Enter server name"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DialogFooter className="bg-gray-100 px-6 py-4">
                     <Button
                        variant={'primary'}
                        disabled={isLoading}
                     >
                        Create
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};
