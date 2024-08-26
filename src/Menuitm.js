import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";

import { fields } from "./fields";

export function MenuitmField(props) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "Menuitm-field";
  if (overlay) {
    className += " overlay";
  }

  return <div className={className}>{title}</div>;
}

function DraggableMenuitmField(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromMenuitm: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="Menuitm-field"
      {...listeners}
      {...attributes}
    >
      <MenuitmField field={field} {...rest} />
    </div>
  );
}

export default function Menuitm(props) {
  const { fieldsRegKey } = props;

  return (
    <div key={fieldsRegKey} className="Menuitm">
      {fields.map((f) => (
        <DraggableMenuitmField key={f.type} field={f} />
      ))}
    </div>
  );
}
