import { useState } from "react";
import { MessageSquare, X, Send, Shield, AlertCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "👋 Hi! I'm your FraudGuard AI Assistant. I can help you identify scams, understand fraud prevention, and answer questions about digital payment security. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");

  const quickActions = [
    { icon: "🎣", text: "Identify phishing emails", query: "How can I identify phishing emails?" },
    { icon: "💳", text: "Safe payment practices", query: "What are safe online payment practices?" },
    { icon: "🔒", text: "Protect my accounts", query: "How do I protect my accounts from fraud?" },
  ];

  const handleSend = (customQuery?: string) => {
    const query = customQuery || input;
    if (!query.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: query },
      {
        role: "bot",
        content: getBotResponse(query),
      },
    ];
    setMessages(newMessages);
    setInput("");
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("phishing") || lowerQuery.includes("email")) {
      return "🎣 **Phishing Email Red Flags:**\n\n✓ Urgent language demanding immediate action\n✓ Suspicious sender email addresses\n✓ Generic greetings (\"Dear Customer\")\n✓ Spelling and grammar mistakes\n✓ Requests for personal/financial information\n✓ Suspicious links or attachments\n\n**Pro Tip:** Hover over links to see the real URL before clicking!";
    }
    
    if (lowerQuery.includes("payment") || lowerQuery.includes("safe")) {
      return "💳 **Safe Payment Practices:**\n\n✓ Use credit cards over debit for better protection\n✓ Enable two-factor authentication\n✓ Check for HTTPS and padlock icon\n✓ Avoid public WiFi for transactions\n✓ Monitor statements regularly\n✓ Use virtual card numbers when available\n\n**Remember:** Legitimate companies never ask for full card details via email!";
    }
    
    if (lowerQuery.includes("protect") || lowerQuery.includes("secure")) {
      return "🔒 **Account Protection Tips:**\n\n✓ Use strong, unique passwords\n✓ Enable 2FA/MFA everywhere\n✓ Update security questions\n✓ Monitor account activity\n✓ Be cautious with personal info\n✓ Use password managers\n\n**Did you know?** 81% of data breaches are caused by weak passwords!";
    }
    
    if (lowerQuery.includes("scam") || lowerQuery.includes("fraud")) {
      return "⚠️ **Common Scam Types:**\n\n🎣 **Phishing:** Fake emails/messages\n💔 **Romance Scams:** Fake online relationships\n💼 **Job Scams:** Fake job offers\n💰 **Investment Scams:** Too-good-to-be-true returns\n📞 **Vishing:** Phone call scams\n📱 **Smishing:** SMS/text scams\n\n**Always verify before you trust!**";
    }
    
    return "I'm here to help you stay safe from fraud! I can answer questions about:\n\n🎯 Identifying phishing attempts\n💳 Secure payment practices\n🔒 Account protection\n⚠️ Latest scam tactics\n📚 Fraud prevention tips\n\nWhat specific topic would you like to explore?";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-glow z-50"
        variant="hero"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] card-glass rounded-2xl shadow-card flex flex-col z-50">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center gap-3 bg-gradient-primary rounded-t-2xl">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">FraudGuard AI Assistant</h3>
              <p className="text-xs text-white/80">Fraud Detection Expert</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-muted border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Quick Actions (only show initially) */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center mb-3">Quick Actions:</p>
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action.query)}
                    className="w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg text-left transition-colors border border-border/50 hover:border-primary/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{action.icon}</span>
                      <span className="text-sm">{action.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Banner */}
          <div className="px-4 py-2 bg-primary/10 border-t border-primary/20">
            <div className="flex items-center gap-2 text-xs text-primary">
              <Lightbulb className="w-4 h-4" />
              <span>Ask me anything about fraud prevention!</span>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about fraud prevention..."
                className="flex-1"
              />
              <Button onClick={() => handleSend()} size="icon" variant="hero">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
