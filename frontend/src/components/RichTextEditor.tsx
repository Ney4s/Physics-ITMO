import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const COMMANDS: Array<{ command: string; label: string; value?: string }> = [
  { command: 'bold', label: 'Ж' },
  { command: 'italic', label: 'К' },
  { command: 'underline', label: 'Ч' },
  { command: 'formatBlock', label: 'H2', value: '<h2>' },
  { command: 'formatBlock', label: 'H3', value: '<h3>' },
  { command: 'formatBlock', label: 'Абзац', value: '<p>' },
  { command: 'insertUnorderedList', label: '• Список' },
  { command: 'insertOrderedList', label: '1. Список' },
  { command: 'removeFormat', label: 'Очистить' },
];

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const exec = (command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    ref.current?.focus();
    onChange(ref.current?.innerHTML ?? '');
  };

  return (
    <div>
      <div className="editor-toolbar">
        {COMMANDS.map(({ command, label, value: commandValue }) => (
          <button key={label} type="button" onClick={() => exec(command, commandValue)}>
            {label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="editor-area"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Содержимое страницы"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
