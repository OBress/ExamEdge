import { ReactNode } from "react";
import Navbar from "@/components/home-page/navbar";

interface HomePageLayoutProps {
  children: ReactNode;
}

export default function HomePageLayout({ children }: HomePageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <footer className="bg-primary text-primary-foreground">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">ExamEdge</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} ExamEdge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
