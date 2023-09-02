'use client';

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components//ui/dialog';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LeaveServerModal = () => {
   const router = useRouter();
   const { isOpen, onClose, data, type } = useModal();
   const { server } = data;
   const isModalOpen = isOpen && type === 'leaveServer';

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const onClick = async () => {
      try {
         setIsLoading(true);
         await axios.patch(`/api/servers/${server?.id}/leave`);
         onClose();
         router.refresh();
         router.push('/');
      } catch (error) {
         console.log('❄️ ~ file: leave-server-modal.tsx:25 ~ error:', error);
      } finally {
         setIsLoading(false);
      }
   };
   return (
      <Dialog
         open={isModalOpen}
         onOpenChange={onClose}
      >
         <DialogContent className="bg-white text-black p-8 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
               <DialogTitle className="text-center text-2xl font-bold">
                  Leave Server
               </DialogTitle>
               <DialogDescription className="text-center text-zinc-500">
                  Are you sure you want to leave{' '}
                  <span className="font-semibold text-indigo-500">
                     {server?.name}
                  </span>
                  ?
               </DialogDescription>
            </DialogHeader>
            <DialogFooter className="bg-gray-100 px-6 py-4">
               <div className="flex items-center justify-between w-full">
                  <Button
                     disabled={isLoading}
                     onClick={onClose}
                     variant={'ghost'}
                  >
                     Cancel
                  </Button>
                  <Button
                     disabled={isLoading}
                     onClick={onClick}
                     variant={'primary'}
                  >
                     Confirm
                  </Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
