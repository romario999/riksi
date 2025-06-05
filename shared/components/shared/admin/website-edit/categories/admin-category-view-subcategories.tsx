export const AdminCategoryViewSubcategories = ({ subcategories }: { subcategories: any[]}) => {
    return (
        <div>
            <span className="block text-sm font-medium text-gray-700">Підкатегорії</span>
            <div className="bg-gray-100 inline-block px-6 py-3 rounded-sm mt-2">
               {subcategories.length > 0 ? subcategories.map((sub: any) => <div key={sub.id}>{sub.name}</div>) : <div>Немає підкатегорій</div>}
            </div>
        </div>
    )
}