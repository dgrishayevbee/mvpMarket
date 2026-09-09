import "./ImageField.css";

export function ImageField({ label, value, onChange }) {
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="image-field">
      {label && <span className="image-field__label">{label}</span>}
      <div className="image-field__row">
        {value ? (
          <img src={value} alt="" className="image-field__preview" />
        ) : (
          <div className="image-field__preview image-field__preview--empty">нет картинки</div>
        )}
        <div className="image-field__controls">
          <input
            className="image-field__url"
            type="text"
            placeholder="Ссылка на картинку (https://…)"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="image-field__buttons">
            <label className="image-field__upload">
              Загрузить файл
              <input type="file" accept="image/*" onChange={onFile} hidden />
            </label>
            {value && (
              <button type="button" className="image-field__clear" onClick={() => onChange("")}>
                Убрать
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
