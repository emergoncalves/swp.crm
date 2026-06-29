export default function ApplicationLogo({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="40" height="40" rx="8" fill="#4F46E5" />
            <path
                d="M12 12h16v16H12V12z"
                fill="white"
                fillOpacity="0.2"
            />
            <path
                d="M16 16h8v8h-8v-8z"
                fill="white"
            />
        </svg>
    );
}
