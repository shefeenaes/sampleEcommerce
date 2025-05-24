"use client";
import { useCartStore } from "@/store/cartStore";
import Breadcrumb from "@/components/Breadcrumb";
export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const total = items
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-4">
      <Breadcrumb />
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="border p-2 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 border rounded"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 font-bold">Total: ${total}</div>
    </div>
  );
}
