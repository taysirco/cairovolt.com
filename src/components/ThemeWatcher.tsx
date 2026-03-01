"use client";

import { useEffect } from "react";

export default function ThemeWatcher() {
    useEffect(() => {
        // Function to check and apply theme
        const checkTheme = () => {
            const currentHour = new Date().getHours();
            // Between 18 (6 PM) and 6 (6 AM)
            const isNight = currentHour >= 18 || currentHour < 6;

            if (isNight) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };

        // Initial check in case they lingered since SSR/SSR script
        checkTheme();

        // Check every minute
        const interval = setInterval(checkTheme, 60000);

        return () => clearInterval(interval);
    }, []);

    return null; // This component does not render any UI
}
