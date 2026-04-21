
export default function SelectField({
  label,
  value,
  onChange,
  options,
  className = "",
}) {
  return (
    <div className={className}>
      <h3 className="addMovie-title-name">{label}</h3>

      <select
        value={value}
        className="addMovie-select"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Обери тип</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}