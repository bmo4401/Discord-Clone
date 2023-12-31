'use client';

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from './ui/tooltip';

interface ActionTooltipProps {
   label: string;
   children: React.ReactNode;
   side?: 'top' | 'right' | 'bottom' | 'left';
   align?: 'start' | 'center' | 'end';
}
const ActionTooltip: React.FC<ActionTooltipProps> = ({
   children,
   label,
   align,
   side,
}) => {
   return (
      <TooltipProvider>
         <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent
               side={side}
               align={align}
            >
               <p className="font-semibold text-sm caret-purple-50 capitalize">
                  {label.toLowerCase()}
               </p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
export default ActionTooltip;
