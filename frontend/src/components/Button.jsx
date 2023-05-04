import { useStateContext } from "../contexts/ContextProvider";

export default function Button({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius, width: width }}
      className={` text-${size} p-3 hover:drop-shadow-lg hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
}
