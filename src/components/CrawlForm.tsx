
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";

interface CrawlFormProps {
  onEventsFetched: (events: any[]) => void;
}

export function CrawlForm({ onEventsFetched }: CrawlFormProps) {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    
    try {
      // Save API key first
      FirecrawlService.saveApiKey(apiKey);
      
      // Test the API key
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (!isValid) {
        toast({
          title: "エラー",
          description: "APIキーが無効です",
          variant: "destructive",
        });
        return;
      }

      setProgress(50);
      const result = await FirecrawlService.crawlEvents();
      
      if (result.success && result.data) {
        toast({
          title: "成功",
          description: "イベント情報を取得しました",
        });
        onEventsFetched(result.data);
      } else {
        toast({
          title: "エラー",
          description: result.error || "イベント情報の取得に失敗しました",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "イベント情報の取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium">
            Firecrawl APIキー
          </label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="APIキーを入力してください"
            required
          />
        </div>
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "取得中..." : "イベント情報を取得"}
        </Button>
      </form>
    </Card>
  );
}
