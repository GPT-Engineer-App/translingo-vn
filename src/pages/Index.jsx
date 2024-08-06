import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Upload, FileText, Download } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { Link } from 'react-router-dom';

const openai = new OpenAI({
  apiKey: 'your-api-key-here', // Thay thế bằng API key của bạn
  dangerouslyAllowBrowser: true
});

const Index = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput };
    setChatMessages([...chatMessages, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...chatMessages, newMessage],
      });

      const assistantMessage = { role: 'assistant', content: response.choices[0].message.content };
      setChatMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    setIsLoading(true);
    // TODO: Implement translation logic using OpenAI API
    setTimeout(() => {
      setIsLoading(false);
      alert('Bản dịch đã hoàn thành! (Đây là phản hồi giả)');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Công Cụ Dịch Tài Liệu Tiếng Việt</h1>
        
        <div className="flex justify-center space-x-4 mb-6">
          <Link to="/guide">
            <Button variant="outline">Hướng dẫn sử dụng</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline">Về chúng tôi</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Tải lên tài liệu</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input id="file-upload" type="file" onChange={handleFileChange} />
                <Button size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="text-input">Hoặc nhập văn bản</Label>
              <Textarea
                id="text-input"
                placeholder="Nhập văn bản cần dịch..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={handleTranslate} disabled={isLoading} className="w-full">
              {isLoading ? (
                'Đang dịch...'
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" /> Dịch sang tiếng Việt
                </>
              )}
            </Button>

            <Button variant="outline" className="w-full" disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" /> Tải xuống tài liệu đã dịch
            </Button>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 mb-4 bg-blue-50">
              <h3 className="font-semibold text-lg mb-2">Chào mừng bạn đến với Công Cụ Dịch Tài Liệu Tiếng Việt!</h3>
              <p>Đây là trợ lý AI của bạn. Hãy đặt câu hỏi về quá trình dịch thuật hoặc yêu cầu giải thích bất kỳ điều gì bạn chưa rõ.</p>
            </div>
            <div className="border rounded-lg p-4 h-80 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
