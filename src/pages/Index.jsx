import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Download } from 'lucide-react';

const Index = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('docx');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTranslate = async () => {
    setIsLoading(true);
    // TODO: Implement translation and file conversion logic
    // This would involve calling backend APIs for translation and document conversion
    setTimeout(() => {
      setIsLoading(false);
      alert('Translation completed! (This is a mock response)');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Vietnamese Document Translator</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Upload Document</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input id="file-upload" type="file" onChange={handleFileChange} />
              <Button size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="text-input">Or Enter Text</Label>
            <Textarea
              id="text-input"
              placeholder="Enter text to translate..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Output Format</Label>
            <RadioGroup defaultValue="docx" className="flex space-x-4 mt-1" onValueChange={setOutputFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="docx" id="docx" />
                <Label htmlFor="docx">DOCX</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleTranslate} disabled={isLoading} className="w-full">
            {isLoading ? (
              'Translating...'
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" /> Translate to Vietnamese
              </>
            )}
          </Button>

          <Button variant="outline" className="w-full" disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" /> Download Translated Document
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
