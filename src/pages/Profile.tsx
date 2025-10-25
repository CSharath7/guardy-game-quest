import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";
import {
  Trophy,
  Award,
  Star,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Lock,
  Shield,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const userStats = {
    name: "Alex Rivera",
    username: "@alexrivera",
    level: 12,
    xp: 8400,
    xpToNext: 10000,
    points: 15240,
    streak: 7,
    rank: 234,
    gamesPlayed: 156,
    accuracy: 87,
    joinedDate: "Jan 2024",
  };

  const achievements = [
    { icon: Trophy, name: "First Win", desc: "Complete your first scenario", unlocked: true, color: "text-warning" },
    { icon: Flame, name: "Hot Streak", desc: "7 day login streak", unlocked: true, color: "text-destructive" },
    { icon: Target, name: "Sharp Eye", desc: "90% accuracy on 10 games", unlocked: true, color: "text-success" },
    { icon: Star, name: "Rising Star", desc: "Reach level 10", unlocked: true, color: "text-primary" },
    { icon: Shield, name: "Fraud Buster", desc: "Complete 50 scenarios", unlocked: true, color: "text-secondary" },
    { icon: Award, name: "Top 100", desc: "Rank in top 100", unlocked: false, color: "text-muted" },
    { icon: TrendingUp, name: "Speed Demon", desc: "Complete game in under 2 min", unlocked: false, color: "text-muted" },
    { icon: CheckCircle2, name: "Perfect Score", desc: "100% accuracy game", unlocked: false, color: "text-muted" },
  ];

  const recentActivity = [
    { game: "Phishing Email Detective", score: 950, xp: 100, date: "2 hours ago", result: "passed" },
    { game: "Fake Website Spotter", score: 1200, xp: 200, date: "1 day ago", result: "passed" },
    { game: "Social Engineering Defense", score: 800, xp: 150, date: "2 days ago", result: "failed" },
    { game: "Payment Scam Identifier", score: 1100, xp: 180, date: "3 days ago", result: "passed" },
  ];

  const categories = [
    { name: "Phishing Detection", mastery: 92, games: 45 },
    { name: "Fake Websites", mastery: 85, games: 38 },
    { name: "Social Engineering", mastery: 78, games: 32 },
    { name: "Payment Fraud", mastery: 88, games: 41 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Profile Header */}
        <div className="card-glass p-8 rounded-2xl mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-primary rounded-2xl flex items-center justify-center text-5xl font-bold shadow-glow">
                AR
              </div>
              <div className="absolute -bottom-2 -right-2 bg-card border-4 border-background rounded-full px-3 py-1 font-bold text-sm">
                Lvl {userStats.level}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{userStats.name}</h1>
              <p className="text-muted-foreground mb-4">{userStats.username} • Joined {userStats.joinedDate}</p>

              {/* Level Progress */}
              <div className="space-y-2 mb-6 max-w-md">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Level {userStats.level}</span>
                  <span className="text-muted-foreground">{userStats.xp} / {userStats.xpToNext} XP</span>
                </div>
                <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground">{userStats.xpToNext - userStats.xp} XP to level {userStats.level + 1}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.points.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">#{userStats.rank}</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{userStats.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{userStats.streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="hero">Edit Profile</Button>
              <Button variant="outline" className="w-full">Share Profile</Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievements */}
            <div className="card-glass p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-warning" />
                <h2 className="text-2xl font-bold">Achievements</h2>
                <span className="ml-auto text-sm text-muted-foreground">
                  {achievements.filter(a => a.unlocked).length} / {achievements.length}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg text-center transition-all cursor-pointer ${
                      achievement.unlocked
                        ? "card-glass hover:scale-105"
                        : "bg-muted/20 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        achievement.unlocked ? "bg-gradient-primary shadow-glow" : "bg-muted"
                      }`}
                    >
                      <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{achievement.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{achievement.desc}</p>
                    {!achievement.unlocked && <Lock className="w-4 h-4 mx-auto mt-2 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Category Mastery */}
            <div className="card-glass p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Category Mastery</h2>

              <div className="space-y-4">
                {categories.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">{category.games} games completed</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{category.mastery}%</span>
                    </div>
                    <Progress value={category.mastery} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-glass p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.result === "passed" ? "bg-success/20" : "bg-destructive/20"
                      }`}
                    >
                      {activity.result === "passed" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{activity.game}</h3>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{activity.score}</div>
                      <div className="text-xs text-primary">+{activity.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="card-glass p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-6">Statistics</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                    <span className="text-sm">Games Played</span>
                  </div>
                  <span className="font-bold">{userStats.gamesPlayed}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-success" />
                    <span className="text-sm">Accuracy</span>
                  </div>
                  <span className="font-bold text-success">{userStats.accuracy}%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Flame className="w-5 h-5 text-warning" />
                    <span className="text-sm">Current Streak</span>
                  </div>
                  <span className="font-bold text-warning">{userStats.streak} days</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="font-bold">{userStats.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Daily Challenge */}
            <div className="card-glass p-6 rounded-xl bg-gradient-primary/10 border border-primary/30">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Daily Challenge</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Complete today's challenge for bonus XP!
              </p>
              <Button variant="hero" className="w-full">Start Challenge</Button>
            </div>
          </div>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Profile;

function X(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Gamepad2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="11" y2="11" />
      <line x1="8" x2="8" y1="9" y2="13" />
      <line x1="15" x2="15.01" y1="12" y2="12" />
      <line x1="18" x2="18.01" y1="10" y2="10" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
    </svg>
  );
}
