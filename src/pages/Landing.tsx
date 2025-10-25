import { Link } from "react-router-dom";
import { Shield, Target, Trophy, Users, Zap, Lock, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">FraudGuard</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Master{" "}
              <span className="gradient-text">Digital Payment Security</span>{" "}
              Through Gaming
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to identify scams, make safe choices, and protect yourself online through interactive scenarios and challenges. Climb the leaderboard while becoming a fraud detection expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Start Learning Free
                  <ChevronRight className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-secondary">100+</div>
                <div className="text-sm text-muted-foreground">Scenarios</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-success">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why FraudGuard?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn essential digital payment security through engaging gameplay
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Real-World Scenarios",
              description: "Face authentic fraud attempts and learn to spot red flags in realistic digital payment situations.",
            },
            {
              icon: Trophy,
              title: "Compete & Learn",
              description: "Earn points, unlock achievements, and climb the leaderboard as you master fraud detection.",
            },
            {
              icon: Zap,
              title: "Instant Feedback",
              description: "Get detailed explanations after each choice to understand why decisions are safe or risky.",
            },
            {
              icon: Users,
              title: "Community Driven",
              description: "Join thousands learning together, share strategies, and challenge friends.",
            },
            {
              icon: Lock,
              title: "Expert Validated",
              description: "All scenarios reviewed by cybersecurity professionals for accuracy.",
            },
            {
              icon: MessageSquare,
              title: "AI Assistant",
              description: "Get instant answers about fraud prevention from our intelligent chatbot.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="card-glass p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Simple steps to become a fraud detection expert</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Sign Up Free", desc: "Create your account in seconds" },
            { step: "02", title: "Choose Scenario", desc: "Pick from various fraud categories" },
            { step: "03", title: "Make Decisions", desc: "Identify scams and safe practices" },
            { step: "04", title: "Earn & Learn", desc: "Get feedback and climb ranks" },
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="card-glass p-12 rounded-2xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Become Fraud-Proof?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users learning to protect themselves from digital payment fraud
          </p>
          <Link to="/signup">
            <Button variant="hero" size="lg" className="text-lg px-12 py-6">
              Start Your Journey
              <ChevronRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold">FraudGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FraudGuard. Making digital payments safer.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
