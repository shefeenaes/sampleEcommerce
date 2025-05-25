"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen p-6">
      <Breadcrumb />

      {items.length === 0 ? (
        <div className="text-center mt-20 text-gray-600">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-2 rounded hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side: Cart Items */}
          <div className="md:col-span-2">
            <div className="border-b py-2 grid grid-cols-4 font-semibold text-gray-700 text-sm">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-6 grid grid-cols-4 gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-2 flex gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-green-600 text-xs mt-1">In stock</p>
                      <p className="text-xs text-gray-500">
                        Vendor: Central-South Friendship International Trade
                        Co., Ltd
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        (Size: {item.size || "M"})
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="border rounded px-2"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="border rounded px-2"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Total + Delete */}
                  <div className="flex items-center justify-end space-x-4">
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Image
                        src="/aed.svg"
                        alt="AED Icon"
                        width={20}
                        height={20}
                      />
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Summary Box */}
          <div className="bg-gray-50 p-6 rounded-md shadow-sm">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>Subtotal</span>
                <span className="flex items-center gap-1">
                  <Image src="/aed.svg" alt="AED Icon" width={20} height={20} />
                  {subtotal}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Tax</span>
                <span className="flex items-center gap-1">
                  <Image src="/aed.svg" alt="AED Icon" width={20} height={20} />
                  0.00
                </span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg text-gray-800 mb-2">
              <span>Total</span>
              <span className="flex items-center gap-1">
                <Image src="/aed.svg" alt="AED Icon" width={20} height={20} />
                {subtotal}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              (Shipping fees not included)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
