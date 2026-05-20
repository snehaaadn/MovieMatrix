const FilterDropdown = ({ options, value, onChange, placeholder, disabled = false }) => (
    <select 
        value={value} 
        onChange={onChange}
        disabled={disabled}
        className="px-3 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <option value="">{placeholder}</option>
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);

export default FilterDropdown;