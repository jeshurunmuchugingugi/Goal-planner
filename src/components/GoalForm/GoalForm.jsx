import { useState } from "react";
import '../Form.css'

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: "",
    category: "",
    deadline: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: parseFloat(formData.savedAmount),
      createdAt: new Date().toISOString().split("T")[0],
    };
    onAddGoal(newGoal);
    setFormData({ name: "", targetAmount: "", savedAmount: "", category: "", deadline: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>
      <input name="name" placeholder="Goal name" value={formData.name} onChange={handleChange} required />
      <input name="targetAmount" placeholder="Target Amount" type="number" value={formData.targetAmount} onChange={handleChange} required />
      <input name="savedAmount" placeholder="Saved Amount" type="number" value={formData.savedAmount} onChange={handleChange} />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;

