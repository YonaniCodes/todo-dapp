import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSessionContext } from "./ContextProvider";

export default function ConnectWallet() {
  const { login } = useSessionContext();

  return (
    <Card className="w-[400px] p-6 mx-auto mt-[200px]">
      <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Hello There 👋👋👋
          </h3>
          <p className="text-sm text-gray-500">
            Please connect with your MetaMask to access your Todo Dapp.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <Button onClick={login} className="flex items-center space-x-2">
            Connect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
