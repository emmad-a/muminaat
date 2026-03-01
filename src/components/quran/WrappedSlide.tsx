"use client";

interface WrappedSlideProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function WrappedSlide({ children, isActive }: WrappedSlideProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
        isActive
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}
