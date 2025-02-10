import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
    const { data: session } = useSession();

    return (
        <div className={cn('', className)}>
            {
                !session ? (
                    <Button
                        onClick={onClickSignIn}
                        variant="outline"
                        className="items-center gap-1 hidden sm:flex"
                    >
                        <User size={18} />
                        <span>Увійти</span>
                    </Button>
                ) : (
                    <Link href="/profile">
                        <Button variant="secondary" className="items-center gap-2 hidden sm:flex">
                            <CircleUser size={18} />
                            <span>Профіль</span>
                        </Button>
                    </Link>
                )
            }

            {
                !session ? (
                    <Button
                        onClick={onClickSignIn}
                        variant="outline"
                        className="flex items-center gap-1 sm:hidden border-0"
                    >
                        <User size={28} />
                    </Button>
                ) : (
                    <Link href="/profile">
                        <Button variant="outline" className="flex items-center gap-2 sm:hidden border-0">
                            <CircleUser size={28} />
                        </Button>
                    </Link>
                )
            }
        </div>
    );
};
