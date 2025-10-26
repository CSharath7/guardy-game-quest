import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Choice {
  text: string;
  next: number;
  isCorrect?: boolean;
}

interface Scene {
  id: number;
  title: string;
  description: string;
  image: string;
  choices: Choice[];
  feedback?: string;
  isEnd?: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const StoryGame = () => {
  const navigate = useNavigate();
  const [gamePhase, setGamePhase] = useState<"story" | "quiz" | "results">("story");
  const [currentScene, setCurrentScene] = useState(0);
  const [storyScore, setStoryScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [storyChoices, setStoryChoices] = useState<number[]>([]);

  const scenes: Scene[] = [
    {
      id: 0,
      title: "The Unexpected Email",
      description: "You receive an email claiming to be from your bank. The subject line reads: 'URGENT: Account Security Alert - Action Required Immediately'. The email states that suspicious activity has been detected on your account and you need to verify your identity within 24 hours or your account will be suspended.",
      image: "📧",
      choices: [
        { text: "Click the link in the email to verify my account", next: 1, isCorrect: false },
        { text: "Call the bank using the number on their official website", next: 2, isCorrect: true },
        { text: "Reply to the email asking for more details", next: 3, isCorrect: false },
      ],
    },
    {
      id: 1,
      title: "The Fake Website",
      description: "You clicked the link and it took you to what looks like your bank's website. However, you notice the URL is slightly different - it's 'bankofindia-secure.com' instead of 'bankofindia.com'. The site is asking for your username, password, and OTP.",
      image: "🌐",
      feedback: "Warning! This was a phishing attempt. The link led to a fake website designed to steal your credentials.",
      choices: [
        { text: "Enter my credentials - the site looks legitimate", next: 4, isCorrect: false },
        { text: "Close the browser and report this to my bank", next: 5, isCorrect: true },
        { text: "Enter fake credentials to test if it's real", next: 6, isCorrect: false },
      ],
    },
    {
      id: 2,
      title: "The Verification Call",
      description: "You called your bank using the official number from their website. The customer service representative confirms there is NO suspicious activity on your account and no email was sent by them. They thank you for being vigilant and confirm your account is completely safe.",
      image: "✅",
      feedback: "Excellent decision! You successfully avoided a phishing scam by verifying through official channels.",
      choices: [
        { text: "Report the phishing email to the bank", next: 7, isCorrect: true },
        { text: "Delete the email and move on", next: 8, isCorrect: false },
      ],
    },
    {
      id: 3,
      title: "The Scammer's Response",
      description: "You replied to the email. Within minutes, you receive a response with urgent language pressuring you to 'click here immediately' or face account closure. The email now claims you have only 2 hours left.",
      image: "⚠️",
      feedback: "Replying to suspicious emails can confirm your email address is active, leading to more scam attempts.",
      choices: [
        { text: "Ignore and delete all emails from this sender", next: 7, isCorrect: true },
        { text: "Click the link to get it over with", next: 4, isCorrect: false },
      ],
    },
    {
      id: 4,
      title: "Account Compromised!",
      description: "You entered your credentials on the fake website. Within hours, your account shows unauthorized transactions totaling ₹45,000. The scammers now have access to your banking credentials and personal information.",
      image: "🚨",
      feedback: "This was the worst possible outcome. Never enter credentials on suspicious websites!",
      isEnd: true,
      choices: [],
    },
    {
      id: 5,
      title: "Crisis Averted",
      description: "You closed the browser immediately and called your bank to report the phishing attempt. They assured you that your account is safe and added extra security monitoring. They also thanked you for reporting it, as it helps them alert other customers.",
      image: "🛡️",
      feedback: "Perfect! You took all the right steps to protect yourself.",
      isEnd: true,
      choices: [],
    },
    {
      id: 6,
      title: "Tracked by Scammers",
      description: "Even though you entered fake credentials, the scammers now know your email is active and you're engaging with their phishing attempts. You start receiving multiple scam emails daily across different topics.",
      image: "📨",
      feedback: "Never engage with phishing sites, even to test them. This marks you as a potential target.",
      isEnd: true,
      choices: [],
    },
    {
      id: 7,
      title: "Cyber Hero",
      description: "You reported the phishing email to your bank. They immediately sent out alerts to all customers about this specific scam, potentially saving thousands of people from falling victim. Your vigilance made a real difference!",
      image: "🏆",
      feedback: "Outstanding! Reporting scams helps protect the entire community.",
      isEnd: true,
      choices: [],
    },
    {
      id: 8,
      title: "Missed Opportunity",
      description: "While you stayed safe, other customers may have fallen for the same scam. Reporting helps banks and authorities track and shut down these operations.",
      image: "⚡",
      feedback: "Always report phishing attempts - you could help save others from becoming victims.",
      isEnd: true,
      choices: [],
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the FIRST thing you should do when receiving an urgent email from your bank?",
      options: [
        "Click the link immediately to protect your account",
        "Verify by contacting the bank through their official channels",
        "Forward the email to friends to ask their opinion",
        "Reply to the email asking if it's legitimate",
      ],
      correctAnswer: 1,
      explanation: "Always verify suspicious emails by contacting the organization directly through official channels (phone number on their website, official app, etc.). Never use contact information provided in the suspicious email.",
    },
    {
      id: 2,
      question: "What is a common red flag in phishing emails?",
      options: [
        "Personalized greeting with your name",
        "Links to the official website",
        "Urgent language and threats of account closure",
        "Professional email formatting",
      ],
      correctAnswer: 2,
      explanation: "Phishing emails often use urgent language, threats, and time pressure to make you act without thinking. Legitimate organizations rarely threaten immediate account closure.",
    },
    {
      id: 3,
      question: "How can you identify a fake website URL?",
      options: [
        "By checking if it has HTTPS",
        "By looking for slight misspellings or extra characters in the domain",
        "By seeing if it has a professional design",
        "By checking if it asks for a password",
      ],
      correctAnswer: 1,
      explanation: "Scammers often create URLs that look similar to legitimate ones but with slight variations (e.g., 'bankofindia-secure.com' instead of 'bankofindia.com'). Always check the domain name carefully.",
    },
    {
      id: 4,
      question: "What should you do if you accidentally entered your credentials on a phishing site?",
      options: [
        "Wait and see if anything happens",
        "Delete your browser history",
        "Immediately change your password and contact your bank",
        "Install antivirus software",
      ],
      correctAnswer: 2,
      explanation: "If you've entered credentials on a phishing site, act immediately: change your passwords, contact your bank/organization, enable 2FA if available, and monitor your accounts closely.",
    },
    {
      id: 5,
      question: "Why is it important to report phishing attempts?",
      options: [
        "To get a reward from the bank",
        "It's not important, just delete them",
        "To help authorities shut down scams and protect others",
        "To receive security updates",
      ],
      correctAnswer: 2,
      explanation: "Reporting phishing attempts helps organizations alert other customers, track scam patterns, and work with authorities to shut down these operations. Your report could save many others from becoming victims.",
    },
  ];

  const handleChoice = (choice: Choice) => {
    setShowFeedback(true);
    setStoryChoices([...storyChoices, currentScene]);
    
    if (choice.isCorrect) {
      setStoryScore(storyScore + 20);
      toast({
        title: "Good Choice!",
        description: "You made a smart decision.",
      });
    } else {
      toast({
        title: "Be Careful!",
        description: "That wasn't the best choice. Learn from this!",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (scenes[choice.next].isEnd) {
        setTimeout(() => {
          setGamePhase("quiz");
        }, 2000);
      }
      setCurrentScene(choice.next);
    }, 2000);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === quizQuestions[currentQuizQuestion].correctAnswer;
    if (isCorrect) {
      setQuizScore(quizScore + 20);
      toast({
        title: "Correct!",
        description: "+20 points",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Review the explanation below",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGamePhase("results");
      }
    }, 3000);
  };

  const totalScore = storyScore + quizScore;
  const maxScore = 200;
  const percentage = (totalScore / maxScore) * 100;

  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", message: "Fraud Detection Expert!", color: "text-success" };
    if (percentage >= 80) return { grade: "A", message: "Excellent Awareness!", color: "text-success" };
    if (percentage >= 70) return { grade: "B", message: "Good Knowledge!", color: "text-primary" };
    if (percentage >= 60) return { grade: "C", message: "Keep Learning!", color: "text-warning" };
    return { grade: "D", message: "More Practice Needed", color: "text-destructive" };
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/games")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
          {gamePhase !== "results" && (
            <Badge variant="outline" className="text-lg px-4 py-2">
              Score: {totalScore} / {maxScore}
            </Badge>
          )}
        </div>

        {/* Story Phase */}
        {gamePhase === "story" && (
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-8 rounded-2xl">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Story Progress</span>
                  <span className="text-sm font-semibold">{Math.round((currentScene / scenes.length) * 100)}%</span>
                </div>
                <Progress value={(currentScene / scenes.length) * 100} className="h-2" />
              </div>

              {/* Scene Content */}
              <div className="text-center mb-8">
                <div className="text-7xl mb-4">{scenes[currentScene].image}</div>
                <h2 className="text-3xl font-bold mb-4">{scenes[currentScene].title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {scenes[currentScene].description}
                </p>
              </div>

              {/* Feedback */}
              {showFeedback && scenes[currentScene].feedback && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30 animate-fade-in">
                  <p className="text-sm">{scenes[currentScene].feedback}</p>
                </div>
              )}

              {/* Choices */}
              {!showFeedback && !scenes[currentScene].isEnd && (
                <div className="space-y-3">
                  {scenes[currentScene].choices.map((choice, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full h-auto py-4 text-left justify-start hover:bg-primary/20 transition-all"
                      onClick={() => handleChoice(choice)}
                    >
                      <span className="text-base">{choice.text}</span>
                    </Button>
                  ))}
                </div>
              )}

              {/* End Scene */}
              {scenes[currentScene].isEnd && !showFeedback && (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Proceeding to quiz section...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quiz Phase */}
        {gamePhase === "quiz" && (
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-8 rounded-2xl">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuizQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold">Quiz Score: {quizScore}</span>
                </div>
                <Progress value={((currentQuizQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  {quizQuestions[currentQuizQuestion].question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuizQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === quizQuestions[currentQuizQuestion].correctAnswer;
                    const showResult = showFeedback;

                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full h-auto py-4 text-left justify-start transition-all ${
                          showResult
                            ? isCorrect
                              ? "bg-success/20 border-success"
                              : isSelected
                              ? "bg-destructive/20 border-destructive"
                              : ""
                            : "hover:bg-primary/20"
                        }`}
                        onClick={() => !showFeedback && handleQuizAnswer(index)}
                        disabled={showFeedback}
                      >
                        <span className="flex items-center gap-3 w-full">
                          <span className="flex-1 text-base">{option}</span>
                          {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              {showFeedback && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 animate-fade-in">
                  <p className="text-sm font-semibold mb-2">Explanation:</p>
                  <p className="text-sm">{quizQuestions[currentQuizQuestion].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Phase */}
        {gamePhase === "results" && (
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-8 rounded-2xl text-center">
              {/* Trophy Icon */}
              <div className="mb-6">
                <Trophy className="w-24 h-24 mx-auto text-primary animate-scale-in" />
              </div>

              {/* Grade */}
              <div className="mb-8">
                <h2 className="text-5xl font-bold mb-2 glow-effect">{getGrade().grade}</h2>
                <p className={`text-2xl font-semibold ${getGrade().color}`}>
                  {getGrade().message}
                </p>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="card-glass p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Story Score</p>
                  <p className="text-3xl font-bold text-primary">{storyScore}</p>
                </div>
                <div className="card-glass p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Quiz Score</p>
                  <p className="text-3xl font-bold text-primary">{quizScore}</p>
                </div>
                <div className="card-glass p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                  <p className="text-3xl font-bold text-success">{totalScore}</p>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className="text-sm font-semibold">{percentage.toFixed(0)}%</span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>

              {/* XP Reward */}
              <div className="card-glass p-6 rounded-xl mb-8 bg-gradient-primary/10 border border-primary/30">
                <div className="flex items-center justify-center gap-3">
                  <Star className="w-6 h-6 text-warning fill-warning" />
                  <p className="text-xl font-semibold">
                    You earned <span className="text-primary">+{Math.floor(totalScore * 1.5)} XP</span>!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setGamePhase("story");
                    setCurrentScene(0);
                    setStoryScore(0);
                    setQuizScore(0);
                    setCurrentQuizQuestion(0);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                    setStoryChoices([]);
                  }}
                >
                  Play Again
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => navigate("/games")}
                >
                  More Games
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ChatBot />
    </div>
  );
};

export default StoryGame;
