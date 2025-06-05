import { prisma } from "@/prisma/prisma-client";

const properties = ['ID', 'Імʼя', 'Телефон', 'Надіслано'];

export default async function AdminCallmePage() {

    const requests = await prisma.callMe.findMany();

    return (
        <div className="">
            <h4 className="text-2xl font-semibold mb-4">Запити на дзвінок</h4>
            <table className="min-w-full table-auto w-full">
                <thead className="bg-gray-100">
                    <tr className="flex justify-between">
                        {properties.map((property, index) => (
                            <th key={index} className="py-3 px-6 text-left text-sm font-medium text-gray-900 flex-1">
                                {property}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {requests.sort((a, b) => b.id - a.id).map((value) => (
                        <tr key={value.id} className="flex justify-between bg-white border-b">
                            <td className="py-3 px-6 text-sm font-medium text-gray-900 flex-1">{value.id}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900 flex-1">{value.callMeName}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900 flex-1">{value.callMePhone}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900 flex-1">{value.createdAt.toLocaleDateString('uk-UA') + ' | ' + value.createdAt.toLocaleTimeString('uk-UA')}</td>
                        </tr>
                    ))}
                 </tbody>
            </table>
        </div>
    );
}