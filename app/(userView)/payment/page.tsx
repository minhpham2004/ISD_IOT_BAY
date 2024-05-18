import PaymentCheckout from "./_components/paymentCheckout";
import PaymentMethods from "./_components/paymentMethods";
import { db } from "@/lib/db";
import PaymentSearchBar from "./_components/paymentSearchBar";

async function PaymentPage() {
  const userId = "dsds";

  const userOrders = await db.order.findMany({
    where: {
      userId: userId,
    },
  });

  const orderIds = userOrders.map((order) => order.id);

  const allPastPaymentDetail = await db.payment.findMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
  });

  // const commands = [
  //   { value: "calendar", label: "Calendar" },
  //   { value: "search-emoji", label: "Search Emoji" },
  //   { value: "calculator", label: "Calculator" },
  // ];

  return (
    <div>
      <h2
        className="scroll-m-20 text-3xl font-semibold"
        style={{ paddingBottom: "50px", paddingTop: "30px" }}
      >
        Payment
      </h2>
      <div style={{paddingBottom: '30px'}}>
      {/* <PaymentSearchBar commands={commands} />/ */}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "80px",
        }}
      >
        <PaymentMethods pastPayments={allPastPaymentDetail} />
        <PaymentCheckout />
      </div>
    </div>
  );
}

export default PaymentPage;
