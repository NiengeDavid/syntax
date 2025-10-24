// "use client";

// import { useState, useEffect } from "react";
// import { ContactDrawer } from "@/components/contact-drawer";
// import { useRouter } from "next/navigation";

// export default function ContactPage() {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   // Open drawer on mount
//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   const handleClose = () => {
//     setIsOpen(false);
//     // Navigate back after animation completes
//     setTimeout(() => {
//       router.back();
//     }, 300);
//   };

//   return (
//     <div className="min-h-screen">
//       <ContactDrawer isOpen={isOpen} onClose={handleClose} />
//     </div>
//   );
// }
