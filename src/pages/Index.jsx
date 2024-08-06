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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-4xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Công Cụ Dịch Tài Liệu Tiếng Việt
        </h1>
        
        <div className="flex justify-center space-x-4 mb-6">
          <Link to="/guide">
            <Button variant="outline" className="hover:bg-blue-100 transition-colors duration-300">Hướng dẫn sử dụng</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="hover:bg-purple-100 transition-colors duration-300">Về chúng tôi</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <Label htmlFor="file-upload" className="text-lg font-semibold text-blue-700">Tải lên tài liệu</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input id="file-upload" type="file" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                <Button size="icon" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
              <Label htmlFor="text-input" className="text-lg font-semibold text-purple-700">Hoặc nhập văn bản</Label>
              <Textarea
                id="text-input"
                placeholder="Nhập văn bản cần dịch..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-2 bg-white bg-opacity-50 focus:bg-opacity-100 transition-all duration-300"
              />
            </div>

            <Button onClick={handleTranslate} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
              {isLoading ? (
                'Đang dịch...'
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" /> Dịch sang tiếng Việt
                </>
              )}
            </Button>

            <Button variant="outline" className="w-full hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105" disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" /> Tải xuống tài liệu đã dịch
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-4 shadow-inner">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Chào mừng bạn đến với Công Cụ Dịch Tài Liệu Tiếng Việt!</h3>
              <p className="text-purple-800">Đây là trợ lý AI của bạn. Hãy đặt câu hỏi về quá trình dịch thuật hoặc yêu cầu giải thích bất kỳ điều gì bạn chưa rõ.</p>
            </div>
            <div className="border-2 border-blue-200 rounded-lg p-4 h-80 overflow-y-auto bg-white bg-opacity-50 backdrop-blur-sm">
              {chatMessages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800' 
                      : 'bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800'
                  }`}>
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
                className="bg-white bg-opacity-50 focus:bg-opacity-100 transition-all duration-300"
              />
              <Button onClick={handleSendMessage} disabled={isLoading} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
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
