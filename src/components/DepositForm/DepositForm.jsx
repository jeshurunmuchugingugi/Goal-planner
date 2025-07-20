import { useState } from "react";
import '../Form.css'
function DepositForm({ goals, onDeposit }) {
  const [depositData, setDepositData] = useState({ goalId: "", amount: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setDepositData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const goal = goals.find((g) => g.id === depositData.goalId);
    if (!goal) return;
    const updatedAmount = parseFloat(goal.savedAmount) + parseFloat(depositData.amount);
    onDeposit(goal.id, { savedAmount: updatedAmount });
    setDepositData({ goalId: "", amount: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>
      <select name="goalId" value={depositData.goalId} onChange={handleChange} required>
        <option value="">Select Goal</option>
        {goals.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount to deposit"
        value={depositData.amount}
        onChange={handleChange}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
