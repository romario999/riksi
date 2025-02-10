import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-9', className)}>
      <Container className='flex items-right justify-end'>
      </Container>
    </div>
  );
};