"use client"

import Link from 'next/link'

import { motion } from "framer-motion"

import { FrownIcon } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-2">
            <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <FrownIcon size={28} className="text-gray-400" />
            </motion.div>
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested page.</p>
            <Link
                href="/"
                className="mt-4 rounded-md bg-df-yellow px-4 py-2 text-sm text-white transition-colors hover:bg-df-yellow/80"
            >
                Go to Homepage
            </Link>
        </main>
    );
}