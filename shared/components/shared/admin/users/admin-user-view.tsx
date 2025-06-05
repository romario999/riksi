'use client';

import { Order } from "@prisma/client";
import { useState } from "react";
import { AdminUserEmail } from "./admin-user-email";
import { AdminUserName } from "./admin-user-name";
import { AdminUserPassword } from "./admin-user-password";
import { AdminUserLiked } from "./admin-user-liked";
import { AdminUserOrders } from "./admin-user-orders";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminUpdateUser } from "@/app/actions";

interface User {
  id: number;
  email: string;
  createdAt: Date;
  fullName: string;
  liked: any;
  orders: Order[]
} 

export const AdminUserView: React.FC<{ user: User, likedItems: any }> = ({ user, likedItems }) => {

    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const handleSaveUser = async () => {
        if (!fullName || !email) {
            toast.error('Заповніть всі поля');
            return;
        }

        const userData = {
            id: user.id,
            email,
            fullName,
            password,
        };

        try {
            await AdminUpdateUser(userData, user.id);
            toast.success('Користувача оновлено');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Помилка при оновленні користувача');
        }
    }

    return (
        <div>
            <div className="flex justify-end"><Button onClick={handleSaveUser}>Зберегти</Button></div>

            <AdminUserName name={fullName} setName={setFullName} />

            <AdminUserEmail email={email} setEmail={setEmail} />

            <AdminUserPassword password={password} setPassword={setPassword} />

            <AdminUserLiked liked={likedItems} />

            <AdminUserOrders orders={user.orders} />
        </div>
    )
}