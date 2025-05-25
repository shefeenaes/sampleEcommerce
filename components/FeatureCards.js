"use client";

import { motion } from "framer-motion";
import { TbTruckDelivery, TbRosetteDiscount } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";
import Image from "next/image";

export default function FeatureCards() {
  const features = [
    {
      title: "Free Delivery",
      desc: "Free delivery on orders above 300 only!",
      icon: <TbTruckDelivery className="text-orange-500 text-3xl" />,
    },
    {
      title: "Easy Returns & Refunds",
      desc: "We offer a hassle-free money-back guarantee on all returns.",
      icon: (
        <Image
          src="/aed.svg"
          alt="AED Icon"
          width={24}
          height={24}
          className="text-orange-500 w-8 h-8"
        />
      ),
    },
    {
      title: "Exclusive Member Discounts",
      desc: "Get special discounts on every order over AED 499.",
      icon: <TbRosetteDiscount className="text-orange-500 text-3xl" />,
    },
    {
      title: "24/7 Customer Support",
      desc: "We’re here to assist you around the clock — contact us anytime!",
      icon: <RiCustomerServiceFill className="text-orange-500 text-3xl" />,
    },
  ];

  return (
    <motion.div
      className="border p-4 md:p-6 lg:p-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left divide-y md:divide-y-0 md:divide-x">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex items-center gap-4 py-4 px-6 md:w-1/4"
            whileHover={{ scale: 1.03 }}
          >
            <div className="shrink-0">{f.icon}</div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
