export const STATUSES = [
    { value: 'pending', label: 'На модерации' },
    { value: 'approved', label: 'Одобрено' },
    { value: 'rejected', label: 'Отклонено' },
    { value: 'draft', label: 'Черновик' }
]

export const CATEGORIES = [
    { id: 0, name: 'Электроника' },
    { id: 1, name: 'Недвижимость' },
    { id: 2, name: 'Транспорт' },
    { id: 3, name: 'Работа' },
    { id: 4, name: 'Услуги' },
    { id: 5, name: 'Животные' },
    { id: 6, name: 'Мода' },
    { id: 7, name: 'Детское' }
]

export const SORT_OPTIONS = [
    { value: 'createdAt-desc', label: 'Сначала новые', sortBy: 'createdAt', sortOrder: 'desc' },
    { value: 'createdAt-asc', label: 'Сначала старые', sortBy: 'createdAt', sortOrder: 'asc' },
    { value: 'price-asc', label: 'Цена: по возрастанию', sortBy: 'price', sortOrder: 'asc' },
    { value: 'price-desc', label: 'Цена: по убыванию', sortBy: 'price', sortOrder: 'desc' },
    { value: 'priority-desc', label: 'По приоритету', sortBy: 'priority', sortOrder: 'desc' }
]
