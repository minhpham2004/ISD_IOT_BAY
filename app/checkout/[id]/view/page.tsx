import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPaymentHistoryByOrderId } from "../_actions/getPastPayments";
import { formatDateTime } from "@/lib/formatDateTime";

async function PaymentHistoryViewPage({ params }: { params: { id: string } }) {
  const paymentHistory = await getPaymentHistoryByOrderId(params.id);
  const paymentDate =
    paymentHistory && formatDateTime(paymentHistory?.createdAt);

  return (
    <Card className="p-2 flex flex-col">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Payment Information</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Payment Card Name: {paymentHistory?.paymentCardName}</p>
        <p>Payment Card Number: ${paymentHistory?.paymentCardNumber}</p>
        <p>Amount: ${paymentHistory?.paymentAmount}</p>

        <p>Paid on: {paymentDate}</p>
      </CardContent>
    </Card>
  );
}

export default PaymentHistoryViewPage;
