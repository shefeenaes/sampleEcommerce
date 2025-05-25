"use client";
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-100"
    >
      <footer className="bg-gray-100 text-white pt-10 pb-6 mt-20  shadow-inner">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <h2 className="text-2xl font-bold  text-orange-500">
                Funky Souq Lite
              </h2>
            </div>

            <p className="text-gray-400 mt-2">
              Discover the best deals and latest trends. Fast delivery and
              premium support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-3 text-2xl">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-orange-500 cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                <Link href="/category">Category</Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter Teaser */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-3 text-2xl">
              Stay Connected
            </h3>
            <p className="text-gray-400 mb-2">Follow us on social media:</p>
            <div className="flex space-x-4 mb-4 text-gray-500 text-2xl">
              <FaInstagram className="hover:text-orange-500 cursor-pointer" />
              <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
              <FaTwitter className="hover:text-orange-500 cursor-pointer" />
              <FaTiktok className="hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-orange-500 pt-4 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} funkySouq-lite. All rights reserved.
        </div>
      </footer>
    </motion.footer>
  );
}
