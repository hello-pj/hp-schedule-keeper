
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SpreadsheetService } from '@/utils/SpreadsheetService';
import { Card } from "@/components/ui/card";

interface SpreadsheetFormProps {
  onEventsFetched: (events: any[]) => void;
}

export function SpreadsheetForm({ onEventsFetched }: SpreadsheetFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFetch = async () => {
    setIsLoading(true);
    setProgress(0);
    
    try {
      setProgress(50);
      const result = await SpreadsheetService.fetchEvents();
      
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
      {isLoading && (
        <Progress value={progress} className="w-full mb-4" />
      )}
      <Button
        onClick={handleFetch}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "取得中..." : "スプレッドシートから取得"}
      </Button>
    </Card>
  );
}
