import React from 'react';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';

interface Props {
    open: boolean;
    onClose: () => void;
}

const SizesTableModal: React.FC<Props> = ({ open, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="bg-white max-w-full sm:max-w-[800px] p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4">Розмірна таблиця</h2>
                <table className="w-full border-collapse text-center text-sm sm:text-base">
                    <thead>
                        <tr>
                            <th className="border p-2 bg-gray-100">Розмір:</th>
                            <th className="border p-2 bg-gray-100">Обхват грудей:</th>
                            <th className="border p-2 bg-gray-100">Обхват талії:</th>
                            <th className="border p-2 bg-gray-100">Обхват стегон:</th>
                            <th className="border p-2 bg-gray-100">UA</th>
                            <th className="border p-2 bg-gray-100">EU</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">XXS</td>
                            <td className="border p-2">78-82</td>
                            <td className="border p-2">58-62</td>
                            <td className="border p-2">84-88</td>
                            <td className="border p-2">40</td>
                            <td className="border p-2">32</td>
                        </tr>
                        <tr>
                            <td className="border p-2">XS</td>
                            <td className="border p-2">82-86</td>
                            <td className="border p-2">62-66</td>
                            <td className="border p-2">88-92</td>
                            <td className="border p-2">42</td>
                            <td className="border p-2">34</td>
                        </tr>
                        <tr>
                            <td className="border p-2">S</td>
                            <td className="border p-2">86-90</td>
                            <td className="border p-2">66-70</td>
                            <td className="border p-2">92-96</td>
                            <td className="border p-2">44</td>
                            <td className="border p-2">36</td>
                        </tr>
                        <tr>
                            <td className="border p-2">M</td>
                            <td className="border p-2">90-94</td>
                            <td className="border p-2">70-74</td>
                            <td className="border p-2">96-100</td>
                            <td className="border p-2">46</td>
                            <td className="border p-2">38</td>
                        </tr>
                        <tr>
                            <td className="border p-2">L</td>
                            <td className="border p-2">94-98</td>
                            <td className="border p-2">74-78</td>
                            <td className="border p-2">100-104</td>
                            <td className="border p-2">48</td>
                            <td className="border p-2">40</td>
                        </tr>
                        <tr>
                            <td className="border p-2">XL</td>
                            <td className="border p-2">99-104</td>
                            <td className="border p-2">79-84</td>
                            <td className="border p-2">105-110</td>
                            <td className="border p-2">50</td>
                            <td className="border p-2">42/44</td>
                        </tr>
                        <tr>
                            <td className="border p-2">XXL</td>
                            <td className="border p-2">104-108</td>
                            <td className="border p-2">84-88</td>
                            <td className="border p-2">110-114</td>
                            <td className="border p-2">52</td>
                            <td className="border p-2">44</td>
                        </tr>
                    </tbody>
                </table>
                <p className="mt-4 text-sm text-gray-700">
                    <b>Увага!</b> Вартість на вироби від розміру XL та більше - вища, оскільки це є індивідуальним замовленням, на яке здійснюється додаткова розробка лекал та використовується більше матеріалів. Дані вироби в обмін та поверненню не підлягають і відшиваються тільки після повної оплати.
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default SizesTableModal;