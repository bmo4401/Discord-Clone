'use client';
import qs from 'query-string';
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
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export const DeleteMessageModal = () => {
  const router = useRouter();
  const { isOpen, onClose, data, type } = useModal();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === 'deleteMessage';

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });
      await axios.delete(url);
      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            The message will be permanently deleted.
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
