export default function FilterSidebar() {
  return (
    <aside className="w-64 pr-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="mb-4">
        <h3 className="font-bold mb-2">Price Filter</h3>
        <p>Price: AED0.00 — AED90.00</p>
        {/* Implement price range slider or checkboxes here */}
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Categories</h3>
        <ul>
          <li>All categories</li>
          <li>Clothing</li>
          <li>Men&apos;s Clothing</li>
          <li>T-Shirts</li>
          <li>Jeans</li>
          <li>Suits</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2">Size</h3>
        <ul>
          <li>S</li>
          <li>M</li>
          <li>L</li>
          <li>XL</li>
          <li>XXL</li>
        </ul>
      </div>
    </aside>
  );
}
