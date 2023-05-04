export default function TableData({ value, color }) {
  return (
    <td style={{
      color: color,
    }} className="text-left px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
      {value}
    </td>
  );
}
