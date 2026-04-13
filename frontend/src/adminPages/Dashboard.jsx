import Card from "../components/adminDashboard/Card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>Total Products: 0</Card>
      <Card>Total Orders: 0</Card>
      <Card>Total Users: 0</Card>
      <Card>Revenue: ₹0</Card>
    </div>
  );
}