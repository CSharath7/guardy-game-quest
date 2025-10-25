import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";
import { AlertTriangle, ExternalLink, Search, Calendar, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsArticles = [
    {
      id: 1,
      title: "New Phishing Campaign Targets Mobile Banking Users",
      description: "Security researchers have identified a sophisticated phishing campaign targeting major banking apps. Attackers are using fake SMS messages claiming account suspension.",
      source: "CyberSecurity Today",
      category: "phishing",
      severity: "high",
      date: "2 hours ago",
      readTime: "5 min read",
      image: "🎣",
    },
    {
      id: 2,
      title: "Fake Crypto Investment Apps Removed from App Stores",
      description: "Over 40 fraudulent cryptocurrency investment applications were discovered and removed. These apps promised high returns but stole user funds.",
      source: "Fraud Alert Network",
      category: "crypto",
      severity: "high",
      date: "5 hours ago",
      readTime: "4 min read",
      image: "₿",
    },
    {
      id: 3,
      title: "QR Code Scams Rise 300% in Restaurant Payments",
      description: "Criminals are replacing legitimate restaurant QR codes with malicious ones, redirecting payments to their own accounts.",
      source: "Payment Safety News",
      category: "payment",
      severity: "medium",
      date: "1 day ago",
      readTime: "6 min read",
      image: "📷",
    },
    {
      id: 4,
      title: "AI Voice Cloning Used in Recent Social Engineering Attacks",
      description: "Scammers are now using AI to clone voices of executives and family members to trick victims into transferring money.",
      source: "Tech Security Report",
      category: "social",
      severity: "high",
      date: "2 days ago",
      readTime: "7 min read",
      image: "🤖",
    },
    {
      id: 5,
      title: "Romance Scam Networks Exposed Across Multiple Platforms",
      description: "International operation shuts down networks responsible for billions in losses through dating app scams.",
      source: "Global Fraud Watch",
      category: "social",
      severity: "medium",
      date: "3 days ago",
      readTime: "8 min read",
      image: "💔",
    },
    {
      id: 6,
      title: "New Malware Steals Banking Credentials Through Fake Updates",
      description: "A new strain of malware disguises itself as system updates to steal banking credentials and two-factor authentication codes.",
      source: "Malware Analysis Lab",
      category: "malware",
      severity: "high",
      date: "4 days ago",
      readTime: "5 min read",
      image: "🦠",
    },
    {
      id: 7,
      title: "Invoice Fraud Costs Businesses $2.4 Billion This Quarter",
      description: "Business email compromise and fake invoice schemes continue to target finance departments globally.",
      source: "Corporate Security Today",
      category: "business",
      severity: "high",
      date: "5 days ago",
      readTime: "6 min read",
      image: "💼",
    },
    {
      id: 8,
      title: "Fake Job Offer Scams Increase on Professional Networks",
      description: "Scammers are creating fake recruiter profiles and job postings to steal personal information and money from job seekers.",
      source: "Employment Fraud Alert",
      category: "social",
      severity: "medium",
      date: "1 week ago",
      readTime: "5 min read",
      image: "👔",
    },
  ];

  const categories = [
    { id: "all", name: "All News" },
    { id: "phishing", name: "Phishing" },
    { id: "crypto", name: "Cryptocurrency" },
    { id: "payment", name: "Payment Fraud" },
    { id: "social", name: "Social Engineering" },
    { id: "malware", name: "Malware" },
    { id: "business", name: "Business Fraud" },
  ];

  const getSeverityColor = (severity: string) => {
    return severity === "high"
      ? "bg-destructive/20 text-destructive border-destructive/30"
      : "bg-warning/20 text-warning border-warning/30";
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10 text-destructive" />
            <h1 className="text-4xl font-bold">Scam News & Alerts</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest fraud alerts and security threats
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card-glass p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">+34%</div>
                <div className="text-sm text-muted-foreground">Scams this month</div>
              </div>
            </div>
          </div>
          <div className="card-glass p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Active threats</div>
              </div>
            </div>
          </div>
          <div className="card-glass p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">Today</div>
                <div className="text-sm text-muted-foreground">Last updated</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card-glass p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="severity">Highest Severity</SelectItem>
                <SelectItem value="popular">Most Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="card-glass p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-3xl group-hover:shadow-glow transition-shadow flex-shrink-0">
                  {article.image}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <Badge className={getSeverityColor(article.severity)}>
                      {article.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {article.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="text-primary hover:underline font-medium">
            Load More Articles →
          </button>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default News;
