

export default function InputField({label, value, onChange, placeholder, type = "text", className = "", inputClassName = "",
}) {
  return (
    <div className={className}>
      <h3 className="addMovie-title-name">{label}</h3>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={inputClassName}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
