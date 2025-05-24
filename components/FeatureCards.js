export default function FeatureCards() {
  const features = [
    {
      title: "Free Delivery",
      desc: "Free delivery on orders above 300 only!",
    },
    {
      title: "Easy Returns & Refunds",
      desc: "We offer a hassle-free money-back guarantee on all returns.",
    },
    {
      title: "Exclusive Member Discounts",
      desc: "Get special discounts on every order over AED 499.",
    },
    {
      title: "24/7 Customer Support",
      desc: "We're here to assist you around the clock – contact us anytime!",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {features.map((f, idx) => (
        <div key={idx} className="bg-white p-4 shadow rounded">
          <h3 className="font-bold">{f.title}</h3>
          <p className="text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
