export default function ItemCard({ item }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  return (
    <div
      className="w-24 h-24 cursor-grab border border-gray-400 rounded-lg p-2 bg-white shadow"
      draggable
      onDragStart={handleDragStart}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
