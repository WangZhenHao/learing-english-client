import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import "./_components/homepage.css";
import Link from "next/link";
export default function HomePage() {
  return (
    <main className="home-container">
      {/* Background Gradient */}
      <div className="bg-layer bg-main"></div>
      <div className="bg-layer bg-purple-1"></div>
      <div className="bg-layer bg-purple-2"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          The AI Tool for
          <br /> <span className="highlight">Shadow Reading English</span>
        </h1>

        <p className="hero-desc">
          一个帮助你通过 <span className="highlight-light">影子跟读</span>、
          <span className="highlight-light">逐字高亮</span>、
          <span className="highlight-light">反复听读</span> 来快速提升口语、听力能力的学习工具。
        </p>

        <div className="hero-actions">
          <Link href="/course">
            <Button className="btn-start px-10 py-6">开始使用</Button>
          </Link>
        </div>
      </section>

      {/* Preview Card */}
      {/* <section className="preview-card">
        <div className="preview-placeholder">这里放你的 Shadow Reading UI 预览图</div>
      </section> */}
    </main>
  );
}
