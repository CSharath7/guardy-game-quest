import { Link } from "react-router-dom";
import {
  Trophy,
  Target,
  Flame,
  Crown,
  AlertTriangle,
  ExternalLink,
  Play,
  Lightbulb,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";

const Dashboard = () => {
  // Mock data
  const userStats = {
    name: "Alex Rivera",
    level: 12,
    xp: 8400,
    xpToNext: 10000,
    points: 15240,
    streak: 7,
    rank: 234,
  };

  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 45230, avatar: "SC" },
    { rank: 2, name: "Mike Johnson", points: 42100, avatar: "MJ" },
    { rank: 3, name: "Emma Davis", points: 38950, avatar: "ED" },
    { rank: 4, name: "Chris Lee", points: 35400, avatar: "CL" },
    { rank: 5, name: "Sofia Martinez", points: 32800, avatar: "SM" },
  ];

  const scamNews = [
    {
      title: "New Phishing Campaign Targets Mobile Banking",
      source: "CyberSecurity Today",
      time: "2 hours ago",
      severity: "high",
    },
    {
      title: "Fake Crypto Investment Apps on Rise",
      source: "Fraud Alert Network",
      time: "5 hours ago",
      severity: "high",
    },
    {
      title: "QR Code Scams in Restaurant Payments",
      source: "Payment Safety News",
      time: "1 day ago",
      severity: "medium",
    },
  ];

  const funFacts = [
    {
      icon: "💰",
      fact: "Global losses to cybercrime exceeded $8 trillion in 2023",
      category: "Impact",
    },
    {
      icon: "📧",
      fact: "90% of data breaches start with a phishing email",
      category: "Phishing",
    },
    {
      icon: "⏰",
      fact: "A cyber attack happens every 39 seconds on average",
      category: "Frequency",
    },
    {
      icon: "🔒",
      fact: "81% of hacking-related breaches used stolen or weak passwords",
      category: "Security",
    },
  ];

  const quickGames = [
    {
      title: "Phishing Email Detective",
      difficulty: "Easy",
      xp: 100,
      icon: "🎣",
      color: "bg-primary/20",
    },
    {
      title: "Fake Website Spotter",
      difficulty: "Medium",
      xp: 200,
      icon: "🌐",
      color: "bg-secondary/20",
    },
    {
      title: "Social Engineering Defense",
      difficulty: "Hard",
      xp: 300,
      icon: "🎭",
      color: "bg-destructive/20",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Main Content - 75% */}
          <div className="flex-1 space-y-6">
            {/* Welcome & Stats */}
            <div className="card-glass p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {userStats.name}!</h1>
                  <p className="text-muted-foreground">Ready to sharpen your fraud detection skills?</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Your Rank</div>
                  <div className="text-3xl font-bold text-primary">#{userStats.rank}</div>
                </div>
              </div>

              {/* Level Progress */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Level {userStats.level}</span>
                  <span className="text-muted-foreground">{userStats.xp} / {userStats.xpToNext} XP</span>
                </div>
                <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-3" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-primary p-4 rounded-lg text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
                  <div className="text-2xl font-bold text-primary-foreground">{userStats.points}</div>
                  <div className="text-sm text-primary-foreground/80">Total Points</div>
                </div>
                <div className="bg-gradient-to-br from-warning/20 to-warning/10 p-4 rounded-lg text-center border border-warning/30">
                  <Flame className="w-8 h-8 mx-auto mb-2 text-warning" />
                  <div className="text-2xl font-bold">{userStats.streak} Days</div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                </div>
                <div className="bg-gradient-to-br from-success/20 to-success/10 p-4 rounded-lg text-center border border-success/30">
                  <Target className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="text-2xl font-bold">Level {userStats.level}</div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="card-glass p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-warning" />
                <h2 className="text-2xl font-bold">Did You Know?</h2>
                <span className="ml-auto text-xs text-muted-foreground">Fraud Facts</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {funFacts.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/20 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="text-xs text-primary font-medium mb-1">{item.category}</div>
                        <p className="text-sm">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Play Games */}
            <div className="card-glass p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quick Play</h2>
                <Link to="/games">
                  <Button variant="outline" size="sm">
                    View All Games
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {quickGames.map((game, idx) => (
                  <div
                    key={idx}
                    className="card-glass p-6 rounded-lg hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center text-3xl mb-4 mx-auto group-hover:shadow-glow transition-shadow`}>
                      {game.icon}
                    </div>
                    <h3 className="font-bold text-center mb-2">{game.title}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>{game.difficulty}</span>
                      <span className="text-primary font-medium">+{game.xp} XP</span>
                    </div>
                    <Button variant="hero" size="sm" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="card-glass p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-6 h-6 text-warning" />
                <h2 className="text-2xl font-bold">Top Players</h2>
              </div>

              <div className="space-y-3">
                {leaderboard.map((player, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      idx < 3 ? "bg-gradient-primary/10 border border-primary/30" : "bg-muted/30"
                    }`}
                  >
                    <div className="text-2xl font-bold w-8 text-center">
                      {player.rank === 1 && "🥇"}
                      {player.rank === 2 && "🥈"}
                      {player.rank === 3 && "🥉"}
                      {player.rank > 3 && `#${player.rank}`}
                    </div>
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center font-bold">
                      {player.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{player.name}</div>
                    </div>
                    <div className="text-primary font-bold">{player.points.toLocaleString()} pts</div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Full Leaderboard
              </Button>
            </div>
          </div>

          {/* Scam News Sidebar - 25% */}
          <div className="w-80 space-y-6">
            <div className="card-glass p-6 rounded-xl sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="text-xl font-bold">Latest Scam Alerts</h2>
              </div>

              <div className="space-y-4">
                {scamNews.map((news, idx) => (
                  <div key={idx} className="border-l-2 border-destructive pl-4 py-2 hover:bg-muted/20 transition-colors cursor-pointer rounded-r">
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                      news.severity === "high" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                    }`}>
                      {news.severity.toUpperCase()}
                    </div>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2">{news.title}</h3>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{news.source}</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/news">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All News
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Dashboard;
