import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function PostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Navbar />
        <div className="flex gap-6 mx-60 justify-between">
          {children}
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
