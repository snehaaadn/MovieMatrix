const FilterDropdown = ({ options, value, onChange, placeholder }) => (
    <select 
        value={value} 
        onChange={onChange} 
        className="px-3 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-sm"
    >
        <option value="">{placeholder}</option>
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);

export default FilterDropdown;