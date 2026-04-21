export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  maxLength = 450,
}) {
  return (
    <div className="addMovie-form">
      <h3 className="addMovie-title-description">{label}</h3>

      <div className="addMovie-text-area">
        <textarea
          value={value}
          placeholder={placeholder}
          className="addMovie-input-description"
          rows={10}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange(e.target.value)
            }
          }}
        />

        <p
          className="char-counter"
          style={{ color: value.length > 300 ? "#eb7b7b7e" : "#949494bb" }}
        >
          {value.length} / {maxLength}
        </p>
      </div>
    </div>
  )
}